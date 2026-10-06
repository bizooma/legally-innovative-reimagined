import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import type { ServicePageContent, AudienceBand } from "@/content/services/types";

export const OX = "text-[#7A0A0A]";
export const CRIMSON = "text-[#E0313A]";
export const inner = "mx-auto w-full max-w-[1180px] px-5 sm:px-8";
export const eyebrow = "font-raleway text-xs font-semibold uppercase tracking-[0.2em] mb-4";

export function ServiceHero({ hero }: { hero: { eyebrow: string; title: string; lede: string; sub: string } }) {
  return (
    <section className="bg-[#020817] text-[#f5f1ea] pt-36 pb-20 lg:pt-44 lg:pb-28">
      <div className={inner}>
        <p className={`${eyebrow} ${CRIMSON}`}>{hero.eyebrow}</p>
        <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-8">{hero.title}</h1>
        <p className="font-playfair text-2xl lg:text-3xl leading-snug max-w-3xl mb-6">{hero.lede}</p>
        <p className="font-raleway text-base lg:text-lg leading-relaxed text-[#f5f1ea]/75 max-w-[34rem]">{hero.sub}</p>
      </div>
    </section>
  );
}

function Audience({ band }: { band: AudienceBand }) {
  return (
    <div>
      <h3 className="font-playfair text-2xl lg:text-3xl text-[#1a1a1a] mb-4">{band.title}</h3>
      <p className="font-raleway text-base leading-relaxed text-[#1a1a1a]/80 mb-5">{band.paragraph}</p>
      <ul className="space-y-2.5">
        {band.bullets.map((b) => (
          <li key={b} className="flex gap-3 font-raleway text-[15px] text-[#1a1a1a]/85">
            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#7A0A0A]" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

const ServicePage = ({ content: c }: { content: ServicePageContent }) => {
  const url = `https://bizooma.com/services/${c.slug}`;
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fbf8f3]">
      <Helmet>
        <title>{c.seo.title}</title>
        <meta name="description" content={c.seo.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={c.seo.title} />
        <meta property="og:description" content={c.seo.description} />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <main>
        <ServiceHero hero={c.hero} />

        <section className="py-16 lg:py-24">
          <div className={inner}>
            <h2 className="font-playfair text-3xl lg:text-5xl leading-tight text-[#1a1a1a] mb-8 max-w-3xl">{c.argument.title}</h2>
            <div className="max-w-[34rem] space-y-5 font-raleway text-lg leading-relaxed text-[#1a1a1a]/85">
              {c.argument.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-[#f3ede4]">
          <div className={inner}>
            <h2 className="font-playfair text-3xl lg:text-4xl text-[#1a1a1a] mb-8">{c.work.title}</h2>
            <ol className="grid gap-x-10 border-t border-[#1a1a1a]/15 md:grid-cols-2">
              {c.work.items.map((item, i) => (
                <li key={item} className="flex gap-4 border-b border-[#1a1a1a]/15 py-4 font-raleway text-base text-[#1a1a1a]/85">
                  <span className={`font-playfair text-sm ${OX} w-6 shrink-0`}>{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className={`${inner} grid gap-12 md:grid-cols-2 md:gap-16`}>
            <Audience band={c.lawFirms} />
            <Audience band={c.nonprofits} />
          </div>
        </section>

        <section className="border-y border-[#1a1a1a]/10 py-10">
          <div className={`${inner} flex flex-col gap-3 md:flex-row md:items-center md:justify-between`}>
            <p className="font-playfair italic text-lg text-[#1a1a1a]/80 max-w-3xl">{c.framework.line}</p>
            <Link to={c.framework.href} className={`inline-flex items-center gap-1 font-raleway text-sm font-semibold ${OX} hover:underline underline-offset-4 shrink-0`}>
              {c.framework.linkLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="bg-[#020817] text-[#f5f1ea] py-16 lg:py-24">
          <div className={inner}>
            <h2 className="font-playfair text-3xl lg:text-4xl mb-5">{c.cta.title}</h2>
            <p className="font-raleway text-lg leading-relaxed text-[#f5f1ea]/80 max-w-[34rem] mb-8">{c.cta.paragraph}</p>
            <a href={c.cta.href} className="inline-flex items-center gap-2 bg-[#7A0A0A] hover:bg-[#931010] px-6 py-3 font-raleway font-semibold text-[#f5f1ea] transition-colors">
              {c.cta.buttonLabel} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default ServicePage;
