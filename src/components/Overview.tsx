import { useEffect, useRef, useState } from "react";
import { CATEGORIES, PRODUCTS, TOTAL_IMAGES, TOTAL_SPEC_ROWS } from "../lib/data";
import { Reveal, TagChip, useCountUp } from "../lib/ui";

/* ---------- pipeline schematic ---------- */

function Node({
  x,
  accent,
  icon,
  title,
  sub,
  sub2,
}: {
  x: number;
  accent: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
  sub2: string;
}) {
  return (
    <g>
      <rect x={x} y={70} width={210} height={112} fill="#121A2B" stroke="#223050" />
      <path d={`M${x} 70h14M${x} 70v14`} stroke={accent} strokeWidth={2} />
      <path d={`M${x + 210} 182h-14M${x + 210} 182v-14`} stroke={accent} strokeWidth={2} />
      <g transform={`translate(${x + 18} 92)`} stroke={accent} fill="none" strokeWidth={1.6}>
        {icon}
      </g>
      <text x={x + 52} y={104} fontFamily="'Space Grotesk',sans-serif" fontSize={15.5} fontWeight={700} fill="#E8EEF9">
        {title}
      </text>
      <text x={x + 52} y={123} fontFamily="'IBM Plex Mono',monospace" fontSize={10} fill="#94A3C0">
        {sub}
      </text>
      <text x={x + 52} y={139} fontFamily="'IBM Plex Mono',monospace" fontSize={10} fill="#5C6C8F">
        {sub2}
      </text>
      <rect x={x + 18} y={154} width={30} height={3} fill={accent} />
    </g>
  );
}

function Schematic() {
  return (
    <Reveal className="relative overflow-hidden border border-line bg-panel/60">
      <div className="scanline pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent via-cyan/10 to-transparent" />
      <svg viewBox="0 0 960 252" className="w-full">
        {/* connectors */}
        <line x1="240" y1="126" x2="375" y2="126" stroke="#2E4066" strokeWidth="1.5" className="dashline" />
        <line x1="585" y1="126" x2="720" y2="126" stroke="#2E4066" strokeWidth="1.5" className="dashline" />
        <circle r="4" fill="#43D2FF">
          <animateMotion dur="2.3s" repeatCount="indefinite" path="M240,126 H375" />
        </circle>
        <circle r="4" fill="#FFB224">
          <animateMotion dur="2.3s" begin="1.1s" repeatCount="indefinite" path="M585,126 H720" />
        </circle>
        <text x="307" y="150" textAnchor="middle" fontFamily="'IBM Plex Mono',monospace" fontSize="9.5" fill="#5C6C8F">
          product_id 281…316
        </text>
        <text x="652" y="150" textAnchor="middle" fontFamily="'IBM Plex Mono',monospace" fontSize="9.5" fill="#5C6C8F">
          posts + terms + media
        </text>

        <Node
          x={30}
          accent="#43D2FF"
          title="waseegroup.com"
          sub="OpenCart 3.0.3.8"
          sub2="?route=product/product"
          icon={
            <>
              <path d="M10 1 1 5.5v9L10 19l9-4.5v-9L10 1Z" />
              <path d="M1 5.5 10 10l9-4.5M10 10v9" />
            </>
          }
        />
        <Node
          x={375}
          accent="#FFB224"
          title="wasee-mapper"
          sub="9 правил маппинга"
          sub2="XPath → ACF repeater"
          icon={
            <>
              <rect x="4" y="4" width="12" height="12" />
              <rect x="8" y="8" width="4" height="4" />
              <path d="M7 4V1M10 4V1M13 4V1M7 19v-3M10 19v-3M13 19v-3M4 7H1M4 10H1M4 13H1M19 7h-3M19 10h-3M19 13h-3" />
            </>
          }
        />
        <Node
          x={720}
          accent="#3DDC97"
          title="faseen.com"
          sub="голый WP 6.5 · Astra 4.6"
          sub2="плагин создаёт CPT + fields"
          icon={
            <>
              <circle cx="10" cy="10" r="8.5" />
              <path d="M1.5 10h17M10 1.5c-2.8 2.3-4.2 5.1-4.2 8.5s1.4 6.2 4.2 8.5c2.8-2.3 4.2-5.1 4.2-8.5S12.8 3.8 10 1.5Z" />
            </>
          }
        />

        <text x="40" y="222" fontFamily="'IBM Plex Mono',monospace" fontSize="10" fill="#5C6C8F">
          FIG.01 — транспортная схема миграции · пакет: wasee-importer 1.4.2
        </text>
        <text x="920" y="222" textAnchor="end" fontFamily="'IBM Plex Mono',monospace" fontSize="10" fill="#5C6C8F">
          batch 5/req · ajax
        </text>
      </svg>
    </Reveal>
  );
}

/* ---------- stat strip ---------- */

function StatCell({
  label,
  value,
  suffix,
  note,
  active,
  delay,
}: {
  label: string;
  value: number;
  suffix?: string;
  note: string;
  active: boolean;
  delay: number;
}) {
  const v = useCountUp(value, active, 1400 + delay);
  return (
    <div className="px-6 py-7 md:px-8">
      <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-faint">{label}</div>
      <div className="mt-2 font-display text-4xl font-bold tabular-nums tracking-tight text-fog md:text-5xl">
        {v}
        {suffix && <span className="text-amber">{suffix}</span>}
      </div>
      <div className="mt-1.5 text-xs text-dim">{note}</div>
    </div>
  );
}

/* ---------- section ---------- */

export default function Overview() {
  const stripRef = useRef<HTMLDivElement>(null);
  const [stripIn, setStripIn] = useState(false);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (setStripIn(true), io.disconnect())),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="overview" className="relative mx-auto max-w-[1360px] scroll-mt-24 px-4 pb-16 pt-28 md:px-8 md:pt-40">
      {/* pcb traces */}
      <svg
        className="pointer-events-none absolute right-4 top-8 hidden w-[460px] text-line2 opacity-70 lg:block"
        viewBox="0 0 460 150"
        fill="none"
        aria-hidden="true"
      >
        <path d="M460 20H300V55H180V95H60" stroke="currentColor" strokeWidth="1.2" />
        <path d="M460 60H350V105H250V130H140" stroke="#2E4066" strokeWidth="1.2" className="dashline" />
        <path d="M460 100H390V35H310V75H240V20H120" stroke="#2E4066" strokeWidth="1.2" />
        <path d="M460 135H410V70H340" stroke="rgba(255,178,36,0.35)" strokeWidth="1.2" className="dashline" />
        {[
          [60, 95], [140, 130], [120, 20], [340, 70], [310, 75],
        ].map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x - 3.5} y={y - 3.5} width="7" height="7" stroke="currentColor" strokeWidth="1.2" />
        ))}
        <circle cx="60" cy="95" r="1.6" fill="#FFB224" />
        <circle cx="140" cy="130" r="1.6" fill="#43D2FF" />
        <circle cx="340" cy="70" r="1.6" fill="#FFB224" />
      </svg>

      {/* headline row */}
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-amber">
              <span className="text-faint">MIG-2025-11</span>
              <span className="h-px w-10 bg-amber/50" />
              <span>сводка операции</span>
              <span className="blink inline-block h-3.5 w-2 translate-y-0.5 bg-amber" />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-[44px] font-bold leading-[0.98] tracking-tight md:text-7xl">
              Миграция
              <br />
              каталога<span className="text-amber">.</span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <div className="ghost-text mt-3 font-display text-2xl font-bold tracking-tight md:text-4xl">
              WASEEGROUP → FASEEN
            </div>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-dim">
              Консоль переноса промышленных камер-модулей с OpenCart-витрины waseegroup.com в WordPress + ACF на
              faseen.com. Парсер снимает <span className="text-fog">название, галерею, описание и таблицу
              характеристик</span> из блока <code className="border border-line2 bg-panel px-1.5 py-0.5 font-mono text-[12px] text-cyan">.item</code>,
              маппер раскладывает данные по мета-полям (а если появится ACF — по его полям), импортер пишет посты батчами через admin-ajax.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <TagChip tone="cyan">OpenCart 3.0.3.8</TagChip>
              <span className="font-mono text-faint">→</span>
              <TagChip tone="amber">WordPress 6.5 · ACF 6.2</TagChip>
              <span className="font-mono text-faint">·</span>
              <TagChip tone="mint">тема Astra (не клон)</TagChip>
              <span className="font-mono text-faint">·</span>
              <TagChip>PHP 7.2+</TagChip>
            </div>
          </Reveal>
        </div>

        {/* operation passport */}
        <Reveal delay={180} className="lg:col-span-5">
          <div className="relative h-full border border-line bg-panel/70">
            <span className="absolute left-0 top-0 h-3.5 w-3.5 border-l-2 border-t-2 border-amber" />
            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 border-b-2 border-r-2 border-amber" />
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-dim">паспорт операции</span>
              <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-widest text-amber">
                <span className="blink inline-block h-1.5 w-1.5 bg-amber" />
                ready
              </span>
            </div>
            <dl className="divide-y divide-line/70 font-mono text-[12px]">
              {[
                ["source", "waseegroup.com · /image/cache/data/products/faseen/"],
                ["endpoint", "wp-admin/admin-ajax.php · action=wasee_batch"],
["target", "голый WP 6.5 + Astra — и всё, плагинов 0"],
["CPT / terms", "«product» + product_category — регистрирует плагин"],
["acf", "опционально: группа «Product Data» или фолбэк на мета"],                ["batch", "5 товаров / AJAX-запрос"],
                ["retries", "media 404 → 2 повтора"],
                ["режим", "не клон: уникальная вёрстка B2B"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[92px_1fr] gap-3 px-5 py-2.5">
                  <dt className="uppercase tracking-wider text-faint">{k}</dt>
                  <dd className="text-dim">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>

      {/* schematic */}
      <div className="mt-12">
        <Schematic />
      </div>

      {/* stats strip */}
      <div ref={stripRef} className="mt-8 grid grid-cols-2 divide-x divide-line border border-line bg-panel/50 lg:grid-cols-4">
        <StatCell active={stripIn} delay={0} label="Товары" value={PRODUCTS.length} note="product_id 281…316, пропусков 0" />
        <StatCell active={stripIn} delay={120} label="Категории" value={CATEGORIES.length} note="path=60_61 … 60_138" />
        <StatCell active={stripIn} delay={240} label="Медиафайлы" value={TOTAL_IMAGES} note="main + gallery, sideload" />
        <StatCell active={stripIn} delay={360} label="Spec-строк" value={TOTAL_SPEC_ROWS} note="в repeater «specifications»" />
      </div>
    </section>
  );
}
