import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import glossary from "@/data/ai-glossary.json";

export default function AiExplainedPage() {
  return (
    <div className="min-h-screen bg-[#fbf8f3]">
      <Helmet>
        <title>AI Terms, Explained in Plain English | Bizooma</title>
        <meta
          name="description"
          content="A plain-English glossary of AI terms for law firms and professionals. Clear definitions for the jargon you'll actually run into when AI shows up in your work."
        />
        <link rel="canonical" href="https://legallyinnovative.com/ai-explained" />
      </Helmet>
      <Navbar />

      <main>
        <section className="pt-28 pb-16 lg:pt-32 lg:pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-5xl font-bold text-legal-dark leading-tight mb-6">
                AI Terms, Explained in Plain English
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                AI is moving fast, and the jargon moves faster. This page cuts through it — no computer science degree required. Just clear definitions for the terms you'll actually run into when AI shows up in your work, grouped so you can find what you need.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 lg:pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl space-y-16">
              {glossary.sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="text-2xl lg:text-3xl font-bold text-legal-dark mb-8 pb-3 border-b border-[#e6d5bf]">
                    {section.heading}
                  </h2>
                  <dl className="space-y-8">
                    {section.terms.map((t) => (
                      <div key={t.term} className="scroll-mt-28">
                        <dt className="text-lg font-semibold text-legal-dark mb-2">
                          {t.term}
                        </dt>
                        <dd className="text-muted-foreground leading-relaxed">
                          {t.definition}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-[#e6d5bf]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl text-center">
              <p className="text-muted-foreground italic">
                Still seeing a term you can't quite pin down? That's usually the sign it's about to matter. Reach out — happy to translate.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <a href="mailto:joe@bizooma.com" className="hover:text-legal-dark transition-colors">
                  joe@bizooma.com
                </a>
                <span className="hidden sm:inline">·</span>
                <a href="tel:904-295-6670" className="hover:text-legal-dark transition-colors">
                  904-295-6670
                </a>
                <span className="hidden sm:inline">·</span>
                <a href="https://bizooma.com" target="_blank" rel="noopener noreferrer" className="hover:text-legal-dark transition-colors">
                  bizooma.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileFooterNav />
    </div>
  );
}
