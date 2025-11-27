import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AuditResult {
  audit_type: string;
  category: string;
  item_name: string;
  score: number;
  status: string;
  recommendations: string;
  positive_feedback?: string;
  details: Record<string, any>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { access_code_id } = await req.json();
    
    if (!access_code_id) {
      return new Response(JSON.stringify({ error: 'access_code_id is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch access code data
    const { data: accessCode, error: accessCodeError } = await supabase
      .from('audit_access_codes')
      .select('*')
      .eq('id', access_code_id)
      .single();

    if (accessCodeError || !accessCode) {
      console.error('Error fetching access code:', accessCodeError);
      return new Response(JSON.stringify({ error: 'Invalid access code' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Starting audit for:', accessCode.website_url);

    // Build business context string for AI prompts
    const businessContext = `
Business Context:
- Reach: ${accessCode.business_reach || 'not specified'}
- Model: ${accessCode.business_model || 'not specified'}
- Industry: ${accessCode.industry || 'not specified'}
- Primary Goals: ${accessCode.primary_goals?.join(', ') || 'not specified'}
- Target Audience: ${accessCode.target_audience || 'not specified'}

IMPORTANT: Only provide recommendations relevant to this business type. 
${accessCode.business_reach === 'national' || accessCode.business_reach === 'international' 
  ? 'This is a NATIONAL/INTERNATIONAL business - DO NOT recommend local keywords or location-specific strategies.' 
  : accessCode.business_reach === 'local' 
  ? 'This is a LOCAL business - focus on location-specific SEO strategies.' 
  : ''}`;

    // Fetch website HTML
    let websiteHtml = '';
    let websiteError = null;
    try {
      const websiteResponse = await fetch(accessCode.website_url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEOAuditBot/1.0)',
        },
      });
      websiteHtml = await websiteResponse.text();
    } catch (error) {
      console.error('Error fetching website:', error);
      websiteError = error.message;
    }

    // Parse basic SEO factors
    const seoFactors = parseHtmlForSeo(websiteHtml);

    // Use OpenAI to analyze the content
    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    const auditResults: AuditResult[] = [];

    // Generate Local SEO audit results
    const localSeoResults = await analyzeLocalSeo(openaiKey!, accessCode, seoFactors, websiteError, businessContext);
    auditResults.push(...localSeoResults);

    // Generate AEO audit results
    const aeoResults = await analyzeAeo(openaiKey!, accessCode, seoFactors, websiteError, businessContext);
    auditResults.push(...aeoResults);

    // Generate Voice SEO audit results
    const voiceSeoResults = await analyzeVoiceSeo(openaiKey!, accessCode, seoFactors, websiteError, businessContext);
    auditResults.push(...voiceSeoResults);

    // Generate GBP audit results if GBP URL is provided
    if (accessCode.gbp_url) {
      const gbpResults = await analyzeGbp(openaiKey!, accessCode);
      auditResults.push(...gbpResults);
    }

    // Generate Executive Summary and Action Plan
    const executiveSummary = await generateExecutiveSummary(openaiKey!, accessCode, auditResults, seoFactors, businessContext);
    const actionPlan = await generateActionPlan(openaiKey!, accessCode, auditResults, seoFactors, businessContext);

    // Delete existing results for this access code
    await supabase
      .from('audit_results')
      .delete()
      .eq('access_code_id', access_code_id);

    // Store results in database
    const resultsToInsert = auditResults.map(result => ({
      ...result,
      access_code_id,
    }));

    const { error: insertError } = await supabase
      .from('audit_results')
      .insert(resultsToInsert);

    if (insertError) {
      console.error('Error inserting results:', insertError);
      return new Response(JSON.stringify({ error: 'Failed to save audit results' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Update access code with executive summary and action plan
    const { error: updateError } = await supabase
      .from('audit_access_codes')
      .update({
        executive_summary_strengths: executiveSummary.strengths,
        executive_summary_gaps: executiveSummary.gaps,
        action_plan: actionPlan,
      })
      .eq('id', access_code_id);

    if (updateError) {
      console.error('Error updating executive summary:', updateError);
    }

    console.log('Audit completed successfully');

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Audit completed successfully',
      results_count: auditResults.length,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in run-seo-audit:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function parseHtmlForSeo(html: string) {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi) || [];
  const h2Matches = html.match(/<h2[^>]*>([^<]+)<\/h2>/gi) || [];
  const imgMatches = html.match(/<img[^>]*>/gi) || [];
  const schemaMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([^<]+)<\/script>/gi) || [];
  
  const imgsWithoutAlt = imgMatches.filter(img => !img.includes('alt='));
  
  // Enhanced parsing for deeper analysis
  const bodyText = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const estimatedWordCount = bodyText.split(' ').length;
  
  // Check for phone number in header/footer
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const headerMatch = html.match(/<header[^>]*>([\s\S]*?)<\/header>/i);
  const footerMatch = html.match(/<footer[^>]*>([\s\S]*?)<\/footer>/i);
  const hasPhoneInHeader = headerMatch ? phoneRegex.test(headerMatch[1]) : false;
  const hasPhoneInFooter = footerMatch ? phoneRegex.test(footerMatch[1]) : false;
  
  // Check for address visibility
  const addressKeywords = ['address', 'location', 'street', 'city', 'zip', 'postal'];
  const hasAddressVisible = addressKeywords.some(keyword => 
    html.toLowerCase().includes(keyword) && 
    (headerMatch?.[1].toLowerCase().includes(keyword) || footerMatch?.[1].toLowerCase().includes(keyword))
  );
  
  // Check for content sections
  const hasFaqSection = /faq|frequently.*asked.*questions/i.test(html);
  const hasBlogLink = /blog|articles|news/i.test(html);
  const hasTestimonialsSection = /testimonial|review|customer.*stor/i.test(html);
  const hasReviewsWidget = /review.*widget|google.*review|yelp.*review/i.test(html);
  
  // Count service-related links
  const navLinks = html.match(/<nav[^>]*>([\s\S]*?)<\/nav>/gi) || [];
  const navText = navLinks.join(' ');
  const serviceKeywords = ['service', 'repair', 'maintenance', 'installation', 'emergency'];
  const servicePageCount = serviceKeywords.filter(keyword => 
    new RegExp(keyword, 'i').test(navText)
  ).length;
  
  // Location mentions
  const locationKeywords = ['phoenix', 'arizona', 'az', 'scottsdale', 'tempe', 'mesa', 'chandler'];
  const locationMentions = locationKeywords.filter(keyword => 
    new RegExp('\\b' + keyword + '\\b', 'i').test(html)
  ).length;
  
  return {
    title: titleMatch ? titleMatch[1] : null,
    metaDescription: metaDescMatch ? metaDescMatch[1] : null,
    h1Count: h1Matches.length,
    h2Count: h2Matches.length,
    imgCount: imgMatches.length,
    imgsWithoutAlt: imgsWithoutAlt.length,
    hasSchema: schemaMatches.length > 0,
    schemaCount: schemaMatches.length,
    estimatedWordCount,
    hasPhoneInHeader,
    hasPhoneInFooter,
    hasAddressVisible,
    hasFaqSection,
    hasBlogLink,
    hasTestimonialsSection,
    hasReviewsWidget,
    servicePageCount,
    locationMentions,
  };
}

async function analyzeLocalSeo(openaiKey: string, accessCode: any, seoFactors: any, websiteError: string | null, businessContext: string): Promise<AuditResult[]> {
  const prompt = `${businessContext}

Analyze this website for Local SEO optimization:
Website: ${accessCode.website_url}
Client: ${accessCode.client_name}

SEO Factors Found:
- Title: ${seoFactors.title || 'Missing'}
- Meta Description: ${seoFactors.metaDescription || 'Missing'}
- H1 Tags: ${seoFactors.h1Count}
- H2 Tags: ${seoFactors.h2Count}
- Images: ${seoFactors.imgCount} (${seoFactors.imgsWithoutAlt} without alt text)
- Schema Markup: ${seoFactors.hasSchema ? 'Present' : 'Missing'}

${websiteError ? `Note: Could not fetch website content. Error: ${websiteError}` : ''}

Provide a detailed Local SEO audit with 5-8 specific findings. For each finding, provide:
1. Category (e.g., "NAP Consistency", "Local Keywords", "Schema Markup", "Citations", "Mobile Optimization")
2. Item name (specific element being evaluated)
3. Score (0-100)
4. Status ("excellent", "good", "needs_improvement", "critical")
5. positive_feedback - What they're doing well (especially for scores 70+, be specific)
6. recommendations - What could be improved (especially for scores below 80, be specific and actionable)

Format as JSON array with fields: category, item_name, score, status, positive_feedback, recommendations`;

  const response = await callOpenAI(openaiKey, prompt);
  const results = parseAuditResponse(response, 'local_seo');
  return results;
}

async function analyzeAeo(openaiKey: string, accessCode: any, seoFactors: any, websiteError: string | null, businessContext: string): Promise<AuditResult[]> {
  const prompt = `${businessContext}

Analyze this website for AEO (Answer Engine Optimization):
Website: ${accessCode.website_url}
Client: ${accessCode.client_name}

SEO Factors Found:
- Title: ${seoFactors.title || 'Missing'}
- Meta Description: ${seoFactors.metaDescription || 'Missing'}
- Schema Markup: ${seoFactors.hasSchema ? 'Present' : 'Missing'} (${seoFactors.schemaCount} instances)

${websiteError ? `Note: Could not fetch website content. Error: ${websiteError}` : ''}

Provide a detailed AEO audit with 5-8 specific findings focusing on:
- Featured snippet optimization
- Question-based content
- Structured data for rich results
- Entity optimization
- Content clarity and directness

For each finding provide:
1. Category
2. Item name
3. Score (0-100)
4. Status ("excellent", "good", "needs_improvement", "critical")
5. positive_feedback - What they're doing well (especially for scores 70+, be specific)
6. recommendations - What could be improved (especially for scores below 80, be specific and actionable)

Format as JSON array with fields: category, item_name, score, status, positive_feedback, recommendations`;

  const response = await callOpenAI(openaiKey, prompt);
  const results = parseAuditResponse(response, 'aeo');
  return results;
}

async function analyzeVoiceSeo(openaiKey: string, accessCode: any, seoFactors: any, websiteError: string | null, businessContext: string): Promise<AuditResult[]> {
  const prompt = `${businessContext}

Analyze this website for Voice SEO optimization:
Website: ${accessCode.website_url}
Client: ${accessCode.client_name}

SEO Factors Found:
- Title: ${seoFactors.title || 'Missing'}
- Meta Description: ${seoFactors.metaDescription || 'Missing'}

${websiteError ? `Note: Could not fetch website content. Error: ${websiteError}` : ''}

Provide a detailed Voice SEO audit with 5-8 specific findings focusing on:
- Conversational keywords
- Question-answer format content
- Featured snippet optimization for voice
- Page speed and mobile optimization
- Natural language content

For each finding provide:
1. Category
2. Item name
3. Score (0-100)
4. Status ("excellent", "good", "needs_improvement", "critical")
5. positive_feedback - What they're doing well (especially for scores 70+, be specific)
6. recommendations - What could be improved (especially for scores below 80, be specific and actionable)

Format as JSON array with fields: category, item_name, score, status, positive_feedback, recommendations`;

  const response = await callOpenAI(openaiKey, prompt);
  const results = parseAuditResponse(response, 'voice_seo');
  return results;
}

async function analyzeGbp(openaiKey: string, accessCode: any): Promise<AuditResult[]> {
  const prompt = `Analyze this Google Business Profile for optimization:
GBP URL: ${accessCode.gbp_url}
Client: ${accessCode.client_name}

Provide a detailed GBP audit with 5-8 specific findings focusing on:
- Profile completeness
- Photo quality and quantity
- Review management
- Post frequency
- Business information accuracy
- Category optimization

For each finding provide:
1. Category
2. Item name
3. Score (0-100)
4. Status ("excellent", "good", "needs_improvement", "critical")
5. positive_feedback - What they're doing well (especially for scores 70+, be specific)
6. recommendations - What could be improved (especially for scores below 80, be specific and actionable)

Format as JSON array with fields: category, item_name, score, status, positive_feedback, recommendations`;

  const response = await callOpenAI(openaiKey, prompt);
  const results = parseAuditResponse(response, 'gbp');
  return results;
}

async function callOpenAI(apiKey: string, prompt: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert SEO auditor. Provide detailed, actionable feedback in valid JSON format. Each item in the array should have: category, item_name, score, status, positive_feedback (what they are doing well), and recommendations (what could be improved) fields.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('OpenAI API error:', error);
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

function parseAuditResponse(response: string, auditType: string): AuditResult[] {
  try {
    // Try to extract JSON from the response
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('No JSON array found in response');
      return generateFallbackResults(auditType);
    }

    const parsed = JSON.parse(jsonMatch[0]);
    
    return parsed.map((item: any) => ({
      audit_type: auditType,
      category: item.category || 'General',
      item_name: item.item_name || item.name || 'Unnamed Item',
      score: Math.min(100, Math.max(0, item.score || 50)),
      status: item.status || 'needs_improvement',
      recommendations: item.recommendations || item.recommendation || 'No specific recommendations provided.',
      positive_feedback: item.positive_feedback || null,
      details: {
        raw_data: item,
      },
    }));
  } catch (error) {
    console.error('Error parsing audit response:', error);
    return generateFallbackResults(auditType);
  }
}

async function generateExecutiveSummary(
  openaiKey: string, 
  accessCode: any, 
  auditResults: AuditResult[],
  seoFactors: any,
  businessContext: string
): Promise<{ strengths: string; gaps: string }> {
  const overallScore = Math.round(auditResults.reduce((sum, r) => sum + r.score, 0) / auditResults.length);
  
  const prompt = `${businessContext}

Based on this comprehensive SEO audit, create an executive summary:

Overall Score: ${overallScore}/100
Website: ${accessCode.website_url}
Total Audit Items: ${auditResults.length}

Key Findings:
${auditResults.slice(0, 10).map(r => `- ${r.item_name}: ${r.score}/100 (${r.status})`).join('\n')}

SEO Technical Factors:
- Content: ${seoFactors.estimatedWordCount} words
- NAP Visibility: Phone in header: ${seoFactors.hasPhoneInHeader}, footer: ${seoFactors.hasPhoneInFooter}
- FAQ Section: ${seoFactors.hasFaqSection}
- Blog/Content: ${seoFactors.hasBlogLink}
- Reviews/Testimonials: ${seoFactors.hasTestimonialsSection}

Provide TWO sections in JSON format:
1. "strengths" - 3-5 bullet points of what the website is doing well (be specific, mention actual elements found)
2. "gaps" - 3-5 bullet points of critical areas needing attention (be specific about what's missing)

Each bullet point should be 1-2 sentences maximum. Focus on strategic insights, not just listing scores.

Format: { "strengths": "• Point 1\n• Point 2\n• Point 3", "gaps": "• Gap 1\n• Gap 2\n• Gap 3" }`;

  try {
    const response = await callOpenAI(openaiKey, prompt);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        strengths: parsed.strengths || "• Website is live and accessible to search engines",
        gaps: parsed.gaps || "• Limited content and optimization opportunities identified"
      };
    }
  } catch (error) {
    console.error('Error generating executive summary:', error);
  }

  return {
    strengths: "• Website is live and accessible to search engines\n• Basic SEO structure is in place",
    gaps: "• Several optimization opportunities identified\n• Content and technical improvements needed"
  };
}

async function generateActionPlan(
  openaiKey: string,
  accessCode: any,
  auditResults: AuditResult[],
  seoFactors: any,
  businessContext: string
): Promise<any> {
  const criticalItems = auditResults.filter(r => r.status === 'critical' || r.score < 60);
  const improvementItems = auditResults.filter(r => r.status === 'needs_improvement' && r.score >= 60);
  
  const prompt = `${businessContext}

Create a tiered action plan based on this SEO audit:

Critical Issues (${criticalItems.length}):
${criticalItems.slice(0, 5).map(r => `- ${r.item_name}: ${r.recommendations}`).join('\n')}

Improvement Opportunities (${improvementItems.length}):
${improvementItems.slice(0, 5).map(r => `- ${r.item_name}: ${r.recommendations}`).join('\n')}

Technical Context:
- Content depth: ${seoFactors.estimatedWordCount} words
- Schema markup: ${seoFactors.hasSchema ? 'Present' : 'Missing'}
- FAQ section: ${seoFactors.hasFaqSection ? 'Yes' : 'No'}
- Blog/content hub: ${seoFactors.hasBlogLink ? 'Yes' : 'No'}

Create a 3-tiered action plan in JSON format:

{
  "tier1": {
    "title": "Foundation (Do First)",
    "description": "Critical fixes that must be done immediately",
    "actions": [
      {
        "title": "Action title",
        "description": "What to do and why",
        "impact": "High/Medium/Low",
        "effort": "High/Medium/Low"
      }
    ]
  },
  "tier2": {
    "title": "Growth (Do Next)",
    "description": "Important improvements for competitive advantage",
    "actions": [...]
  },
  "tier3": {
    "title": "Advanced (Do Later)",
    "description": "Nice-to-have optimizations",
    "actions": [...]
  }
}

Each tier should have 2-4 specific, actionable items. Be concrete and specific to this business.`;

  try {
    const response = await callOpenAI(openaiKey, prompt);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.error('Error generating action plan:', error);
  }

  // Fallback action plan
  return {
    tier1: {
      title: "Foundation (Do First)",
      description: "Critical fixes that must be done immediately",
      actions: [
        {
          title: "Fix Critical SEO Issues",
          description: "Address high-priority items identified in the audit",
          impact: "High",
          effort: "Medium"
        }
      ]
    },
    tier2: {
      title: "Growth (Do Next)",
      description: "Important improvements for competitive advantage",
      actions: [
        {
          title: "Enhance Content Strategy",
          description: "Develop comprehensive content covering services and FAQs",
          impact: "High",
          effort: "High"
        }
      ]
    },
    tier3: {
      title: "Advanced (Do Later)",
      description: "Nice-to-have optimizations",
      actions: [
        {
          title: "Advanced Schema Implementation",
          description: "Add rich snippets and advanced structured data",
          impact: "Medium",
          effort: "Medium"
        }
      ]
    }
  };
}

function generateFallbackResults(auditType: string): AuditResult[] {
  const fallbacks = {
    local_seo: [
      {
        audit_type: 'local_seo',
        category: 'Initial Assessment',
        item_name: 'Audit In Progress',
        score: 50,
        status: 'needs_improvement',
        recommendations: 'The automated audit encountered an issue. Please review the website manually for local SEO factors.',
        positive_feedback: null,
        details: {},
      },
    ],
    aeo: [
      {
        audit_type: 'aeo',
        category: 'Initial Assessment',
        item_name: 'Audit In Progress',
        score: 50,
        status: 'needs_improvement',
        recommendations: 'The automated audit encountered an issue. Please review the website manually for AEO factors.',
        positive_feedback: null,
        details: {},
      },
    ],
    voice_seo: [
      {
        audit_type: 'voice_seo',
        category: 'Initial Assessment',
        item_name: 'Audit In Progress',
        score: 50,
        status: 'needs_improvement',
        recommendations: 'The automated audit encountered an issue. Please review the website manually for Voice SEO factors.',
        positive_feedback: null,
        details: {},
      },
    ],
    gbp: [
      {
        audit_type: 'gbp',
        category: 'Initial Assessment',
        item_name: 'Audit In Progress',
        score: 50,
        status: 'needs_improvement',
        recommendations: 'The automated audit encountered an issue. Please review the GBP profile manually.',
        positive_feedback: null,
        details: {},
      },
    ],
  };

  return fallbacks[auditType as keyof typeof fallbacks] || [];
}
