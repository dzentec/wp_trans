import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, catCount, FALLBACK_IMG, PRODUCTS, type Product } from "../lib/data";
import { Reveal, SectionHead, TagChip } from "../lib/ui";
import { IconArrowR, IconCopy, IconCheck, IconSearch, IconSignal, IconX } from "./Icons";

const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  if (e.currentTarget.src !== FALLBACK_IMG) e.currentTarget.src = FALLBACK_IMG;
};

function importPayload(p: Product): string {
  const cat = CATEGORIES.find((c) => c.id === p.cat);
  const page = `https://www.waseegroup.com/?route=product/product&product_id=${p.pid}`;
  const imgBase = "https://www.waseegroup.com/image/cache/data/products/faseen/";
  const payload = {
    post_type: "product",
    post_title: p.name,
    terms: { product_category: [cat?.slug] },
    meta: {
      wasee_product_code: p.model,
      wasee_legacy_id: p.pid,
      wasee_legacy_url: page,
      wasee_specifications: p.specs.map(([name, value]) => ({ name, value })),
      wasee_gallery: p.image2
        ? [`${p.model.toLowerCase()}-main.jpg`, `${p.model.toLowerCase()}-alt.jpg`]
        : [`${p.model.toLowerCase()}-main.jpg`],
    },
    // откуда импортер физически берёт данные (парсер тянет вживую)
    _source: {
      page,
      description_selector: ".item__galleryText",
      images_selector: ".item__galleryLeft img, .item__galleryRight img",
      specs_selector: "table.specs tr",
      images_pulled_from: imgBase,
      note: "media_sideload_image() скачивает каждый src в медиатеку WP",
    },
  };
  return JSON.stringify(payload, null, 2);
}

function Drawer({ product, onClose }: { product: Product; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const cat = CATEGORIES.find((c) => c.id === product.cat);
  const payload = useMemo(() => importPayload(product), [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="fadein absolute inset-0 bg-ink/75 backdrop-blur-[2px]" onClick={onClose} />
      <aside className="drawerin absolute right-0 top-0 flex h-full w-full max-w-[600px] flex-col border-l border-line2 bg-ink2">
        {/* header image */}
        <div className="relative h-60 shrink-0 overflow-hidden border-b border-line">
          <img
            src={product.image}
            onError={onImgError}
            alt={product.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink2 via-transparent to-transparent" />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center border border-line2 bg-ink/70 text-dim transition-colors hover:border-coral/60 hover:text-coral"
            aria-label="Закрыть"
          >
            <IconX className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-5 flex items-center gap-2">
            <TagChip tone="cyan">product_id={product.pid}</TagChip>
            <TagChip tone="amber">{product.model}</TagChip>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-faint">
            {cat?.ru} · path={cat?.path}
          </div>
          <h3 className="mt-2 font-display text-2xl font-bold leading-tight">{product.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-dim">{product.description}</p>

          {/* откуда взято */}
          <div className="mt-4 border border-cyan/25 bg-cyan/[0.05] px-3.5 py-3">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
              <IconSignal className="h-3.5 w-3.5" />
              источник данных
            </div>
            <a
              href={`https://www.waseegroup.com/?route=product/product&product_id=${product.pid}`}
              target="_blank"
              rel="noreferrer"
              className="mt-1.5 block truncate font-mono text-[11px] text-steel underline decoration-line2 underline-offset-4 transition-colors hover:text-cyan"
            >
              waseegroup.com/?route=product/product&product_id={product.pid}
            </a>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-dim">
              Описание — из <code className="font-mono text-cyan/90">.item__galleryText</code>, картинки —{" "}
              <code className="font-mono text-cyan/90">.item__galleryLeft/Right img</code> и скачиваются в медиатеку через{" "}
              <code className="font-mono text-cyan/90">media_sideload_image()</code>. Ничего не захардкожено.
            </p>
          </div>

          {/* specs */}
          <div className="mt-6 flex items-center justify-between">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber">
              спецификации · {product.specs.length}
            </h4>
            <span className="font-mono text-[10px] text-faint">XPath: table.specs tr</span>
          </div>
          <table className="mt-3 w-full border border-line text-[13px]">
            <tbody>
              {product.specs.map(([k, v], i) => (
                <tr key={k} className={i % 2 ? "bg-panel/40" : ""}>
                  <td className="w-[42%] border-r border-line px-3 py-1.5 text-dim">{k}</td>
                  <td className="px-3 py-1.5 font-mono text-[12px] text-fog">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ACF payload */}
          <div className="mt-7">
            <div className="flex items-center justify-between">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan">
                payload импорта · meta
              </h4>
              <button
                onClick={copy}
                className={`inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-widest transition-colors ${
                  copied ? "border-mint/60 text-mint" : "border-line2 text-dim hover:border-amber/60 hover:text-amber"
                }`}
              >
                {copied ? <IconCheck className="h-3 w-3" /> : <IconCopy className="h-3 w-3" />}
                {copied ? "скопировано" : "copy json"}
              </button>
            </div>
            <pre className="mt-3 max-h-64 overflow-auto border border-line bg-ink p-4 font-mono text-[11px] leading-relaxed text-cyan/90">
              {payload}
            </pre>
            <p className="mt-3 text-xs leading-relaxed text-faint">
              Именно этот объект собирает class-wasee-mapper.php и передаёт в class-wasee-importer.php:
              характеристики пишутся в мета-поле wasee_specifications одним update_post_meta, галерея — через
              media_sideload_image. Если на сайте появится ACF — плагин сам синхронизирует мета в поля группы «Product Data».
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default function CatalogSection() {
  const [cat, setCat] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        (cat === "all" || p.cat === cat) &&
        (q === "" || p.name.toLowerCase().includes(q) || p.model.toLowerCase().includes(q))
    );
  }, [cat, query]);

  return (
    <section id="catalog" className="mx-auto max-w-[1360px] scroll-mt-24 px-4 py-20 md:px-8">
      <SectionHead
        index="03"
        kicker="снято парсером"
        title="Каталог источника"
        note="29 позиций, извлечённых XPath-запросами из блоков .item на waseegroup.com. Клик по карточке — таблица характеристик и готовый ACF-пayload."
      />

      {/* toolbar */}
      <Reveal className="mb-7 flex flex-wrap items-center gap-2">
        <div className="-mx-1 flex flex-1 gap-1.5 overflow-x-auto px-1 pb-1">
          {[{ id: "all", name: "Все", slug: "all" }, ...CATEGORIES].map((c) => {
            const count = c.id === "all" ? PRODUCTS.length : catCount(c.id);
            const active = cat === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`shrink-0 border px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-wider transition-all ${
                  active
                    ? "border-amber bg-amber/10 text-amber"
                    : "border-line2 text-dim hover:border-amber/50 hover:text-fog"
                }`}
              >
                {c.name}
                <span className={`ml-1.5 ${active ? "text-amber" : "text-faint"}`}>{count}</span>
              </button>
            );
          })}
        </div>
        <label className="relative block">
          <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="поиск: модель, название…"
            className="w-64 border border-line2 bg-panel py-2 pl-9 pr-3 font-mono text-[12px] text-fog placeholder:text-faint focus:border-amber focus:outline-none"
          />
        </label>
      </Reveal>

      {/* grid */}
      {filtered.length === 0 ? (
        <div className="border border-dashed border-line2 px-6 py-16 text-center font-mono text-sm text-faint">
          ничего не найдено — измените категорию или запрос
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p, i) => {
            const c = CATEGORIES.find((x) => x.id === p.cat);
            return (
              <Reveal key={p.pid} delay={(i % 4) * 70}>
                <button
                  onClick={() => setSelected(p)}
                  className="group block w-full border border-line bg-panel text-left transition-all duration-300 hover:-translate-y-1 hover:border-amber/60 hover:shadow-[0_18px_40px_-18px_rgba(255,178,36,0.25)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden border-b border-line">
                    <img
                      src={p.image}
                      onError={onImgError}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                    <span className="absolute left-2.5 top-2.5 border border-line2 bg-ink/80 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-cyan">
                      #{p.pid}
                    </span>
                    {p.image2 && (
                      <span className="absolute right-2.5 top-2.5 border border-line2 bg-ink/80 px-1.5 py-0.5 font-mono text-[10px] text-dim">
                        2 img
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">{c?.ru}</div>
                    <div className="mt-1.5 font-display text-[15px] font-semibold leading-snug text-fog">
                      {p.name}
                    </div>
                    <div className="mt-1 font-mono text-[11.5px] text-amber/85">{p.model}</div>
                    <div className="mt-3 flex items-center justify-between border-t border-line/70 pt-2.5">
                      <span className="font-mono text-[10.5px] text-faint">{p.specs.length} спецификаций</span>
                      <span className="inline-flex items-center gap-1 font-mono text-[10.5px] uppercase tracking-widest text-dim transition-colors group-hover:text-amber">
                        открыть <IconArrowR className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      )}

      {selected && <Drawer product={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
