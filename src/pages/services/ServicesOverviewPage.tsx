import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { seo, hero, intro, services, startHere } from "@/content/services/overview";
import { ServiceHero, inner, OX, CRIMSON } from "./ServicePage";

const ServicesOverviewPage = () => (
  <div className="min-h-screen overflow-x-hidden bg-[#fbf8f3]">
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href="https://bizooma.com/services" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="website" />
    </Helmet>
    <Navbar />
    <main>
      <ServiceHero hero={hero} />

      <section className="py-16 lg:py-24">
        <div className={inner}>
          <div className="max-w-[34rem] space-y-5 font-raleway text-lg leading-relaxed text-[#1a1a1a]/85">
            {intro.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className={inner}>
          <ol className="border-t border-[#1a1a1a]/15">
            {services.map((s, i) => (
              <li key={s.href} className="border-b border-[#1a1a1a]/15">
                <Link to={s.href} className="group grid gap-2 py-8 md:grid-cols-[4rem_1fr_auto] md:items-baseline md:gap-8">
                  <span className={`font-playfair text-lg ${OX}`}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h2 className="font-playfair text-2xl lg:text-4xl text-[#1a1a1a] group-hover:text-[#7A0A0A] transition-colors mb-2">{s.name}</h2>
                    <p className="font-raleway text-base lg:text-lg text-[#1a1a1a]/75 max-w-2xl">{s.description}</p>
                  </div>
                  <ArrowRight className={`hidden md:block h-6 w-6 ${OX} transition-transform group-hover:translate-x-1`} />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#020817] text-[#f5f1ea] py-16 lg:py-24">
        <div className={inner}>
          <h2 className="font-playfair text-3xl lg:text-4xl mb-5">{startHere.title}</h2>
          <p className="font-raleway text-lg leading-relaxed text-[#f5f1ea]/80 max-w-[34rem] mb-8">{startHere.paragraph}</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {startHere.links.map((l) => (
              <Link key={l.href} to={l.href} className={`inline-flex items-center gap-1 font-raleway font-semibold ${CRIMSON} hover:underline underline-offset-4`}>
                {l.label} <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
    <MobileFooterNav />
  </div>
);

export default ServicesOverviewPage;
