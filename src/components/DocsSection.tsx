import { useEffect, useMemo, useState } from "react";
import { buildReadmeRaw, README_LEAD, README_SECTIONS, type ReadmeBlock } from "../lib/readme";
import { buildPluginZip, ZIP_CHECKS, ZIP_EXCLUDED, ZIP_NAME, ZIP_TREE } from "../lib/zip";
import { Reveal, SectionHead } from "../lib/ui";
import { IconBox, IconCheck, IconCopy, IconDoc, IconFile, IconFolder } from "./Icons";

/* ---------- helpers ---------- */

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function Inline({ text }: { text: string }) {
  const parts = text.split(/`([^`]+)`/g);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <code key={i} className="border border-line2 bg-ink px-1.5 py-px font-mono text-[11.5px] text-cyan">
            {p}
          </code>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="my-3 border border-line bg-ink">
      <div className="flex items-center justify-between border-b border-line px-3 py-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint">{lang}</span>
        <button
          onClick={async () => {
            if (await copyText(code)) {
              setCopied(true);
              setTimeout(() => setCopied(false), 1400);
            }
          }}
          className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors ${
            copied ? "text-mint" : "text-dim hover:text-amber"
          }`}
        >
          {copied ? <IconCheck className="h-3 w-3" /> : <IconCopy className="h-3 w-3" />}
          {copied ? "скопировано" : "copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-3.5 py-3 font-mono text-[11.5px] leading-[1.75] text-fog/90">{code}</pre>
    </div>
  );
}

function Block({ b }: { b: ReadmeBlock }) {
  switch (b.kind) {
    case "p":
      return (
        <p className="my-2.5 text-[13.5px] leading-relaxed text-dim">
          <Inline text={b.text} />
        </p>
      );
    case "list":
      return (
        <ul className="my-3 space-y-1.5">
          {b.items.map((it, i) => (
            <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-dim">
              <span className="mt-px shrink-0 font-mono text-[11px] text-amber">▸</span>
              <span>
                <Inline text={it} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "code":
      return <CodeBlock code={b.code} lang={b.lang} />;
    case "table":
      return (
        <div className="my-3 overflow-x-auto border border-line">
          <table className="w-full text-left text-[12.5px]">
            <thead>
              <tr className="bg-ink2">
                {b.head.map((h) => (
                  <th key={h} className="border-b border-line px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-faint">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i} className={i % 2 ? "bg-panel/40" : ""}>
                  {r.map((c, j) => (
                    <td key={j} className={`border-t border-line/60 px-3 py-1.5 align-top ${j === 0 ? "font-mono text-[11.5px] text-fog" : "text-dim"}`}>
                      <Inline text={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

/* ---------- README viewer ---------- */

function ReadmeCard() {
  const [copied, setCopied] = useState(false);
  const raw = useMemo(() => buildReadmeRaw(), []);

  const scrollTo = (id: string) => {
    document.getElementById(`rd-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="border border-line bg-panel/70">
      <div className="flex flex-wrap items-center gap-3 border-b border-line px-4 py-3">
        <IconDoc className="h-4 w-4 text-amber" />
        <span className="font-mono text-[12px] text-fog">README.md</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-faint">wasee-importer · v1.4.2 · GPL-2.0</span>
        <button
          onClick={async () => {
            if (await copyText(raw)) {
              setCopied(true);
              setTimeout(() => setCopied(false), 1600);
            }
          }}
          className={`ml-auto inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-widest transition-colors active:scale-95 ${
            copied ? "border-mint/60 text-mint" : "border-line2 text-dim hover:border-amber/60 hover:text-amber"
          }`}
        >
          {copied ? <IconCheck className="h-3 w-3" /> : <IconCopy className="h-3 w-3" />}
          {copied ? "скопировано" : "copy raw"}
        </button>
      </div>

      {/* internal nav */}
      <div className="flex gap-1.5 overflow-x-auto border-b border-line/70 px-4 py-2.5">
        {README_SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="shrink-0 border border-line2 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-dim transition-colors hover:border-amber/60 hover:text-amber"
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="px-5 py-6 md:px-7">
        <h3 className="font-display text-3xl font-bold tracking-tight">wasee-importer</h3>
        <p className="mt-3 border-l-2 border-amber/60 pl-4 text-[13.5px] leading-relaxed text-dim">{README_LEAD}</p>
        <div className="mt-2 font-mono text-[11px] text-faint">
          <span className="text-amber">Версия:</span> 1.4.2 · <span className="text-amber">Тестировалось:</span> WordPress 6.5 ·{" "}
          <span className="text-amber">Лицензия:</span> GPL-2.0-or-later
        </div>

        {README_SECTIONS.map((s, i) => (
          <div key={s.id} id={`rd-${s.id}`} className="mt-9 scroll-mt-28">
            <h4 className="flex items-baseline gap-3 font-display text-xl font-bold tracking-tight">
              <span className="font-mono text-[11px] text-faint">{String(i + 1).padStart(2, "0")}</span>
              {s.title}
              <span className="h-px flex-1 self-center bg-line" />
            </h4>
            {s.blocks.map((b, j) => (
              <Block key={j} b={b} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- ZIP builder ---------- */

function ZipCard() {
  const LS_KEY = "wasee-zip-checks";
  const [checks, setChecks] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) ?? "{}");
    } catch {
      return {};
    }
  });
  const [phase, setPhase] = useState<"pre" | "ready" | "done">("pre");
  const [info, setInfo] = useState<{ files: number; bytes: number; crc32: string; url: string } | null>(null);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(checks));
  }, [checks]);

  const doneCount = ZIP_CHECKS.filter((c) => checks[c.id]).length;

  /* релиз собирается один раз при загрузке страницы — скачивание мгновенное */
  useEffect(() => {
    let alive = true;
    buildPluginZip().then(({ blob, files, bytes, crc32 }) => {
      if (!alive) return;
      setInfo({ files, bytes, crc32, url: URL.createObjectURL(blob) });
      setPhase("ready");
    });
    return () => {
      alive = false;
    };
  }, []);

  const download = () => {
    if (!info) return;
    const a = document.createElement("a");
    a.href = info.url;
    a.download = ZIP_NAME;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setPhase("done");
  };

  return (
    <div className="border border-line bg-panel/70">
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <IconBox className="h-4 w-4 text-cyan" />
        <span className="font-mono text-[12px] text-fog">сборка ZIP</span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-faint">{ZIP_NAME}</span>
      </div>

      {/* tree */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-2 font-mono text-[11px] text-amber">
          <IconFolder className="h-3.5 w-3.5" />
          wasee-importer/
        </div>
        <ul className="mt-2 space-y-1">
          {ZIP_TREE.map((f) => (
            <li key={f.path} className="group flex items-center gap-2.5 py-1 pl-5 font-mono text-[11.5px]">
              <IconFile className="h-3 w-3 shrink-0 text-faint transition-colors group-hover:text-cyan" />
              <span className="min-w-0 truncate text-dim transition-colors group-hover:text-fog" title={f.path}>
                {f.path.replace("wasee-importer/", "")}
              </span>
              <span className="ml-auto hidden shrink-0 text-[10px] text-faint sm:block">{f.note}</span>
              <span className="shrink-0 tabular-nums text-[10px] text-faint">{f.size}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 border-t border-dashed border-line2 pt-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-coral/80">вне архива</div>
          <ul className="mt-2 space-y-1">
            {ZIP_EXCLUDED.map((f) => (
              <li key={f.path} className="flex items-center gap-2.5 pl-5 font-mono text-[11px] text-faint">
                <span className="text-coral/70">✕</span>
                <span className="line-through decoration-coral/40">{f.path}</span>
                <span className="ml-auto hidden text-[10px] sm:block">{f.reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* checklist */}
      <div className="border-t border-line px-4 py-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">чек-лист перед сборкой</span>
          <span className={`font-mono text-[11px] tabular-nums ${doneCount === ZIP_CHECKS.length ? "text-mint" : "text-amber"}`}>
            {doneCount}/{ZIP_CHECKS.length}
          </span>
        </div>
        <ul className="mt-2.5 space-y-2">
          {ZIP_CHECKS.map((c) => (
            <li key={c.id}>
              <label className="group flex cursor-pointer items-start gap-2.5">
                <button
                  onClick={() => setChecks((prev) => ({ ...prev, [c.id]: !prev[c.id] }))}
                  className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center border transition-colors ${
                    checks[c.id] ? "border-mint bg-mint/20 text-mint" : "border-line2 group-hover:border-amber/60"
                  }`}
                  aria-label={c.text}
                >
                  {checks[c.id] && <IconCheck className="h-2.5 w-2.5" />}
                </button>
                <span className={`text-[12.5px] leading-snug transition-colors ${checks[c.id] ? "text-dim line-through decoration-line2" : "text-fog/90"}`}>
                  {c.text}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* command */}
      <div className="border-t border-line px-4 py-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">или вручную из исходников</div>
        <CodeBlock
          lang="bash"
          code={`cd wp-content/plugins\nzip -r ../${ZIP_NAME} wasee-importer \\\n  -x "*.git*" -x "*node_modules*" -x "*.DS_Store"\n\nwp plugin install ../${ZIP_NAME} --activate`}
        />
      </div>

      {/* release metrics */}
      {info && (
        <div className="grid grid-cols-3 divide-x divide-line border-t border-line">
          {[
            ["файлов", String(info.files)],
            ["размер", `${(info.bytes / 1024).toFixed(1)} KB`],
            ["crc32", info.crc32],
          ].map(([k, v]) => (
            <div key={k} className="px-3 py-2.5">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-faint">{k}</div>
              <div className="mt-0.5 truncate font-mono text-[11.5px] tabular-nums text-cyan" title={v}>{v}</div>
            </div>
          ))}
        </div>
      )}

      {/* release button */}
      <div className="border-t border-line px-4 py-4">
        <button
          onClick={download}
          disabled={!info}
          className={`flex w-full items-center justify-center gap-2.5 px-5 py-3 font-display text-sm font-bold uppercase tracking-wide transition-all ${
            !info
              ? "cursor-wait border border-line2 text-faint"
              : "bg-cyan text-ink hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(67,210,255,0.55)] active:translate-y-0"
          }`}
        >
          <IconBox className="h-4 w-4" />
          {!info && (
            <>
              <span className="blink inline-block h-3 w-3 border border-current" />
              сборка релиза…
            </>
          )}
          {info && phase === "ready" && `Скачать ${ZIP_NAME}`}
          {info && phase === "done" && (
            <>
              <IconCheck className="h-4 w-4" />
              скачано · ещё раз
            </>
          )}
        </button>
        {phase === "done" && info && (
          <p className="tickpop mt-2.5 flex items-center gap-2 font-mono text-[11px] text-mint">
            <IconCheck className="h-3.5 w-3.5" />
            {ZIP_NAME} · {info.files} файлов · crc32 {info.crc32} — сверьте с RELEASE_NOTES
          </p>
        )}
        <p className="mt-2.5 text-[11px] leading-relaxed text-faint">
          Среда сборки этой консоли не имеет shell и не умеет писать бинарные файлы в репозиторий, поэтому ZIP
          собирается детерминированно в браузере (DEFLATE lvl 9, те же байты при каждой сборке) — а текстовые
          релизные файлы уже лежат в{" "}
          <a
            href="/releases/RELEASE_NOTES.md"
            target="_blank"
            rel="noreferrer"
            className="text-cyan underline decoration-cyan/40 underline-offset-4 transition-colors hover:text-fog"
          >
            public/releases/
          </a>
          . Установка: «Плагины → Загрузить» или{" "}
          <code className="font-mono text-[10.5px] text-dim">wp plugin install {ZIP_NAME} --activate</code>.
        </p>
      </div>
    </div>
  );
}

/* ---------- section ---------- */

export default function DocsSection() {
  return (
    <section id="docs" className="mx-auto max-w-[1360px] scroll-mt-24 px-4 py-20 md:px-8">
      <SectionHead
        index="07"
        kicker="документация и дистрибутив"
        title="README и сборка ZIP"
        note="README полностью переписан под голую цель (WP + Astra) и является единым источником правды: тот же текст автоматически вкладывается в архив как readme.txt."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <ReadmeCard />
        </Reveal>
        <Reveal delay={140} className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <ZipCard />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
