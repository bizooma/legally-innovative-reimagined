import { Link, useNavigate } from "react-router-dom";
import { processDiagram as d } from "@/content/labs";

/** Labs intro diagram: seven-stage spine, a side exit to Retired, and a final fork into internal tool / product. Same visual language as the framework chain and homepage argument diagram. */
export default function LabsProcessDiagram() {
  const navigate = useNavigate();
  const W = 270, H = 44, H2 = 62, X = 10, GAP = 18, CX = X + W / 2;
  const hs = d.steps.map((s) => (s.sub ? H2 : H));
  const tops = hs.map((_, i) => 8 + hs.slice(0, i).reduce((a, b) => a + b + GAP, 0));
  const last = tops.length - 1;
  const forkY = tops[last] + hs[last] + 18, outY = forkY + 28;
  // Retired side box, roughly level with stages 5–6.
  const RX = 320, RW = 110, RY = (tops[4] + tops[5] + hs[5]) / 2 - H / 2;
  const outs = { internal: { x: 10, w: 172 }, product: { x: 196, w: 180 } };
  const faint = { stroke: "var(--editorial-faint)" };
  const font = "Raleway, sans-serif";
  const ink = { fill: "var(--editorial-ink)" };
  const ox = "var(--editorial-oxblood)";
  const vbH = outY + H + 8;
  return (
    <>
      <svg viewBox={`0 0 440 ${vbH}`} className="hidden min-[800px]:block w-full h-auto max-w-[343px]" role="img" aria-label={d.ariaLabel}>
        <defs>
          <marker id="labs-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" style={{ fill: "var(--editorial-faint)" }} />
          </marker>
          <marker id="labs-arrow-light" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" style={{ fill: "var(--editorial-faint)" }} opacity="0.6" />
          </marker>
        </defs>
        {tops.slice(0, last).map((y, i) => (
          <path key={y} d={`M${CX},${y + hs[i]} V${y + hs[i] + GAP - 2}`} fill="none" style={faint} strokeWidth="1" markerEnd="url(#labs-arrow)" />
        ))}
        {d.retireFrom.map((i) => (
          <path key={`r${i}`} d={`M${X + W},${tops[i] + hs[i] / 2} L${RX - 2},${RY + H / 2}`} fill="none" style={faint} strokeWidth="0.75" strokeOpacity="0.6" strokeDasharray="3 3" markerEnd="url(#labs-arrow-light)" />
        ))}
        <path d={`M${CX},${tops[last] + hs[last]} V${forkY} M${outs.internal.x + outs.internal.w / 2},${forkY} H${outs.product.x + outs.product.w / 2}`} fill="none" style={faint} strokeWidth="1" />
        {Object.values(outs).map((o) => <path key={o.x} d={`M${o.x + o.w / 2},${forkY} V${outY - 2}`} fill="none" style={faint} strokeWidth="1" markerEnd="url(#labs-arrow)" />)}
        {d.steps.map((s, i) => (
          <g key={s.label} transform={`translate(${X},${tops[i]})`}>
            <rect width={W} height={hs[i]} fill="none" style={{ stroke: "var(--editorial-rule)" }} strokeWidth="1" />
            {s.sub ? (
              <>
                <text x={W / 2} y={26} textAnchor="middle" fontFamily={font} fontSize="16" fontWeight="700" style={ink}>{s.label}</text>
                <text x={W / 2} y={46} textAnchor="middle" fontFamily={font} fontSize="12.5" style={{ fill: "var(--editorial-dim)" }}>{s.sub}</text>
              </>
            ) : (
              <text x={W / 2} y={H / 2 + 5} textAnchor="middle" fontFamily={font} fontSize="14" style={ink}>{s.label}</text>
            )}
          </g>
        ))}
        <g transform={`translate(${RX},${RY})`}>
          <rect width={RW} height={H} rx="4" style={{ fill: "hsl(var(--status-retired-bg))", stroke: "hsl(var(--status-retired))" }} strokeWidth="1" />
          <text x={RW / 2} y={H / 2 + 5} textAnchor="middle" fontFamily={font} fontSize="13" fontWeight="600" letterSpacing="1.5" style={{ fill: "hsl(var(--status-retired))" }}>{d.retired.toUpperCase()}</text>
        </g>
        <g transform={`translate(${outs.internal.x},${outY})`}>
          <rect width={outs.internal.w} height={H} rx="4" fill="none" style={{ stroke: "var(--editorial-rule)" }} strokeWidth="1" />
          <text x={outs.internal.w / 2} y={H / 2 + 5} textAnchor="middle" fontFamily={font} fontSize="13" fontWeight="600" style={ink}>{d.outcomes.internal}</text>
        </g>
        <a
          href={d.outcomes.productLink}
          className="labs-product-link"
          onClick={(e) => { e.preventDefault(); navigate(d.outcomes.productLink); }}
        >
          <g transform={`translate(${outs.product.x},${outY})`}>
            <rect width={outs.product.w} height={H} rx="4" fill="none" style={{ stroke: ox }} strokeWidth="1.25" />
            <text x={outs.product.w / 2} y={H / 2 + 5} textAnchor="middle" fontFamily={font} fontSize="14" fontWeight="600" style={{ fill: ox }}>{d.outcomes.product} ↗</text>
          </g>
        </a>
      </svg>
      <ol className="min-[800px]:hidden space-y-3 font-raleway text-base">
        {d.steps.map((s) => (
          <li key={s.label} className="border px-4 py-3" style={{ borderColor: "var(--editorial-rule)", color: "var(--editorial-ink)" }}>
            {s.sub ? (<><span className="block text-lg font-bold">{s.label}</span><span className="block text-sm" style={{ color: "var(--editorial-dim)" }}>{s.sub}</span></>) : s.label}
          </li>
        ))}
        <li className="rounded px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--status-retired))", background: "hsl(var(--status-retired-bg))", border: "1px solid hsl(var(--status-retired))" }}>{d.retiredNote}</li>
        <li className="grid grid-cols-2 gap-3">
          <span className="rounded px-4 py-3 text-center text-sm font-semibold" style={{ color: "var(--editorial-ink)", border: "1px solid var(--editorial-rule)" }}>{d.outcomes.internal}</span>
          <Link to={d.outcomes.productLink} className="labs-product-link rounded px-4 py-3 text-center text-sm font-semibold" style={{ color: ox, border: `1px solid ${ox}` }}>{d.outcomes.product} ↗</Link>
        </li>
      </ol>
    </>
  );
}
