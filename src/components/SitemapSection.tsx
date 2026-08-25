import { useState } from "react";
import {
  catCount,
  MENU_MAIN,
  MENU_SERVICE,
  PAGE_MAP,
  PRODUCTS,
  type MenuEntry,
} from "../lib/data";
import { Reveal, SectionHead, TagChip } from "../lib/ui";
import { IconArrowR, IconBox, IconCheck, IconChip } from "./Icons";

const KIND_TONE: Record<string, { tone: "dim" | "cyan" | "amber" | "mint" | "steel"; label: string }> = {
  home: { tone: "amber", label: "главная" },
  catalog: { tone: "cyan", label: "каталог" },
  term: { tone: "mint", label: "категория" },
  page: { tone: "steel", label: "страница" },
  service: { tone: "dim", label: "не переносится" },
};

function Blueprint({ entry }: { entry: MenuEntry }) {
  const meta = KIND_TONE[entry.kind];
  return (
    <div key={entry.id} className="fadein border border-line bg-panel">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-dim">чертёж страницы</span>
        <TagChip tone={meta.tone}>{meta.label}</TagChip>
      </div>
      <div className="px-5 py-4">
        <h3 className="font-display text-2xl font-bold leading-tight">{entry.label}</h3>
        <div className="mt-3 space-y-1.5 font-mono text-[11.5px]">
          <div className="flex items-center gap-2.5">
            <span className="w-20 shrink-0 text-faint">было</span>
            <span className="truncate text-coral/90" title={entry.original}>{entry.original}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-20 shrink-0 text-faint">станет</span>
            <span className="truncate text-mint" title={entry.target}>{entry.target}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-20 shrink-0 text-faint">объект WP</span>
            <span className="truncate text-fog/90">{entry.obj}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-line px-5 py-4">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-amber">
          <IconChip className="h-3.5 w-3.5" />
          делает плагин
        </div>
        <p className="mt-2 font-mono text-[11.5px] leading-relaxed text-dim">{entry.build}</p>
      </div>
      <div className="border-t border-line px-5 py-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan">состав страницы</div>
        <ul className="mt-2 space-y-1.5">
          {entry.content.map((c) => (
            <li key={c} className="flex gap-2.5 text-[13px] leading-relaxed text-dim">
              <IconCheck className="mt-1 h-3 w-3 shrink-0 text-mint" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function SitemapSection() {
  const [selectedId, setSelectedId] = useState("catalog");
  const all = [...MENU_MAIN, ...MENU_SERVICE];
  const selected = all.find((m) => m.id === selectedId) ?? all[1];

  const topLevel = MENU_MAIN.filter((m) => m.kind !== "term");
  const terms = MENU_MAIN.filter((m) => m.kind === "term");

  return (
    <section id="sitemap" className="mx-auto max-w-[1360px] scroll-mt-24 px-4 py-20 md:px-8">
      <SectionHead
        index="04"
        kicker="меню и страницы"
        title="Меню — как на оригинале"
        note="Пункт в пункт повторяем навигацию waseegroup.com: Home · Products (10 категорий) · About Us · Contact Us. Кликните по пункту — справа чертёж новой страницы."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        {/* реплика шапки оригинального сайта */}
        <Reveal className="lg:col-span-7">
          <div className="border border-line bg-panel/70">
            <div className="flex items-center justify-between border-b border-line px-4 py-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-dim">
                реплика шапки waseegroup.com
              </span>
              <span className="font-mono text-[10px] text-faint">наведите на «Products»</span>
            </div>

            {/* верхняя служебная полоса OpenCart */}
            <div className="flex items-center justify-end gap-4 border-b border-line/70 bg-ink2/60 px-4 py-2">
              {MENU_SERVICE.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  className={`font-mono text-[10.5px] uppercase tracking-wider transition-colors ${
                    selectedId === s.id ? "text-amber" : "text-faint hover:text-coral"
                  }`}
                  title={`${s.original} → не переносится, 301 на главную`}
                >
                  <span className="line-through decoration-coral/60">{s.label}</span>
                </button>
              ))}
              <span className="hidden border border-line2 px-1.5 py-px font-mono text-[9px] uppercase tracking-wider text-faint sm:block">
                корзина не переносится
              </span>
            </div>

            {/* основная навигация */}
            <div className="flex flex-wrap items-center gap-1 px-3 py-3">
              <span className="mr-3 flex items-center gap-2 px-1">
                <span className="grid h-7 w-7 place-items-center border border-amber/60 text-amber">
                  <IconBox className="h-3.5 w-3.5" />
                </span>
                <span className="font-display text-sm font-bold tracking-tight">WASEE<span className="text-amber">·</span>GROUP</span>
              </span>
              {topLevel.map((m) =>
                m.id === "catalog" ? (
                  <div key={m.id} className="group relative">
                    <button
                      onClick={() => setSelectedId(m.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 font-display text-[13.5px] font-semibold transition-colors ${
                        selectedId === m.id || selected?.kind === "term" ? "text-amber" : "text-fog hover:text-amber"
                      }`}
                    >
                      {m.label}
                      <svg viewBox="0 0 10 6" className="h-1.5 w-2.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M1 1l4 4 4-4" />
                      </svg>
                    </button>
                    {/* дропдаун 10 категорий */}
                    <div className="invisible absolute left-0 top-full z-20 w-[320px] translate-y-1 border border-line2 bg-ink2 opacity-0 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="border-b border-line px-4 py-2 font-mono text-[9.5px] uppercase tracking-[0.22em] text-faint">
                        path=60_* · 10 категорий
                      </div>
                      <ul className="py-1.5">
                        {terms.map((t) => {
                          const catId = t.id.replace("term-", "");
                          return (
                            <li key={t.id}>
                              <button
                                onClick={() => setSelectedId(t.id)}
                                className={`flex w-full items-center gap-3 px-4 py-1.5 text-left text-[12.5px] transition-colors ${
                                  selectedId === t.id ? "bg-amber/10 text-amber" : "text-dim hover:bg-panel2 hover:text-fog"
                                }`}
                              >
                                <span className="min-w-0 flex-1 truncate">{t.label}</span>
                                <span className="shrink-0 font-mono text-[10px] tabular-nums text-faint">{catCount(catId)}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <button
                    key={m.id}
                    onClick={() => setSelectedId(m.id)}
                    className={`px-3 py-2 font-display text-[13.5px] font-semibold transition-colors ${
                      selectedId === m.id ? "text-amber" : "text-fog hover:text-amber"
                    }`}
                  >
                    {m.label}
                  </button>
                )
              )}
              <span className="ml-auto hidden font-mono text-[9.5px] uppercase tracking-[0.2em] text-faint md:block">
                {PRODUCTS.length} товаров
              </span>
            </div>

            {/* адресная строка выбранного пункта */}
            <div className="flex items-center gap-3 border-t border-line bg-ink2/70 px-4 py-2.5 font-mono text-[11px]">
              <span className="shrink-0 text-faint">URL:</span>
              <span className="truncate text-coral/80">{selected.original}</span>
              <IconArrowR className="h-3 w-3 shrink-0 text-amber" />
              <span className="truncate text-mint">{selected.target}</span>
            </div>
          </div>

          {/* примечание про Astra */}
          <div className="mt-4 flex items-start gap-3 border border-steel/25 bg-steel/[0.05] px-4 py-3">
            <IconCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-steel" />
            <p className="text-[12.5px] leading-relaxed text-dim">
              Меню собирается кодом: <code className="font-mono text-[11px] text-steel">class-wasee-menu.php</code> создаёт
              навигацию «Wasee Primary» и вешает её в локацию <code className="font-mono text-[11px] text-steel">primary</code> темы
              Astra при активации плагина. Категории добавляются в дропдаун автоматически по мере импорта терминов — править меню вручную не нужно.
            </p>
          </div>
        </Reveal>

        {/* чертёж */}
        <Reveal delay={140} className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <Blueprint entry={selected} />
          </div>
        </Reveal>
      </div>

      {/* полная карта страниц */}
      <Reveal delay={100} className="mt-8">
        <div className="border border-line bg-panel/60">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2.5">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-dim">
              все страницы оригинала → адрес на faseen.com
            </span>
            <span className="font-mono text-[10.5px] text-faint">{PAGE_MAP.length} строк · 17 переносятся · 1 блок отброшен</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-[13px]">
              <thead>
                <tr className="font-mono text-[10px] uppercase tracking-widest text-faint">
                  <th className="px-4 py-2.5 font-medium">оригинальный URL</th>
                  <th className="px-2 py-2.5 font-medium">новый URL</th>
                  <th className="px-2 py-2.5 font-medium">объект WP</th>
                  <th className="px-4 py-2.5 font-medium">примечание</th>
                </tr>
              </thead>
              <tbody>
                {PAGE_MAP.map((r) => (
                  <tr key={r.orig} className={`border-t border-line/60 transition-colors hover:bg-panel2/50 ${r.drop ? "opacity-60" : ""}`}>
                    <td className={`px-4 py-2 font-mono text-[11.5px] ${r.drop ? "text-faint line-through decoration-coral/50" : "text-cyan/90"}`}>
                      {r.orig}
                    </td>
                    <td className="px-2 py-2 font-mono text-[11.5px]">
                      <span className={r.drop ? "text-faint" : "text-mint"}>{r.next}</span>
                    </td>
                    <td className="px-2 py-2 text-dim">{r.obj}</td>
                    <td className="px-4 py-2 text-[12px] text-faint">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
