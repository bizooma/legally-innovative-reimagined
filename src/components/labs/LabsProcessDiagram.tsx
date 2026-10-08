import { processDiagram as d } from "@/content/labs";

/** Labs intro diagram: four process steps forking into Kept / Retired. Same visual language as the framework chain and homepage argument diagram. */
export default function LabsProcessDiagram() {
  const W = 280, H = 44, H2 = 62, X = 40, GAP = 18;
  const hs = d.steps.map((s) => (s.sub ? H2 : H));
  const tops = hs.map((_, i) => 8 + hs.slice(0, i).reduce((a, b) => a + b + GAP, 0));
  const forkY = tops[3] + hs[3] + 18, outY = forkY + 28, OW = 150;
  const outs = [
    { x: 14, label: d.outcomes.kept, fg: "hsl(var(--status-live))", bg: "hsl(var(--status-live-bg))" },
    { x: 196, label: d.outcomes.retired, fg: "hsl(var(--status-retired))", bg: "hsl(var(--status-retired-bg))" },
  ];
  const faint = { stroke: "var(--editorial-faint)" };
  const font = "Raleway, sans-serif";
  return (
    <>
      <svg viewBox={`0 0 360 ${outY + H + 8}`} className="hidden min-[800px]:block w-full h-auto max-w-[280px]" role="img" aria-label={d.ariaLabel}>
        <defs>
          <marker id="labs-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" style={{ fill: "var(--editorial-faint)" }} />
          </marker>
        </defs>
        {tops.slice(0, 3).map((y, i) => (
          <path key={y} d={`M180,${y + hs[i]} V${y + hs[i] + GAP - 2}`} fill="none" style={faint} strokeWidth="1" markerEnd="url(#labs-arrow)" />
        ))}
        <path d={`M180,${tops[3] + hs[3]} V${forkY} M${outs[0].x + OW / 2},${forkY} H${outs[1].x + OW / 2}`} fill="none" style={faint} strokeWidth="1" />
        {outs.map((o) => <path key={o.label} d={`M${o.x + OW / 2},${forkY} V${outY - 2}`} fill="none" style={faint} strokeWidth="1" markerEnd="url(#labs-arrow)" />)}
        {d.steps.map((s, i) => (
          <g key={s.label} transform={`translate(${X},${tops[i]})`}>
            <rect width={W} height={hs[i]} fill="none" style={{ stroke: "var(--editorial-rule)" }} strokeWidth="1" />
            {s.sub ? (
              <>
                <text x={W / 2} y={26} textAnchor="middle" fontFamily={font} fontSize="16" fontWeight="700" style={{ fill: "var(--editorial-ink)" }}>{s.label}</text>
                <text x={W / 2} y={46} textAnchor="middle" fontFamily={font} fontSize="12.5" style={{ fill: "var(--editorial-dim)" }}>{s.sub}</text>
              </>
            ) : (
              <text x={W / 2} y={H / 2 + 5} textAnchor="middle" fontFamily={font} fontSize="14" style={{ fill: "var(--editorial-ink)" }}>{s.label}</text>
            )}
          </g>
        ))}
        {outs.map((o) => (
          <g key={o.label} transform={`translate(${o.x},${outY})`}>
            <rect width={OW} height={H} rx="4" style={{ fill: o.bg, stroke: o.fg }} strokeWidth="1" />
            <text x={OW / 2} y={H / 2 + 5} textAnchor="middle" fontFamily={font} fontSize="13" fontWeight="600" letterSpacing="1.5" style={{ fill: o.fg }}>{o.label.toUpperCase()}</text>
          </g>
        ))}
      </svg>
      <ol className="min-[800px]:hidden space-y-3 font-raleway text-base">
        {d.steps.map((s) => (
          <li key={s.label} className="border px-4 py-3" style={{ borderColor: "var(--editorial-rule)", color: "var(--editorial-ink)" }}>
            {s.sub ? (<><span className="block text-lg font-bold">{s.label}</span><span className="block text-sm" style={{ color: "var(--editorial-dim)" }}>{s.sub}</span></>) : s.label}
          </li>
        ))}
        <li className="grid grid-cols-2 gap-3">
          {outs.map((o) => (
            <span key={o.label} className="rounded px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider" style={{ color: o.fg, background: o.bg, border: `1px solid ${o.fg}` }}>{o.label}</span>
          ))}
        </li>
      </ol>
    </>
  );
}
