import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";

interface TermDef {
  term: string;
  definition: string;
}

interface TermSection {
  heading: string;
  terms: TermDef[];
}

const sections: TermSection[] = [
  {
    heading: "The Foundations",
    terms: [
      {
        term: "Artificial Intelligence (AI)",
        definition:
          "Software that performs tasks we'd normally expect to require human thinking — understanding language, spotting patterns, making decisions, creating content. It's a broad umbrella, and most of what people call "AI" today is one specific branch of it (see Generative AI).",
      },
      {
        term: "Machine Learning (ML)",
        definition:
          "A way of building AI where the software learns patterns from examples instead of being hand-coded with rules. Show it thousands of contracts and it learns what a contract looks like, rather than someone writing out every rule by hand.",
      },
      {
        term: "Deep Learning",
        definition:
          "A more advanced form of machine learning that stacks many layers of processing (see Neural Network) to handle very complex patterns. It's the breakthrough that made today's image recognition, speech, and language tools possible.",
      },
      {
        term: "Neural Network",
        definition:
          "A computing structure loosely inspired by how the brain connects neurons. Information passes through layers, each picking up on finer detail, which is what lets the system recognize nuance — a face, a tone, the meaning.",
      },
      {
        term: "Generative AI",
        definition:
          "AI that creates new content — text, images, audio, code — rather than just analyzing existing data. When a tool drafts an email, summarizes a deposition, or writes a blog post, that's generative AI at work.",
      },
      {
        term: "Large Language Model (LLM)",
        definition:
          'The engine behind most text-based AI tools, like ChatGPT, Claude, and Gemini. It's trained on enormous amounts of text and works by predicting what comes next, which lets it answer questions, draft documents, and hold a conversation. "Large" refers to the sheer amount of data and computing power behind it.',
      },
      {
        term: "Foundation Model (or Frontier Model)",
        definition:
          'A large, general-purpose AI trained on a massive, broad dataset so it can be adapted to many different tasks. "Frontier model" refers to the most capable, cutting-edge ones at any given moment. Most AI products you use are built on top of one.',
      },
      {
        term: "Natural Language Processing (NLP)",
        definition:
          "The field focused on helping computers understand and work with human language. It's what lets you type a plain-English question and get a sensible answer back, instead of needing special commands or code.",
      },
    ],
  },
  {
    heading: "How AI Actually Works",
    terms: [
      {
        term: "Model",
        definition:
          "The specific trained system doing the work. When someone asks "which model are you using," they mean which exact AI. Different models have different strengths, speeds, and costs.",
      },
      {
        term: "Parameters",
        definition:
          "The internal settings a model adjusts as it learns — think of them as the dials that store everything it has picked up. Models are often described by their parameter count, in the billions. More isn't automatically better, but it's a rough signal of capacity.",
      },
      {
        term: "Training Data",
        definition:
          "The examples an AI learned from. The source matters: a model trained on the broad internet knows a little about everything, while one trained further on legal documents will be sharper with legal language.",
      },
      {
        term: "Token",
        definition:
          "The small chunks of text an AI reads and writes — roughly a word or part of a word. Usage and pricing are usually measured in tokens, not words. Rough rule of thumb: 1,000 tokens is about 750 words.",
      },
      {
        term: "Context Window",
        definition:
          "How much information an AI can hold in mind at once — your input plus its response. A larger context window means you can feed it a long document and it won't lose track of the start by the time it reaches the end.",
      },
      {
        term: "Inference",
        definition:
          "The moment an AI produces an answer from your input. Training is how the model learns; inference is it doing the actual work, in real time.",
      },
      {
        term: "Fine-Tuning",
        definition:
          "Taking a general model and training it further on a narrower set of examples so it specializes — for instance, shaping a general-purpose writer into one that matches your organization's voice and document style.",
      },
      {
        term: "Embeddings & Vector Database",
        definition:
          "A way of turning text into numbers that capture meaning, so a computer can find related ideas even when the wording differs. A vector database stores those numbers — and together they're what make RAG (below) work, letting an AI search your documents by meaning rather than exact keywords.",
      },
      {
        term: "Retrieval-Augmented Generation (RAG)",
        definition:
          "A setup where the AI looks up relevant information from your own documents or database before answering, instead of relying only on what it learned in training. This is how you get an AI that can answer questions about your specific files, policies, or knowledge base — accurately, and with sources.",
      },
      {
        term: "Multimodal",
        definition:
          "An AI that can work with more than one type of input or output — text, images, audio, even video — in the same conversation. You can hand it a photo of a document and ask questions about it, rather than being limited to typed text.",
      },
      {
        term: "Temperature",
        definition:
          "A setting that controls how predictable or creative an AI's responses are. Low temperature keeps it focused and consistent — good for legal drafting. Higher temperature makes it more varied and inventive — good for brainstorming.",
      },
      {
        term: "Hallucination",
        definition:
          "When an AI states something false with complete confidence — an invented citation, a made-up statute, a fabricated fact. This is the single most important risk to understand: AI output is a draft to verify, not a source of truth. In legal work especially, a fabricated citation has real consequences.",
      },
    ],
  },
  {
    heading: "Working With AI",
    terms: [
      {
        term: "Prompt",
        definition:
          'The instruction or question you give an AI. The clearer and more specific the prompt, the better the result. "Write a client intake email" gets you something generic; "Write a warm, three-paragraph intake email for a personal injury client, no legalese" gets you something usable.',
      },
      {
        term: "Prompt Engineering",
        definition:
          "The skill of writing prompts that reliably produce good output — giving the AI context, examples, format, and constraints. It's less about magic words and more about clear delegation, the same way you'd brief a sharp new assistant.",
      },
      {
        term: "System Prompt",
        definition:
          'The behind-the-scenes instructions that set an AI's role, tone, and rules before you ever type a word — for example, "You are a paralegal assistant; never give legal advice; always cite sources." It's how a tool is shaped to behave consistently every time.',
      },
      {
        term: "Chatbot / Conversational AI",
        definition:
          "An AI you interact with through back-and-forth conversation. Modern ones, powered by LLMs, can handle nuanced questions — a big step up from the rigid menu-tree bots of the past.",
      },
      {
        term: "Copilot",
        definition:
          "A term for AI built directly into a tool you already use, working alongside you as you go — suggesting the next line as you write, the next formula in a spreadsheet. The name signals the intent: it assists, you stay in command.",
      },
      {
        term: "AI Agent / Agentic AI",
        definition:
          "AI that doesn't just answer — it takes action across multiple steps to finish a goal. Instead of handing you a draft reply, an agent might read the email, check the calendar, draft the response, and schedule the follow-up. This is where much of the current momentum is heading.",
      },
      {
        term: "Human-in-the-Loop",
        definition:
          "A workflow where a person reviews or approves the AI's work before it goes out the door. It's the smart default for anything high-stakes: let AI do the heavy lifting, but keep human judgment on the final sign-off. Knowing where to draw that line — what's safe to automate fully versus what needs a human signature — is half the battle.",
      },
      {
        term: "Automation",
        definition:
          "Getting repetitive work to happen without manual effort. Worth noting: not all automation is AI. A rule like "tag every email from this client" is automation; an AI that summarizes those emails is AI. The most useful systems combine both.",
      },
      {
        term: "Guardrails",
        definition:
          "The limits and safety checks built around an AI to keep it from doing or saying things it shouldn't — staying on topic, refusing harmful requests, protecting sensitive data. Good guardrails are what make AI safe to put in front of clients.",
      },
      {
        term: "API",
        definition:
          "The plumbing that lets two software tools talk to each other. It's how an AI feature gets connected into the apps you already use — so AI works inside your existing tools instead of being one more separate login.",
      },
    ],
  },
  {
    heading: "Trust, Risk & Governance",
    terms: [
      {
        term: "AI Bias",
        definition:
          "When an AI produces skewed or unfair results because the data it learned from carried those patterns. It matters anywhere fairness and consequences are on the line — hiring, lending, intake screening — and it's a key reason human review stays essential\n      },\n      {\n        term: "Data Privacy & Confidentiality",\n        definition:\n          "The question of what happens to the information you put into an AI tool — is it stored, is it used to train the model, who can see it. For anyone handling privileged or sensitive material, this is the first question to ask before adopting a tool, not the last."\n      },\n      {\n        term: "Responsible AI (AI Governance)",\n        definition:\n          "The practices and policies that keep AI use ethical, transparent, and accountable: clear rules on what's allowed, human oversight on high-stakes decisions, and a record of how AI is being used. For regulated fields, a written policy is fast becoming table stakes."\n      },\n      {\n        term: "Prompt Injection",\n        definition:\n          "A security risk where hidden or malicious instructions get slipped into content an AI reads — a web page, an email, a document — tricking it into ignoring its real instructions. It's why you don't let an AI act on untrusted text without a human check."\n      },\n    ],\n  },\n  {\n    heading: "AI & Getting Found Online",\n    terms: [\n      {\n        term: "SEO (Search Engine Optimization)",\n        definition:\n          "The long-standing practice of getting your website to rank in search results so people find you on Google."\n      },\n      {\n        term: "AEO (Answer Engine Optimization)",\n        definition:\n          "The newer discipline of getting your business cited when people ask an AI tool a question — ChatGPT, Google's AI overviews, and the like — instead of running a traditional search. As more people \\"ask AI\\" rather than \\"search Google,\\" being the answer the AI gives matters as much as ranking on page one."\n      },\n      {\n        term: "GEO (Generative Engine Optimization)",\n        definition:\n          "Often used interchangeably with AEO: shaping your content so generative AI tools surface and cite it when answering questions. If you see GEO and AEO used to mean roughly the same thing, you're not missing anything — the field is still settling on its vocabulary."\n      },\n      {\n        term: "Answer Engine",\n        definition:\n          "Any AI tool that responds with a direct answer rather than a list of links. The shift from search engines to answer engines is quietly changing how clients discover the businesses they hire."\n      },\n    ],\n  },\n];\n\nexport default function AiExplainedPage() {\n  return (\n    <div className="min-h-screen bg-[#fbf8f3]">\n      <Helmet>\n        <title>AI Terms, Explained in Plain English | Bizooma</title>\n        <meta\n          name="description"\n          content="A plain-English glossary of AI terms for law firms and professionals. Clear definitions for the jargon you'll actually run into when AI shows up in your work."\n        />\n        <link rel="canonical" href="https://legallyinnovative.com/ai-explained" />\n      </Helmet>\n      <Navbar />\n\n      <main>\n        {/* Hero */}\n        <section className="pt-28 pb-16 lg:pt-32 lg:pb-20">\n          <div className="container mx-auto px-4">\n            <div className="max-w-3xl">\n              <h1 className="text-4xl lg:text-5xl font-bold text-legal-dark leading-tight mb-6">\n                AI Terms, Explained in Plain English\n              </h1>\n              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">\n                AI is moving fast, and the jargon moves faster. This page cuts through it — no computer science degree required. Just clear definitions for the terms you'll actually run into when AI shows up in your work, grouped so you can find what you need.\n              </p>\n            </div>\n          </div>\n        </section>\n\n        {/* Sections */}\n        <section className="pb-16 lg:pb-24">\n          <div className="container mx-auto px-4">\n            <div className="max-w-3xl space-y-16">\n              {sections.map((section) => (\n                <div key={section.heading}>\n                  <h2 className="text-2xl lg:text-3xl font-bold text-legal-dark mb-8 pb-3 border-b border-[#e6d5bf]">\n                    {section.heading}\n                  </h2>\n                  <dl className="space-y-8">\n                    {section.terms.map((t) => (\n                      <div\n                        key={t.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}\n                        className="scroll-mt-28"\n                      >\n                        <dt className="text-lg font-semibold text-legal-dark mb-2">\n                          {t.term}\n                        </dt>\n                        <dd className="text-muted-foreground leading-relaxed">\n                          {t.definition}\n                        </dd>\n                      </div>\n                    ))}\n                  </dl>\n                </div>\n              ))}\n            </div>\n          </div>\n        </section>\n\n        {/* CTA */}\n        <section className="py-16 bg-white border-t border-[#e6d5bf]">\n          <div className="container mx-auto px-4">\n            <div className="max-w-3xl text-center">\n              <p className="text-muted-foreground italic">\n                Still seeing a term you can't quite pin down? That's usually the sign it's about to matter. Reach out — happy to translate.\n              </p>\n              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">\n                <a href="mailto:joe@bizooma.com" className="hover:text-legal-dark transition-colors">\n                  joe@bizooma.com\n                </a>\n                <span className="hidden sm:inline">·</span>\n                <a href="tel:904-295-6670" className="hover:text-legal-dark transition-colors">\n                  904-295-6670\n                </a>\n                <span className="hidden sm:inline">·</span>\n                <a href="https://bizooma.com" target="_blank" rel="noopener noreferrer" className="hover:text-legal-dark transition-colors">\n                  bizooma.com\n                </a>\n              </div>\n            </div>\n          </div>\n        </section>\n      </main>\n\n      <Footer />\n      <MobileFooterNav />\n    </div>\n  );\n}\n