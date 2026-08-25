import { useEffect, useRef, useState, type ReactNode } from "react";

/* ---------- scroll reveal ---------- */

export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error polymorphic ref
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ---------- count-up ---------- */

export function useCountUp(target: number, active: boolean, duration = 1500): number {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return v;
}

/* ---------- section header ---------- */

export function SectionHead({
  index,
  kicker,
  title,
  note,
}: {
  index: string;
  kicker: string;
  title: string;
  note?: string;
}) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-amber">
        <span className="text-faint">{index}</span>
        <span className="h-px w-10 bg-amber/50" />
        <span>{kicker}</span>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
          {title}
        </h2>
        {note && (
          <p className="max-w-sm border-l-2 border-line2 pl-4 text-sm leading-relaxed text-dim">
            {note}
          </p>
        )}
      </div>
    </Reveal>
  );
}

/* ---------- small primitives ---------- */

export function TagChip({ children, tone = "dim" }: { children: ReactNode; tone?: "dim" | "cyan" | "amber" | "mint" | "steel" }) {
  const tones: Record<string, string> = {
    dim: "border-line2 text-dim",
    cyan: "border-cyan/40 text-cyan",
    amber: "border-amber/40 text-amber",
    mint: "border-mint/40 text-mint",
    steel: "border-steel/40 text-steel",
  };
  return (
    <span className={`inline-flex items-center gap-1 border px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-wider ${tones[tone]}`}>
      {children}
    </span>
  );
}

/* ---------- scroll spy ---------- */

export function useScrollSpy(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id);
        });
      },
      { rootMargin: "-38% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/* ---------- clock ---------- */

export function useClock(): string {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now.toLocaleTimeString("ru-RU", { hour12: false });
}
