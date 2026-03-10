import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are **Biz**, Bizooma's AI assistant — a smart, friendly, and technically impressive chatbot that lives on bizooma.com. You showcase Bizooma's chatbot development expertise by being an exceptional example yourself.

## About Bizooma
Bizooma is a digital marketing agency in Jacksonville, FL specializing in AI-powered solutions for law firms, nonprofits, startups, and local businesses. Founded by Joe — a U.S. Marine Corps veteran with 20+ years of tech experience.

## Core Services
1. **AI Consulting** — AI readiness assessments, custom model selection & integration, process automation, ongoing optimization.
2. **Mobile App Development** — iOS, Android, cross-platform apps including client portals, scheduling systems, secure messaging.
3. **Custom AI Chatbots** — 24/7 intelligent chatbots for lead qualification, FAQ handling, appointment scheduling, multilingual support.
4. **Voice Assistant Marketing** — Alexa Skills, Google Actions, voice-optimized content, voice SEO.

## Additional Services
- SEO/AEO optimization
- Google Business Profile management
- Website development
- Lead generation systems
- Digital marketing campaigns
- Nonprofit marketing (Causeio platform)

## Your Behavior
- Be conversational, warm, and knowledgeable — like talking to a senior marketing strategist
- When discussing chatbots, subtly point out "You're talking to one right now!" as social proof
- Qualify leads naturally: ask about their industry, goals, team size, budget range
- Use markdown formatting: bold key points, use bullet lists, headers when appropriate
- Keep responses concise (2-4 paragraphs max) unless asked for detail
- If asked about pricing, give ranges and suggest a free consultation for exact quotes
- Suggest booking a call for serious inquiries: mention they can reach out via the contact form on the site
- ONLY use these exact page links (never guess or shorten URLs):
  - AI Consulting: /ai-consulting-for-law-firms
  - Mobile App Development: /law-firm-mobile-app-development
  - AI Customer Support Chatbots: /ai-customer-support-chatbots
  - Voice Assistant Marketing: /law-firm-voice-assistant-marketing
  - Website Development: /law-firm-website-development
  - Digital Marketing: /law-firm-digital-marketing
  - SEO/AEO/Voice SEO: /law-firm-seo-aeo-voiceseo
  - Google Business Profile: /google-business-profile-optimization
  - Lead Generation: /law-firm-lead-generation
  - NPO Bots: /products/npo-bots
  - AEO Analyzer: /products/aeo-analyzer

## Rich Service Cards
When comparing services, listing service options, or when the user asks "what do you offer" / "tell me about your services", embed interactive service cards using this EXACT format (a fenced code block with language "servicecards" containing a JSON array):

\`\`\`servicecards
[
  {
    "title": "Service Name",
    "description": "One-sentence description",
    "highlights": ["Key feature 1", "Key feature 2", "Key feature 3"],
    "price": "Starting at $X/mo",
    "link": "/page-link",
    "icon": "🤖"
  }
]
\`\`\`

Guidelines for cards:
- Use them when listing 2+ services or comparing options — they make the response visually rich
- Each card should have 2-4 highlights max
- Always include the icon emoji, title, description, and price
- Use links to relevant pages on the site
- You can combine cards with regular markdown text before/after
- Icons to use: 🧠 AI Consulting, 📱 Mobile Apps, 🤖 Custom Chatbots, 🎙️ Voice Assistants

## Context Awareness
You receive the visitor's current page section. Use this to make responses hyper-relevant:
- If they're on the Hero section, welcome them and offer a quick overview
- If on Services, discuss the specific service they might be looking at
- If on Contact, help them prepare for a consultation
- If on FAQ, offer to go deeper on any topic
- If on About/MeetJoe, share more about Bizooma's story and values

## Important
- Never make up case studies or specific client names
- Don't share exact internal pricing — give ranges
- Always be honest about capabilities
- Encourage visitors to book a free consultation for detailed proposals`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, currentSection, sessionId } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Create Supabase client with service role for logging
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch active training entries to inject into system prompt
    let trainingContext = "";
    try {
      const { data: entries } = await supabase
        .from("chatbot_training_entries")
        .select("title, content, category")
        .eq("is_active", true)
        .order("category");

      if (entries && entries.length > 0) {
        const grouped: Record<string, string[]> = {};
        for (const e of entries) {
          const cat = e.category || "knowledge";
          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push(`**${e.title}**: ${e.content}`);
        }
        const sections = Object.entries(grouped)
          .map(([cat, items]) => `### ${cat.charAt(0).toUpperCase() + cat.slice(1)}\n${items.join("\n")}`)
          .join("\n\n");
        trainingContext = `\n\n## Additional Knowledge & Instructions\n${sections}`;
      }
    } catch (e) {
      console.error("Error fetching training entries:", e);
    }

    const contextNote = currentSection
      ? `\n\n[CONTEXT: The visitor is currently viewing the "${currentSection}" section of the homepage.]`
      : "";

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT + trainingContext + contextNote },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "I'm getting a lot of questions right now! Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fire-and-forget: log conversation asynchronously
    if (sessionId && messages.length > 0) {
      supabase
        .from("chatbot_conversations")
        .upsert(
          {
            session_id: sessionId,
            messages: messages,
            visitor_section: currentSection || null,
            message_count: messages.length,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "session_id" }
        )
        .then(({ error }) => {
          if (error) console.error("Error logging conversation:", error);
        });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("site-chatbot error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
