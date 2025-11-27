import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, accessCodeId } = await req.json();
    
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch audit access code data
    const { data: accessCodeData, error: accessCodeError } = await supabase
      .from('audit_access_codes')
      .select('*')
      .eq('id', accessCodeId)
      .single();

    if (accessCodeError || !accessCodeData) {
      throw new Error('Failed to fetch access code data');
    }

    // Fetch audit results
    const { data: auditResults, error: resultsError } = await supabase
      .from('audit_results')
      .select('*')
      .eq('access_code_id', accessCodeId)
      .order('audit_type', { ascending: true })
      .order('category', { ascending: true });

    if (resultsError) {
      throw new Error('Failed to fetch audit results');
    }

    // Calculate overall metrics
    const totalScore = auditResults?.reduce((sum, r) => sum + r.score, 0) || 0;
    const avgScore = auditResults?.length ? Math.round(totalScore / auditResults.length) : 0;
    const strengthsCount = auditResults?.filter(r => r.score >= 70).length || 0;
    const improvementCount = auditResults?.filter(r => r.score < 70).length || 0;

    // Group results by audit type and category
    const groupedResults = auditResults?.reduce((acc, result) => {
      if (!acc[result.audit_type]) {
        acc[result.audit_type] = {};
      }
      if (!acc[result.audit_type][result.category]) {
        acc[result.audit_type][result.category] = [];
      }
      acc[result.audit_type][result.category].push({
        item: result.item_name,
        score: result.score,
        status: result.status,
        recommendations: result.recommendations,
        positive: result.positive_feedback
      });
      return acc;
    }, {} as Record<string, Record<string, any[]>>);

    // Build context string
    let formattedResults = '';
    for (const [auditType, categories] of Object.entries(groupedResults || {})) {
      formattedResults += `\n## ${auditType.toUpperCase()}\n`;
      for (const [category, items] of Object.entries(categories)) {
        formattedResults += `\n### ${category}\n`;
        for (const item of items) {
          formattedResults += `- ${item.item}: ${item.score}/100 (${item.status})\n`;
          if (item.positive) formattedResults += `  ✓ ${item.positive}\n`;
          if (item.recommendations) formattedResults += `  → ${item.recommendations}\n`;
        }
      }
    }

    // Business context
    const businessContext = accessCodeData.questionnaire_completed ? `
Business Context:
- Reach: ${accessCodeData.business_reach || 'N/A'}
- Model: ${accessCodeData.business_model || 'N/A'}
- Industry: ${accessCodeData.industry || 'N/A'}
- Goals: ${accessCodeData.primary_goals?.join(', ') || 'N/A'}
- Target Audience: ${accessCodeData.target_audience || 'N/A'}` : '';

    const systemPrompt = `You are an expert SEO consultant analyzing audit results for ${accessCodeData.client_name}.
Website: ${accessCodeData.website_url}
${accessCodeData.gbp_url ? `Google Business Profile: ${accessCodeData.gbp_url}` : ''}
${businessContext}

AUDIT RESULTS SUMMARY:
Overall Score: ${avgScore}/100
Strengths: ${strengthsCount} items scoring 70+
Areas for Improvement: ${improvementCount} items scoring below 70

DETAILED FINDINGS:
${formattedResults}

Your role:
- Answer questions about the audit findings in a clear, actionable way
- Prioritize recommendations based on impact
- Explain SEO concepts in simple terms
- Provide specific, actionable advice
- Reference the actual data from the audit
- Be encouraging while being honest about improvements needed

Keep responses concise and actionable. Use bullet points when listing recommendations.`;

    console.log('Starting OpenAI streaming request');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    // Return the streaming response
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
      },
    });

  } catch (error) {
    console.error('Error in audit-chat function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
