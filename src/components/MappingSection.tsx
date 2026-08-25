import { CATEGORIES, catCount, FIELD_MAPS } from "../lib/data";
import { Reveal, SectionHead, TagChip } from "../lib/ui";
import { IconArrowR, IconWarn } from "./Icons";

export default function MappingSection() {
  const maxCount = Math.max(...CATEGORIES.map((c) => catCount(c.id)));

  return (
    <section id="mapping" className="mx-auto max-w-[1360px] scroll-mt-24 px-4 py-20 md:px-8">
      <SectionHead
        index="04"
        kicker="правила переноса"
        title="Маппинг OpenCart → ACF"
        note="9 правил, сохранённых в wp_options (wasee_field_maps). Правки из админки переживают обновления плагина; конфликт-детектор сверяет селекторы с живой разметкой."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        {/* field mapping table */}
        <Reveal className="lg:col-span-3">
          <div className="border border-line bg-panel/70">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-dim">поле → поле</span>
              <TagChip tone="amber">class-wasee-mapper.php</TagChip>
            </div>
            <ul className="divide-y divide-line/70">
              {FIELD_MAPS.map((m) => (
                <li key={m.src} className="group px-4 py-3 transition-colors hover:bg-panel2/60">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <code className="max-w-[46%] truncate font-mono text-[11.5px] text-cyan" title={m.src}>
                      {m.src}
                    </code>
                    <IconArrowR className="h-3.5 w-3.5 shrink-0 text-faint transition-transform group-hover:translate-x-1 group-hover:text-amber" />
                    <code className="truncate font-mono text-[11.5px] text-amber" title={m.target}>
                      {m.target}
                    </code>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2.5">
                    <span className="border border-line2 px-1.5 py-px font-mono text-[9.5px] uppercase tracking-wider text-dim">
                      {m.type}
                    </span>
                    <span className="truncate text-[11.5px] text-faint">напр.: {m.sample}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* category mapping */}
        <Reveal delay={120} className="lg:col-span-2">
          <div className="flex h-full flex-col border border-line bg-panel/70">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-dim">
                категории · path → term
              </span>
              <span className="font-mono text-[10.5px] text-faint">10/10</span>
            </div>
            <ul className="flex-1 divide-y divide-line/70">
              {CATEGORIES.map((c) => {
                const n = catCount(c.id);
                return (
                  <li key={c.id} className="group px-4 py-2.5 transition-colors hover:bg-panel2/60">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="truncate text-[12.5px] text-fog">{c.name}</span>
                      <span className="shrink-0 font-mono text-[11px] tabular-nums text-dim">{n} шт.</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 font-mono text-[10.5px]">
                      <span className="text-faint">path={c.path}</span>
                      <IconArrowR className="h-3 w-3 text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-mint" />
                      <span className="truncate text-mint">{c.slug}</span>
                    </div>
                    <div className="mt-1.5 h-1 bg-ink">
                      <div
                        className="h-full bg-line2 transition-all duration-500 group-hover:bg-amber/70"
                        style={{ width: `${(n / maxCount) * 100}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* redirect note */}
      <Reveal delay={140} className="mt-6">
        <div className="flex flex-wrap items-center gap-4 border border-amber/40 bg-amber/[0.06] px-5 py-4">
          <IconWarn className="h-5 w-5 shrink-0 text-amber" />
          <p className="min-w-0 flex-1 text-[13.5px] leading-relaxed text-dim">
            <span className="font-semibold text-amber">После импорта:</span> плагин генерирует правила 301-редиректов{" "}
            <code className="border border-line2 bg-ink px-1.5 py-0.5 font-mono text-[11.5px] text-cyan">
              ?route=product/product&product_id=NNN → /product/&lt;slug&gt;
            </code>{" "}
            — поля <code className="font-mono text-[11.5px] text-cyan">acf.legacy_product_id</code> и{" "}
            <code className="font-mono text-[11.5px] text-cyan">acf.legacy_url</code> сохраняются именно для этого.
          </p>
          <TagChip tone="amber">SEO-безопасно</TagChip>
        </div>
      </Reveal>
    </section>
  );
}
