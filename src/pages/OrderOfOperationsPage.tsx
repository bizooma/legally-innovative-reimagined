import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFooterNav from "@/components/MobileFooterNav";
import {
  seo, hero, chain, argument, pillars, blockersIntro, blockers,
  scheduleIntro, schedule, close, type Pillar,
} from "@/content/orderOfOperations";

// Page palette (per brief): oxblood on light, crimson on dark, near-black inverted.
const OX = "text-[#7A0A0A]";
const CRIMSON = "text-[#E0313A]";
const inner = "mx-auto w-full max-w-[1180px] px-5 sm:px-8";

function rich(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") ? <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong> : <Fragment key={i}>{part}</Fragment>
  );
}

function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return <p className={`font-raleway text-xs font-semibold uppercase tracking-[0.2em] mb-4 ${dark ? CRIMSON : OX}`}>{children}</p>;
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#020817] text-[#f5f1ea] pt-36 pb-24 lg:pt-44 lg:pb-32">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-40 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(224,49,58,0.35)_0%,rgba(224,49,58,0)_65%)]" />
      <div className={`${inner} relative`}>
        <Eyebrow dark>{hero.eyebrow}</Eyebrow>
        <h1 className="font-playfair text-5xl sm:text-6xl lg:text-8xl leading-[1.02] mb-8">
          {hero.titleLead} <em className={CRIMSON}>{hero.titleAccent}</em>
        </h1>
        <p className="font-playfair text-2xl lg:text-3xl leading-snug max-w-3xl mb-6">{hero.lede}</p>
        <p className="font-raleway text-base lg:text-lg leading-relaxed text-[#f5f1ea]/75 max-w-[34rem]">{hero.sub}</p>
        <hr className="my-10 border-[#f5f1ea]/20 max-w-[34rem]" />
        <ul className="flex flex-wrap gap-x-3 gap-y-2 font-raleway text-xs uppercase tracking-[0.18em] text-[#f5f1ea]/70">
          {hero.meta.map((m, i) => (
            <li key={m}>{i > 0 && <span className="mr-3" aria-hidden>·</span>}{m}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ChainSvg() {
  const n = chain.nodes;
  const W = 200, H = 96;
  const pos = [
    { x: 20, y: 132 }, { x: 270, y: 132 }, { x: 520, y: 24 },
    { x: 520, y: 240 }, { x: 770, y: 132 }, { x: 1020, y: 132 },
  ];
  const edges: [number, number][] = [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4], [4, 5]];
  return (
    <svg viewBox="0 0 1240 360" className="w-full h-auto" role="img" aria-label="Dependency chain: 01 to 02, 02 to 03 and 04, both to 05, then 06">
      <defs>
        <marker id="ooo-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#7A0A0A" />
        </marker>
      </defs>
      {edges.map(([a, b]) => {
        const x1 = pos[a].x + W, y1 = pos[a].y + H / 2, x2 = pos[b].x - 4, y2 = pos[b].y + H / 2;
        const mx = (x1 + x2) / 2;
        return <path key={`${a}-${b}`} d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`} fill="none" stroke="#7A0A0A" strokeWidth="1.5" markerEnd="url(#ooo-arrow)" />;
      })}
      {n.map((node, i) => (
        <g key={node.num} transform={`translate(${pos[i].x},${pos[i].y})`}>
          <rect width={W} height={H} fill="#ffffff" stroke="#1a1a1a" strokeOpacity="0.25" />
          <text x="16" y="36" fontFamily="Playfair Display, serif" fontSize="26" fill="#7A0A0A">{node.num}</text>
          <text x="64" y="34" fontFamily="Raleway, sans-serif" fontSize="17" fontWeight="700" fill="#1a1a1a">{node.name}</text>
          <text x="16" y="72" fontFamily="Raleway, sans-serif" fontSize="14" fill="#555">{node.caption}</text>
        </g>
      ))}
    </svg>
  );
}

function Chain() {
  return (
    <section className="bg-[#fbf8f3] py-20 lg:py-28 border-b border-black/10">
      <div className={inner}>
        <h2 className="font-playfair text-4xl lg:text-5xl text-[#1a1a1a] mb-6">{chain.heading}</h2>
        <p className="font-raleway text-lg leading-relaxed text-[#333] max-w-[34rem] mb-12">{chain.intro}</p>
        <div className="hidden min-[800px]:block"><ChainSvg /></div>
        <ol className="min-[800px]:hidden space-y-5">
          {chain.nodes.map((node) => (
            <li key={node.num} className="flex gap-4 border-t border-black/10 pt-4">
              <span className={`font-playfair text-2xl ${OX} w-10 shrink-0`}>{node.num}</span>
              <p className="font-raleway text-base text-[#333]"><strong className="text-[#1a1a1a]">{node.name}</strong> — {node.longCaption}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Argument() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className={`${inner} grid gap-10 lg:grid-cols-[1fr_34rem] lg:gap-16`}>
        <div>
          <Eyebrow>{argument.eyebrow}</Eyebrow>
          <h2 className="font-playfair text-4xl lg:text-5xl leading-tight text-[#1a1a1a]">{argument.heading}</h2>
        </div>
        <div className="space-y-6 font-raleway text-lg leading-relaxed text-[#333]">
          {argument.paragraphs.map((t, i) => <p key={i}>{rich(t)}</p>)}
        </div>
      </div>
    </section>
  );
}

function PillarBand({ pillar, tinted }: { pillar: Pillar; tinted: boolean }) {
  return (
    <section id={`pillar-${pillar.num}`} className={`${tinted ? "bg-[#f6efe6]" : "bg-[#fbf8f3]"} border-t border-black/10 py-20 lg:py-28`}>
      <div className={`${inner} grid gap-8 lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-16`}>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className={`font-playfair ${OX} text-7xl lg:text-9xl leading-none mb-6`}>{pillar.num}</div>
          <dl className="font-raleway text-sm space-y-3">
            <div><dt className="text-[11px] uppercase tracking-[0.18em] text-[#777]">Requires</dt><dd className="text-[#1a1a1a]">{pillar.requires}</dd></div>
            <div><dt className="text-[11px] uppercase tracking-[0.18em] text-[#777]">Unlocks</dt><dd className="text-[#1a1a1a]">{pillar.unlocks}</dd></div>
          </dl>
        </aside>
        <div className="min-w-0 max-w-[40rem]">
          <h3 className="font-playfair text-3xl lg:text-4xl leading-tight text-[#1a1a1a] mb-5">{pillar.title}</h3>
          <p className={`font-raleway text-lg font-bold ${OX} leading-snug mb-8`}>{pillar.claim}</p>
          <div className="space-y-5 font-raleway text-base lg:text-lg leading-relaxed text-[#333]">
            {pillar.body.map((b, i) =>
              b.type === "h4"
                ? <h4 key={i} className="font-playfair text-xl text-[#1a1a1a] pt-4">{b.text}</h4>
                : <p key={i}>{rich(b.text)}</p>
            )}
          </div>
          {pillar.aside && (
            <div className="mt-8 border border-[#7A0A0A]/30 bg-white/70 p-6">
              <p className={`font-raleway text-xs font-semibold uppercase tracking-[0.18em] ${OX} mb-2`}>{pillar.aside.label}</p>
              <p className="font-raleway text-base leading-relaxed text-[#333]">{rich(pillar.aside.text)}</p>
            </div>
          )}
          <dl className="mt-10 border-l-2 border-[#7A0A0A] pl-6 space-y-6 font-raleway">
            <div><dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1a1a1a] mb-1">The 90-day move</dt><dd className="text-base lg:text-lg leading-relaxed text-[#333]">{pillar.move}</dd></div>
            <div><dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1a1a1a] mb-1">You will know it worked when</dt><dd className="text-base lg:text-lg leading-relaxed text-[#333]">{pillar.signal}</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function Blockers() {
  return (
    <section className="bg-[#1A0505] text-[#f5f1ea] py-20 lg:py-28">
      <div className={inner}>
        <Eyebrow dark>{blockersIntro.eyebrow}</Eyebrow>
        <h2 className="font-playfair text-4xl lg:text-5xl mb-6">{blockersIntro.heading}</h2>
        <p className="font-raleway text-lg leading-relaxed text-[#f5f1ea]/75 max-w-[34rem] mb-12">{blockersIntro.lede}</p>
        <div>
          {blockers.map((b) => (
            <div key={b.label} className="grid gap-3 md:grid-cols-[13.5rem_minmax(0,1fr)] md:gap-16 border-t border-[#f5f1ea]/15 py-8">
              <p className={`font-raleway text-xs font-semibold uppercase tracking-[0.18em] ${CRIMSON}`}>{b.label}</p>
              <p className="font-raleway text-base lg:text-lg leading-relaxed text-[#f5f1ea]/85 max-w-[40rem]">{rich(b.text)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Schedule() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className={inner}>
        <Eyebrow>{scheduleIntro.eyebrow}</Eyebrow>
        <h2 className="font-playfair text-4xl lg:text-5xl text-[#1a1a1a] mb-6">{scheduleIntro.heading}</h2>
        <p className="font-raleway text-lg leading-relaxed text-[#333] max-w-[34rem] mb-10">{scheduleIntro.intro}</p>
        <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[720px] border-collapse font-raleway text-left text-sm lg:text-base">
            <thead>
              <tr className="border-b-2 border-[#1a1a1a] text-xs uppercase tracking-[0.15em] text-[#1a1a1a]">
                <th scope="col" className="py-3 pr-4">Issue</th>
                <th scope="col" className="py-3 pr-4">Pillar</th>
                <th scope="col" className="py-3 pr-4">Working title</th>
                <th scope="col" className="py-3">The angle</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((r) => (
                <tr key={r.issue} className="border-b border-black/10 align-top">
                  <td className="py-4 pr-4 whitespace-nowrap text-[#555]">{r.issue}</td>
                  <td className={`py-4 pr-4 font-playfair ${OX}`}>{r.pillar}</td>
                  <td className="py-4 pr-4 font-semibold text-[#1a1a1a]">{r.title}</td>
                  <td className="py-4 text-[#444]">{r.angle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to={scheduleIntro.linkHref} className={`inline-block mt-10 font-raleway font-semibold ${OX} underline underline-offset-4 hover:opacity-80`}>
          {scheduleIntro.linkLabel} →
        </Link>
      </div>
    </section>
  );
}

function Close() {
  return (
    <section className="bg-[#f6efe6] py-20 lg:py-28 border-t border-black/10">
      <div className={inner}>
        <h2 className="font-playfair text-4xl lg:text-5xl leading-tight text-[#1a1a1a] max-w-3xl mb-8">{close.heading}</h2>
        <div className="space-y-5 font-raleway text-lg leading-relaxed text-[#333] max-w-[34rem]">
          {close.paragraphs.map((t, i) => <p key={i}>{rich(t)}</p>)}
        </div>
        <hr className="my-10 border-black/15 max-w-[34rem]" />
        <p className="font-raleway text-xs uppercase tracking-[0.18em] text-[#555]">{close.signature}</p>
      </div>
    </section>
  );
}

export default function OrderOfOperationsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Order of Operations",
    description: seo.description,
    url: seo.url,
    author: { "@type": "Person", name: seo.author },
    publisher: { "@type": "Organization", name: seo.publisher },
  };
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fbf8f3]">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.url} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Navbar />
      <main>
        <Hero />
        <Chain />
        <Argument />
        {pillars.map((p, i) => <PillarBand key={p.num} pillar={p} tinted={i % 2 === 1} />)}
        <Blockers />
        <Schedule />
        <Close />
      </main>
      <Footer />
      <MobileFooterNav />
    </div>
  );
}
