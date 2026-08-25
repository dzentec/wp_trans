import { INSTALL_STEPS, PLUGIN_FILES, TARGET } from "../lib/data";
import { Reveal, SectionHead, TagChip } from "../lib/ui";
import { IconFile, IconSignal, IconWrench } from "./Icons";

const STATUS_META: Record<string, { label: string; cls: string }> = {
  ok: { label: "на месте", cls: "border-mint/50 text-mint" },
  missing: { label: "создаст плагин", cls: "border-amber/50 text-amber" },
  optional: { label: "не обязателен", cls: "border-cyan/50 text-cyan" },
  none: { label: "пусто", cls: "border-line2 text-faint" },
};

const KIND_CLS: Record<string, string> = {
  php: "text-amber",
  css: "text-steel",
  js: "text-cyan",
  txt: "text-dim",
};

export default function ReportSection() {
  return (
    <section id="report" className="mx-auto max-w-[1360px] scroll-mt-24 px-4 py-20 md:px-8">
      <SectionHead
        index="06"
        kicker="цель: голый wordpress"
        title="Astra — и больше ничего"
        note="На faseen.com нет ни CPT, ни ACF, ни таксономий — только ядро WP и тема Astra. Плагин регистрирует всю структуру сам при активации, цель готовить не нужно."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        {/* диагностика цели */}
        <Reveal className="lg:col-span-4">
          <div className="flex h-full flex-col border border-line bg-panel/70">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-dim">
                <IconSignal className="h-3.5 w-3.5 text-cyan" />
                диагностика · {TARGET.site}
              </span>
            </div>
            <div className="border-b border-line/70 px-4 py-3">
              <div className="font-mono text-[11.5px] text-fog">{TARGET.engine}</div>
              <div className="mt-1 font-mono text-[11px] text-amber/85">{TARGET.theme}</div>
            </div>
            <ul className="flex-1 divide-y divide-line/70">
              {TARGET.state.map((s) => {
                const m = STATUS_META[s.status];
                return (
                  <li key={s.key} className="group px-4 py-2.5 transition-colors hover:bg-panel2/60">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[12.5px] text-fog">{s.key}</span>
                      <span className={`shrink-0 border px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider ${m.cls}`}>
                        {m.label}
                      </span>
                    </div>
                    <div className="mt-0.5 font-mono text-[10.5px] leading-relaxed text-faint">{s.value}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>

        {/* что регистрирует плагин */}
        <Reveal delay={100} className="lg:col-span-4">
          <div className="flex h-full flex-col border border-line bg-panel/70">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-dim">
                что регистрирует плагин
              </span>
              <TagChip tone="amber">hook: activate</TagChip>
            </div>
            <ul className="flex-1 space-y-2.5 px-4 py-4">
              {TARGET.creates.map((c, i) => (
                <li key={i} className="group flex gap-3 border border-line/70 bg-ink/50 px-3 py-2.5 transition-colors hover:border-amber/40">
                  <span className="mt-0.5 font-mono text-[10px] tabular-nums text-amber/70">{String(i + 1).padStart(2, "0")}</span>
                  <code className="min-w-0 break-words font-mono text-[10.5px] leading-relaxed text-dim transition-colors group-hover:text-fog">
                    {c}
                  </code>
                </li>
              ))}
            </ul>
            <div className="border-t border-line px-4 py-3">
              <p className="text-[11.5px] leading-relaxed text-faint">
                <span className="font-mono uppercase tracking-wider text-cyan">fallback:</span> {TARGET.fallback}
              </p>
            </div>
          </div>
        </Reveal>

        {/* файлы плагина */}
        <Reveal delay={200} className="lg:col-span-4">
          <div className="flex h-full flex-col border border-line bg-panel/70">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-dim">
                <IconWrench className="h-3.5 w-3.5 text-amber" />
                файлы плагина
              </span>
              <span className="font-mono text-[10.5px] text-faint">{PLUGIN_FILES.length} шт.</span>
            </div>
            <ul className="max-h-[460px] flex-1 divide-y divide-line/60 overflow-y-auto">
              {PLUGIN_FILES.map((f) => (
                <li key={f.path} className="group px-4 py-2.5 transition-colors hover:bg-panel2/60">
                  <div className="flex items-baseline gap-2.5">
                    <IconFile className={`h-3.5 w-3.5 shrink-0 translate-y-0.5 ${KIND_CLS[f.kind]}`} />
                    <code className="min-w-0 truncate font-mono text-[11.5px] text-fog" title={f.path}>
                      {f.path}
                    </code>
                    <span className="ml-auto shrink-0 font-mono text-[10px] text-faint">{f.size}</span>
                  </div>
                  <p className="mt-1 pl-6 text-[11px] leading-snug text-faint transition-colors group-hover:text-dim">
                    {f.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* установка */}
      <Reveal delay={120} className="mt-6">
        <div className="border border-line bg-panel/50">
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-dim">установка · 6 шагов</span>
            <span className="font-mono text-[10.5px] text-faint">требования: PHP 7.2+ · WP 5.0+ · Astra (уже есть)</span>
          </div>
          <ol className="grid gap-px bg-line/60 sm:grid-cols-2 lg:grid-cols-3">
            {INSTALL_STEPS.map((s, i) => (
              <li key={s.title} className="group relative bg-panel p-5 transition-colors hover:bg-panel2">
                <span className="font-display text-3xl font-bold text-line2 transition-colors group-hover:text-amber/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="mt-2 font-display text-[15px] font-semibold text-fog">{s.title}</h4>
                <p className="mt-1.5 text-[12px] leading-relaxed text-dim">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
