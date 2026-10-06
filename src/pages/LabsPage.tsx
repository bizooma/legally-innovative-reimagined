import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import { seo, hero, intro, items, statusOrder, close, type LabItem, type LabStatus } from "@/content/labs";

const OX = "text-[#7A0A0A]";
const CRIMSON = "text-[#E0313A]";
const inner = "mx-auto w-full max-w-[1180px] px-5 sm:px-8";

const chip: Record<LabStatus, string> = {
  Live: "bg-status-live-bg text-status-live",
  "In development": "bg-status-dev-bg text-status-dev",
  Retired: "bg-status-retired-bg text-status-retired",
};

function withFrameworkLink(text: string) {
  return text.split(/(\[\[[^\]]+\]\])/g).map((part, i) =>
    part.startsWith("[[") ? (
      <Link key={i} to={intro.frameworkLink} className={`${OX} underline underline-offset-4`}>{part.slice(2, -2)}</Link>
    ) : <Fragment key={i}>{part}</Fragment>
  );
}

function ItemCard({ item }: { item: LabItem }) {
  const external = item.link?.startsWith("http");
  const linkClass = `mt-auto inline-flex items-center gap-1 pt-4 font-raleway text-sm font-semibold ${OX} hover:underline underline-offset-4`;
  const label = external ? item.link!.replace(/^https?:\/\//, "") : "Learn more";
  return (
    <li className="flex flex-col border border-[#1a1a1a]/12 bg-[#fbf8f3] p-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-playfair text-xl text-[#1a1a1a]">{item.name}</h3>
        <span className={`rounded-full px-2.5 py-0.5 font-raleway text-[11px] font-semibold uppercase tracking-wider ${chip[item.status]}`}>{item.status}</span>
      </div>
      <p className="font-raleway text-[15px] leading-relaxed text-[#1a1a1a]/75">{item.description}</p>
      {item.link && (external ? (
        <a href={item.link} target="_blank" rel="noopener noreferrer" className={linkClass}>{label} <ArrowUpRight className="h-4 w-4" /></a>
      ) : (
        <Link to={item.link} className={linkClass}>{label} <ArrowUpRight className="h-4 w-4" /></Link>
      ))}
    </li>
  );
}

const LabsPage = () => (
  <div className="min-h-screen overflow-x-hidden bg-[#fbf8f3]">
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="website" />
    </Helmet>
    <Navbar />
    <main>
      <section className="bg-[#020817] text-[#f5f1ea] pt-36 pb-20 lg:pt-44 lg:pb-28">
        <div className={inner}>
          <p className={`font-raleway text-xs font-semibold uppercase tracking-[0.2em] mb-4 ${CRIMSON}`}>{hero.eyebrow}</p>
          <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-8">{hero.title}</h1>
          <p className="font-playfair text-2xl lg:text-3xl leading-snug max-w-3xl mb-6">{hero.lede}</p>
          <p className="font-raleway text-base lg:text-lg leading-relaxed text-[#f5f1ea]/75 max-w-[34rem]">{hero.sub}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 border-b border-[#1a1a1a]/10">
        <div className={inner}>
          <div className="max-w-[34rem] space-y-5 font-raleway text-lg leading-relaxed text-[#1a1a1a]/85">
            {intro.paragraphs.map((p, i) => <p key={i}>{withFrameworkLink(p)}</p>)}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className={`${inner} space-y-14`}>
          {statusOrder.map((status) => {
            const group = items.filter((i) => i.status === status);
            if (!group.length) return null;
            return (
              <div key={status}>
                <h2 className="font-playfair text-3xl text-[#1a1a1a] mb-6">{status}</h2>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.map((item) => <ItemCard key={item.name} item={item} />)}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[#020817] text-[#f5f1ea] py-16 lg:py-24">
        <div className={inner}>
          <h2 className="font-playfair text-3xl lg:text-4xl mb-5">{close.title}</h2>
          <p className="font-raleway text-lg leading-relaxed text-[#f5f1ea]/80 max-w-[34rem]">{close.text}</p>
        </div>
      </section>
    </main>
    <Footer />
    <MobileFooterNav />
  </div>
);

export default LabsPage;
