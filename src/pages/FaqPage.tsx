import HeroTexture from "@/components/HeroTexture";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EditorialShell } from "@/pages/products/ProductLayout";
import { faq as c, type FaqItem } from "@/content/faq";

function Answer({ item }: { item: FaqItem }) {
  if (!item.links?.length) return <p>{item.answer}</p>;
  const parts: React.ReactNode[] = [];
  let rest = item.answer;
  item.links.forEach((l) => {
    const i = rest.indexOf(l.label);
    if (i < 0) return;
    parts.push(rest.slice(0, i), <Link key={l.href} to={l.href} className="product-link">{l.label}</Link>);
    rest = rest.slice(i + l.label.length);
  });
  parts.push(rest);
  return <p>{parts}</p>;
}

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: c.categories.flatMap((cat) => cat.questions.map((q) => ({
    "@type": "Question", name: q.question, acceptedAnswer: { "@type": "Answer", text: q.answer },
  }))),
};

export default function FaqPage() {
  return (
    <EditorialShell title={c.seoTitle} description={c.description} path="/faq">
      <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
      <section className="product-inverted product-hero hero-textured"><HeroTexture /><div className="product-inner">
        <p className="product-eyebrow">{c.eyebrow}</p><h1>{c.title}</h1><p className="product-lede">{c.lede}</p>
      </div></section>
      <section className="product-band"><div className="product-inner max-w-[820px] ml-0">
        {c.categories.map((cat, ci) => (
          <div key={cat.category} className="mb-12">
            <h2 className="product-heading !mb-4 !text-2xl">{cat.category}</h2>
            <Accordion type="single" collapsible className="w-full">
              {cat.questions.map((q, qi) => (
                <AccordionItem key={q.question} value={`${ci}-${qi}`}>
                  <AccordionTrigger className="text-left font-medium text-lg">{q.question}</AccordionTrigger>
                  <AccordionContent keepMounted className="text-base leading-relaxed"><Answer item={q} /></AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div></section>
    </EditorialShell>
  );
}
