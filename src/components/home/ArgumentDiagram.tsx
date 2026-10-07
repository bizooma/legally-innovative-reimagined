import { home } from "@/content/home";

const wrap = (text: string, max: number) => text.split(" ").reduce<string[]>((lines, w) => {
  const last = lines[lines.length - 1];
  if (last && (last + " " + w).length <= max) lines[lines.length - 1] = last + " " + w; else lines.push(w);
  return lines;
}, []);

/** Homepage "Two things, one argument" diagram: two muted sources converge on Bizooma. Same visual language as the framework chain. */
export default function ArgumentDiagram() {
  const d = home.argumentDiagram;
  const L = { x: 8, w: 214, h: 104 }, R = { x: 318, w: 194, h: 120 };
  const tops = [24, 172], ry = 150 - R.h / 2;
  const joinX = 270;
  const faint = { stroke: "var(--editorial-faint)" };
  return (
    <>
      <svg viewBox="0 0 520 300" className="hidden min-[800px]:block w-full h-auto max-w-[560px]" role="img" aria-label={d.ariaLabel}>
        <defs>
          <marker id="arg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" style={{ fill: "var(--editorial-faint)" }} />
          </marker>
        </defs>
        {tops.map((y) => (
          <path key={y} d={`M${L.x + L.w},${y + L.h / 2} H${joinX} V150`} fill="none" style={faint} strokeWidth="1" />
        ))}
        <path d={`M${joinX},150 H${R.x - 3}`} fill="none" style={faint} strokeWidth="1" markerEnd="url(#arg-arrow)" />
        {d.sources.map((s, i) => (
          <g key={s.label} transform={`translate(${L.x},${tops[i]})`}>
            <rect width={L.w} height={L.h} style={{ fill: "var(--editorial-paper)", stroke: "var(--editorial-rule)" }} strokeWidth="1" />
            <text x="18" y="36" fontFamily="Raleway, sans-serif" fontSize="15" fontWeight="700" style={{ fill: "var(--editorial-ink)" }}>{s.label}</text>
            {wrap(s.caption, 28).map((line, j) => <text key={j} x="18" y={62 + j * 17} fontFamily="Raleway, sans-serif" fontSize="12" style={{ fill: "var(--editorial-dim)" }}>{line}</text>)}
          </g>
        ))}
        <g transform={`translate(${R.x},${ry})`}>
          <rect width={R.w} height={R.h} style={{ fill: "var(--editorial-accent)", fillOpacity: 0.06, stroke: "var(--editorial-accent)" }} strokeWidth="1.75" />
          <text x="20" y="44" fontFamily="Playfair Display, serif" fontSize="22" fontWeight="700" style={{ fill: "var(--editorial-accent)" }}>{d.result.label}</text>
          {wrap(d.result.caption, 24).map((line, j) => <text key={j} x="20" y={74 + j * 17} fontFamily="Raleway, sans-serif" fontSize="12" style={{ fill: "var(--editorial-ink)" }}>{line}</text>)}
        </g>
      </svg>
      <ol className="min-[800px]:hidden space-y-4">
        {[...d.sources, d.result].map((s, i) => (
          <li key={s.label} className="border-t pt-4" style={{ borderColor: i === 2 ? "var(--editorial-accent)" : "var(--editorial-rule)" }}>
            <p className="font-raleway text-base"><strong style={{ color: i === 2 ? "var(--editorial-accent)" : "var(--editorial-ink)" }}>{s.label}</strong> <span style={{ color: "var(--editorial-dim)" }}>— {s.caption}</span></p>
          </li>
        ))}
      </ol>
    </>
  );
}
