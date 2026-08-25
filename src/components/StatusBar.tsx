import { useEffect, useState } from "react";
import { useClock, useScrollSpy } from "../lib/ui";

const NAV = [
  { id: "overview", label: "Обзор" },
  { id: "import", label: "Импорт" },
  { id: "catalog", label: "Каталог" },
  { id: "mapping", label: "Маппинг" },
  { id: "report", label: "Разведка" },
  { id: "guide", label: "Гайд" },
  { id: "docs", label: "README" },
];

export default function StatusBar() {
  const active = useScrollSpy(NAV.map((n) => n.id));
  const clock = useClock();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1360px] items-center gap-4 px-4 md:px-8">
        {/* logo */}
        <a href="#overview" className="group flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center border border-amber/60 bg-amber/10 text-amber transition-colors group-hover:bg-amber group-hover:text-ink">
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="7.5" />
              <circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none" />
              <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" />
            </svg>
          </span>
          <span className="font-display text-[15px] font-bold tracking-tight">
            WASEE<span className="text-amber">→</span>FASEEN
          </span>
          <span className="mt-0.5 hidden font-mono text-[9.5px] uppercase tracking-[0.22em] text-faint sm:block">
            migration console
          </span>
        </a>

        {/* nav */}
        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`relative px-3 py-1.5 font-mono text-[11.5px] uppercase tracking-widest transition-colors ${
                active === n.id ? "text-amber" : "text-dim hover:text-fog"
              }`}
            >
              {n.label}
              <span
                className={`absolute inset-x-3 -bottom-px h-px bg-amber transition-transform duration-300 ${
                  active === n.id ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </a>
          ))}
        </nav>

        {/* status cluster */}
        <div className="ml-auto flex items-center gap-3 lg:ml-6">
          <span className="hidden border border-line2 px-2 py-1 font-mono text-[10px] text-dim md:block">
            v1.4.2
          </span>
          <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-widest text-mint">
            <span className="livedot h-2 w-2 rounded-full bg-mint" />
            live
          </span>
          <span className="hidden font-mono text-[11px] tabular-nums text-faint sm:block">{clock}</span>
        </div>
      </div>

      {/* mobile nav */}
      <nav className="flex items-center gap-1 overflow-x-auto border-t border-line/60 px-3 py-1.5 lg:hidden">
        {NAV.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className={`shrink-0 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-widest transition-colors ${
              active === n.id ? "border border-amber/50 text-amber" : "text-dim hover:text-fog"
            }`}
          >
            {n.label}
          </a>
        ))}
      </nav>

      {/* scroll progress */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-transparent">
        <div className="h-full bg-amber/90 shadow-[0_0_10px_rgba(255,178,36,0.7)] transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>
    </header>
  );
}
