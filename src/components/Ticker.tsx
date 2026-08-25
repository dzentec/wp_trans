import { PRODUCTS } from "../lib/data";

function Half() {
  return (
    <div className="flex shrink-0 items-center gap-7 pr-7">
      {PRODUCTS.map((p) => (
        <span key={p.pid} className="flex items-center gap-2 whitespace-nowrap font-mono text-[11px] text-faint">
          <span className="text-mint">✓</span>
          <span className="tabular-nums text-dim">#{p.pid}</span>
          <span className="uppercase tracking-wider">{p.model}</span>
          <span className="text-amber/70">→ faseen.com/product</span>
        </span>
      ))}
    </div>
  );
}

export default function Ticker() {
  return (
    <div className="marquee-hover overflow-hidden border-y border-line bg-ink2/70">
      <div className="marquee-track flex w-max py-2.5">
        <Half />
        <Half />
      </div>
    </div>
  );
}
