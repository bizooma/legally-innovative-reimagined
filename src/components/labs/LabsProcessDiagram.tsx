import { processDiagram as d } from "@/content/labs";

/** Labs intro diagram: four process steps forking into Kept / Retired. Same visual language as the framework chain and homepage argument diagram. */
export default function LabsProcessDiagram() {
  const W = 280, H = 52, X = 40, GAP = 36, tops = d.steps.map((_, i) => 8 + i * (H + GAP));
  const forkY = tops[3] + H + 22, outY = forkY + 34, OW = 150;
  const outs = [
    { x: 14, label: d.outcomes.kept, fg: "hsl(var(--status-live))", bg: "hsl(var(--status-live-bg))" },
    { x: 196, label: d.outcomes.retired, fg: "hsl(var(--status-retired))", bg: "hsl(var(--status-retired-bg))" },
  ];
  const faint = { stroke: "var(--editorial-faint)" };
  const font = "Raleway, sans-serif";
  return (
    <>
      <svg viewBox={`0 0 360 ${outY + H + 8}`} className="hidden min-[800px]:block w-full h-auto max-w-[360px]" role="img" aria-label={d.ariaLabel}>
        <defs>
          <marker id="labs-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" style={{ fill: "var(--editorial-faint)" }} />
          </marker>
        </defs>
        {tops.slice(0, 3).map((y) => (
          <path key={y} d={`M180,${y + H} V${y + H + GAP - 2}`} fill="none" style={faint} strokeWidth="1" markerEnd="url(#labs-arrow)" />
        ))}
        <path d={`M180,${tops[3] + H} V${forkY} M${outs[0].x + OW / 2},${forkY} H${outs[1].x + OW / 2}`} fill="none" style={faint} strokeWidth="1" />
        {outs.map((o) => <path key={o.label} d={`M${o.x + OW / 2},${forkY} V${outY - 2}`} fill="none" style={faint} strokeWidth="1" markerEnd="url(#labs-arrow)" />)}
        {d.steps.map((label, i) => (
          <g key={label} transform={`translate(${X},${tops[i]})`}>
            <rect width={W} height={H} fill="none" style={{ stroke: "var(--editorial-rule)" }} strokeWidth="1" />
            <text x={W / 2} y={H / 2 + 5} textAnchor="middle" fontFamily={font} fontSize="14" style={{ fill: "var(--editorial-ink)" }}>{label}</text>
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
        {d.steps.map((label) => (
          <li key={label} className="border px-4 py-3" style={{ borderColor: "var(--editorial-rule)", color: "var(--editorial-ink)" }}>{label}</li>
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
