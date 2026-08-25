import { INSTALL_STEPS, PLUGIN_FILES, SCOUT } from "../lib/data";
import { Reveal, SectionHead, TagChip } from "../lib/ui";
import { IconDoc, IconFile, IconSignal } from "./Icons";

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
        index="05"
        kicker="отчёт разведчика"
        title="Структура faseen.com"
        note="Данные сняты встроенным классом class-wasee-scout.php: дамп CPT, ACF-групп и таксономий. На их основе плагин собирает маппинг ещё до первого импорта."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        {/* scout report */}
        <Reveal className="lg:col-span-7">
          <div className="border border-line bg-panel/70">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2.5">
              <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-dim">
                <IconSignal className="h-3.5 w-3.5 text-cyan" />
                разведка · {SCOUT.site}
              </span>
              <code className="font-mono text-[10.5px] text-faint">{SCOUT.rest}</code>
            </div>

            <div className="divide-y divide-line/70">
              {/* engine */}
              <div className="grid grid-cols-[120px_1fr] gap-3 px-4 py-3">
                <span className="font-mono text-[10.5px] uppercase tracking-wider text-faint">движок</span>
                <span className="font-mono text-[12px] text-fog">{SCOUT.engine}</span>
              </div>

              {/* CPT */}
              {SCOUT.postTypes.map((pt) => (
                <div key={pt.name} className="px-4 py-3.5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-[10.5px] uppercase tracking-wider text-faint">CPT</span>
                    <code className="font-mono text-[13px] font-semibold text-mint">{pt.name}</code>
                    <span className="text-xs text-dim">«{pt.label}»</span>
                    <span className="ml-auto font-mono text-[10.5px] text-faint">
                      было {pt.before} → станет {pt.after}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {pt.supports.map((s) => (
                      <TagChip key={s}>{s}</TagChip>
                    ))}
                  </div>
                </div>
              ))}

              {/* ACF */}
              {SCOUT.acfGroups.map((g) => (
                <div key={g.key} className="px-4 py-3.5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-[10.5px] uppercase tracking-wider text-faint">ACF</span>
                    <span className="text-[13px] font-semibold text-amber">«{g.title}»</span>
                    <code className="font-mono text-[10.5px] text-faint">{g.key}</code>
                    <code className="ml-auto font-mono text-[10.5px] text-faint">{g.location}</code>
                  </div>
                  <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
                    {g.fields.map((f) => (
                      <li key={f.name} className="flex items-baseline justify-between gap-3 border border-line/70 bg-ink/50 px-2.5 py-1.5">
                        <code className="truncate font-mono text-[11.5px] text-cyan">{f.name}</code>
                        <span className="shrink-0 font-mono text-[9.5px] uppercase tracking-wider text-faint">{f.type}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* taxonomies */}
              {SCOUT.taxonomies.map((tx) => (
                <div key={tx.name} className="grid grid-cols-[120px_1fr] gap-3 px-4 py-3">
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-faint">таксономия</span>
                  <span className="font-mono text-[12px]">
                    <span className="text-steel">{tx.name}</span>
                    <span className="text-dim"> · «{tx.label}» · object: {tx.object} · терминов к созданию: {tx.terms} · hierarchical</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* plugin file tree */}
        <Reveal delay={120} className="lg:col-span-5">
          <div className="flex h-full flex-col border border-line bg-panel/70">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-dim">
                <IconDoc className="h-3.5 w-3.5 text-amber" />
                wasee-importer/ · 11 файлов
              </span>
              <span className="font-mono text-[10.5px] text-faint">≈ 67.7 KB</span>
            </div>
            <ul className="flex-1 divide-y divide-line/60">
              {PLUGIN_FILES.map((f) => (
                <li key={f.path} className="group px-4 py-2.5 transition-colors hover:bg-panel2/60">
                  <div className="flex items-center gap-2">
                    <IconFile className={`h-3.5 w-3.5 shrink-0 ${KIND_CLS[f.kind]}`} />
                    <code className="truncate font-mono text-[11.5px] text-fog">{f.path}</code>
                    <span className="ml-auto shrink-0 font-mono text-[10px] tabular-nums text-faint">{f.size}</span>
                  </div>
                  <p className="mt-1 pl-5.5 text-[11.5px] leading-snug text-faint transition-colors group-hover:text-dim">
                    {f.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* install steps + requirements */}
      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div className="h-full border border-line bg-panel/70 p-5">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber">
              установка и запуск · 6 шагов
            </h3>
            <ol className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {INSTALL_STEPS.map((s, i) => (
                <li key={s.title} className="group flex gap-3.5">
                  <span className="font-display text-2xl font-bold leading-none text-line2 transition-colors group-hover:text-amber">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-[13.5px] font-semibold text-fog">{s.title}</span>
                    <span className="mt-1 block text-[12px] leading-relaxed text-dim">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-5">
          <div className="flex h-full flex-col gap-5">
            <div className="border border-line bg-panel/70 p-5">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan">требования</h3>
              <div className="mt-3.5 flex flex-wrap gap-2">
                {["PHP 7.2+", "WordPress 5.0+", "ACF / ACF Pro", "MySQL 5.7+", "cURL", "DOMDocument + XPath", "WP-cron (опц.)"].map((r) => (
                  <TagChip key={r} tone="cyan">{r}</TagChip>
                ))}
              </div>
              <p className="mt-4 text-[12.5px] leading-relaxed text-dim">
                ACF Pro нужен только для repeater-поля «specifications»; на бесплатной ACF плагин автоматически
                переключается на сериализованное мета-поле <code className="font-mono text-[11px] text-cyan">_wasee_specs</code>.
              </p>
            </div>
            <div className="flex-1 border border-mint/35 bg-mint/[0.05] p-5">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-mint">тема — не клон</h3>
              <p className="mt-3 text-[12.5px] leading-relaxed text-dim">
                Рекомендуется <span className="font-semibold text-fog">Astra 4.6</span> с child-темой{" "}
                <code className="font-mono text-[11px] text-mint">faseen-core</code>: стартовый шаблон «Electronics»
                перерабатывается в собственный технический стиль — акцент на таблицах характеристик и артикулах,
                а не на копиях вёрстки faseen.com.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
