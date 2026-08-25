import { useEffect, useState } from "react";

const LINES = [
  "$ wasee-importer --source=waseegroup.com --target=faseen.com",
  "▸ соединение с OpenCart 3.0.3.8 ............... OK · 312 ms",
  "▸ цель: голый WP + Astra → регистрация CPT ....... OK",
  "▸ разведка: 10 категорий / 29 товаров / 36 медиа  OK",
  "▸ маппинг meta/ACF: 9 правил, конфликтов 0 ....... OK",
  "▸ запуск консоли миграции _",
];

export default function BootOverlay() {
  const [shown, setShown] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setShown((s) => {
        if (s >= LINES.length) {
          window.clearInterval(id);
          return s;
        }
        return s + 1;
      });
    }, 170);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (shown >= LINES.length && !leaving) {
      const id = window.setTimeout(() => setLeaving(true), 480);
      return () => window.clearTimeout(id);
    }
  }, [shown, leaving]);

  useEffect(() => {
    if (leaving && !gone) {
      const id = window.setTimeout(() => setGone(true), 600);
      return () => window.clearTimeout(id);
    }
  }, [leaving, gone]);

  if (gone) return null;

  return (
    <div
      onClick={() => setLeaving(true)}
      className={`fixed inset-0 z-[70] grid cursor-pointer place-items-center bg-ink transition-opacity duration-500 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-xl px-6">
        <div className="border border-line bg-ink2 p-5 shadow-[0_0_80px_-20px_rgba(255,178,36,0.25)]">
          <div className="mb-3 flex items-center justify-between border-b border-line pb-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-faint">boot · wasee-importer</span>
            <span className="blink h-2 w-2 bg-amber" />
          </div>
          <div className="min-h-[150px] space-y-1.5 font-mono text-[12px] leading-relaxed">
            {LINES.slice(0, shown).map((l, i) => (
              <p key={i} className={`bootline ${i === 0 ? "text-amber" : l.includes("OK") ? "text-mint/90" : "text-dim"}`}>
                {l}
                {i === shown - 1 && i < LINES.length - 1 && (
                  <span className="blink ml-1 inline-block h-3 w-1.5 translate-y-0.5 bg-cyan" />
                )}
              </p>
            ))}
          </div>
        </div>
        <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
          клик — пропустить
        </p>
      </div>
    </div>
  );
}
