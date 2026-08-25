import { useEffect, useRef, useState } from "react";
import {
  buildImportScript,
  CATEGORIES,
  PRODUCTS,
  stampOf,
  type Ev,
  type LogLevel,
  type PStatus,
  type Stage,
} from "../lib/data";
import { Reveal, SectionHead, TagChip } from "../lib/ui";
import { IconPlay, IconReset, IconCheck } from "./Icons";

type LogLine = { t: number; level: LogLevel; msg: string };

const STAGES: { id: Stage; label: string }[] = [
  { id: "scout", label: "Разведка" },
  { id: "parse", label: "Парсинг" },
  { id: "media", label: "Медиатека" },
  { id: "map", label: "Маппинг ACF" },
  { id: "import", label: "Запись в WP" },
];
const ORDER: Stage[] = ["scout", "parse", "media", "map", "import"];

const LEVEL_MARK: Record<LogLevel, { mark: string; cls: string }> = {
  sys: { mark: "▸", cls: "text-cyan" },
  info: { mark: "›", cls: "text-dim" },
  ok: { mark: "✓", cls: "text-mint" },
  warn: { mark: "!", cls: "text-amber" },
  err: { mark: "✕", cls: "text-coral" },
};

const STATUS_META: Record<PStatus, { label: string; cls: string }> = {
  idle: { label: "—", cls: "border-line text-faint" },
  queue: { label: "в очереди", cls: "border-line2 text-dim" },
  parse: { label: "парсинг", cls: "border-cyan/50 text-cyan" },
  media: { label: "медиа", cls: "border-amber/50 text-amber" },
  map: { label: "маппинг", cls: "border-steel/50 text-steel" },
  done: { label: "создан", cls: "border-mint/50 text-mint" },
};

export default function ConsoleSection() {
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const [statuses, setStatuses] = useState<Record<number, PStatus>>({});
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  const scriptRef = useRef<Ev[]>([]);
  const idxRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const startRef = useRef(0);
  const logBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = logBoxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [logs]);

  useEffect(() => () => { if (timerRef.current) window.clearInterval(timerRef.current); }, []);

  const apply = (ev: Ev) => {
    switch (ev.kind) {
      case "log":
        setLogs((l) => [...l, { t: ev.t, level: ev.level, msg: ev.msg }]);
        break;
      case "stage":
        setStage(ev.stage);
        break;
      case "progress":
        setProgress(ev.value);
        break;
      case "allqueue":
        setStatuses(Object.fromEntries(PRODUCTS.map((p) => [p.pid, "queue" as PStatus])));
        break;
      case "status":
        setStatuses((s) => ({ ...s, [ev.pid]: ev.st }));
        break;
    }
  };

  const run = () => {
    if (running) return;
    setLogs([]);
    setStatuses({});
    setProgress(0);
    setFinished(false);
    setRunning(true);
    scriptRef.current = buildImportScript();
    idxRef.current = 0;
    startRef.current = performance.now();
    timerRef.current = window.setInterval(() => {
      const elapsed = performance.now() - startRef.current;
      const script = scriptRef.current;
      let guard = 0;
      while (idxRef.current < script.length && script[idxRef.current].t <= elapsed && guard < 40) {
        apply(script[idxRef.current]);
        idxRef.current++;
        guard++;
      }
      if (idxRef.current >= script.length) {
        if (timerRef.current) window.clearInterval(timerRef.current);
        timerRef.current = null;
        setRunning(false);
        setFinished(true);
      }
    }, 70);
  };

  const reset = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
    setRunning(false);
    setFinished(false);
    setLogs([]);
    setStatuses({});
    setProgress(0);
    setStage("idle");
  };

  const activeIdx = stage === "done" ? ORDER.length : ORDER.indexOf(stage);
  const doneCount = PRODUCTS.filter((p) => statuses[p.pid] === "done").length;
  const stageBadge =
    stage === "idle" ? "ОЖИДАНИЕ" : stage === "done" ? "ЗАВЕРШЕНО" : STAGES[activeIdx]?.label.toUpperCase();

  return (
    <section id="import" className="mx-auto max-w-[1360px] scroll-mt-24 px-4 py-20 md:px-8">
      <SectionHead
        index="02"
        kicker="пайплайн импорта"
        title="Консоль импорта"
        note="Живая симуляция работы плагина: реальный wasee-importer повторяет те же батчи через admin-ajax WordPress, лог пишется в wp_wasee_import_log."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        {/* terminal */}
        <Reveal className="lg:col-span-7">
          <div className="flex h-full flex-col border border-line bg-ink2">
            <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
              <span className="flex gap-1.5">
                <i className="h-2.5 w-2.5 bg-coral/80" />
                <i className="h-2.5 w-2.5 bg-amber/80" />
                <i className="h-2.5 w-2.5 bg-mint/80" />
              </span>
              <span className="font-mono text-[11px] text-dim">wasee-importer — живой лог</span>
              <span
                className={`ml-auto border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${
                  stage === "done"
                    ? "border-mint/50 text-mint"
                    : stage === "idle"
                      ? "border-line2 text-faint"
                      : "border-amber/50 text-amber"
                }`}
              >
                {stageBadge}
              </span>
            </div>
            <div ref={logBoxRef} className="h-[380px] flex-1 overflow-y-auto px-4 py-3 font-mono text-[11.5px] leading-[1.75]">
              {logs.length === 0 && (
                <p className="text-faint">
                  <span className="text-cyan">~/wp-admin</span> $ нажмите «Запустить миграцию» — сценарий ~20 секунд:
                  разведка → парсинг → медиа → маппинг → запись.
                </p>
              )}
              {logs.map((l, i) => {
                const m = LEVEL_MARK[l.level];
                return (
                  <div key={i} className="fadein flex gap-2.5 whitespace-pre-wrap break-all">
                    <span className="shrink-0 tabular-nums text-faint">{stampOf(l.t)}</span>
                    <span className={`shrink-0 font-semibold ${m.cls}`}>{m.mark}</span>
                    <span className={l.level === "info" ? "text-dim" : l.level === "sys" ? "text-steel" : m.cls}>
                      {l.msg}
                    </span>
                  </div>
                );
              })}
              {running && (
                <span className="blink mt-1 inline-block h-3.5 w-2 translate-y-0.5 bg-cyan" />
              )}
            </div>
          </div>
        </Reveal>

        {/* controls */}
        <Reveal delay={120} className="lg:col-span-5">
          <div className="flex h-full flex-col border border-line bg-panel">
            <div className="border-b border-line px-5 py-3.5">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-dim">прогресс</span>
                <span className="font-display text-3xl font-bold tabular-nums text-amber">{progress}%</span>
              </div>
              <div className="mt-3 h-2.5 border border-line2 bg-ink">
                <div
                  className={`h-full transition-[width] duration-300 ease-out ${
                    stage === "done" ? "bg-mint" : "stripes bg-amber"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between font-mono text-[10.5px] text-faint">
                <span>постов: {doneCount}/{PRODUCTS.length}</span>
                <span>батч 5/req · ajax</span>
              </div>
            </div>

            {/* stepper */}
            <ol className="divide-y divide-line/70">
              {STAGES.map((s, i) => {
                const state = stage === "done" || i < activeIdx ? "done" : i === activeIdx ? "active" : "idle";
                return (
                  <li key={s.id} className="flex items-center gap-3 px-5 py-2.5">
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center border font-mono text-[10px] ${
                        state === "done"
                          ? "border-mint/60 text-mint"
                          : state === "active"
                            ? "border-amber text-amber"
                            : "border-line2 text-faint"
                      }`}
                    >
                      {state === "done" ? <IconCheck className="h-3 w-3" /> : state === "active" ? <span className="blink">▮</span> : i + 1}
                    </span>
                    <span className={`text-sm ${state === "idle" ? "text-faint" : state === "active" ? "text-fog" : "text-dim"}`}>
                      {s.label}
                    </span>
                    {state === "active" && (
                      <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-amber">выполняется</span>
                    )}
                  </li>
                );
              })}
            </ol>

            <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-line px-5 py-4">
              <button
                onClick={run}
                disabled={running}
                className={`group inline-flex items-center gap-2.5 px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wide transition-all ${
                  running
                    ? "cursor-not-allowed border border-line2 text-faint"
                    : "bg-amber text-ink hover:-translate-y-0.5 hover:bg-amber2 hover:shadow-[0_8px_28px_-8px_rgba(255,178,36,0.55)]"
                }`}
              >
                <IconPlay className="h-3.5 w-3.5" />
                {running ? "Импорт идёт…" : finished ? "Повторить" : "Запустить миграцию"}
              </button>
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 border border-line2 px-4 py-2.5 font-mono text-[11.5px] uppercase tracking-widest text-dim transition-colors hover:border-coral/60 hover:text-coral"
              >
                <IconReset className="h-3.5 w-3.5" />
                сброс
              </button>
              {finished && (
                <span className="tickpop flex items-center gap-2 font-mono text-[11px] text-mint">
                  <IconCheck className="h-3.5 w-3.5" /> 0 ошибок · 1 медиа-повтор
                </span>
              )}
            </div>
          </div>
        </Reveal>
      </div>

      {/* batch status table */}
      <Reveal delay={100} className="mt-6">
        <div className="border border-line bg-panel/60">
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-dim">
              статусы батча · {PRODUCTS.length} позиций
            </span>
            <span className="font-mono text-[10.5px] text-faint">wp_insert_post → CPT «product»</span>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="sticky top-0 z-10 bg-ink2">
                <tr className="font-mono text-[10px] uppercase tracking-widest text-faint">
                  <th className="px-4 py-2 font-medium">id</th>
                  <th className="px-2 py-2 font-medium">товар</th>
                  <th className="hidden px-2 py-2 font-medium md:table-cell">категория</th>
                  <th className="px-4 py-2 text-right font-medium">статус</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((p) => {
                  const st = statuses[p.pid] ?? "idle";
                  const meta = STATUS_META[st];
                  const cat = CATEGORIES.find((c) => c.id === p.cat);
                  return (
                    <tr key={p.pid} className="border-t border-line/60 transition-colors hover:bg-panel2/50">
                      <td className="px-4 py-1.5 font-mono text-[11.5px] tabular-nums text-faint">#{p.pid}</td>
                      <td className="px-2 py-1.5">
                        <span className={st === "idle" ? "text-faint" : "text-fog"}>{p.name}</span>
                        <span className="ml-2 hidden font-mono text-[10.5px] text-amber/70 sm:inline">{p.model}</span>
                      </td>
                      <td className="hidden px-2 py-1.5 md:table-cell">
                        <TagChip>{cat?.slug}</TagChip>
                      </td>
                      <td className="px-4 py-1.5 text-right">
                        <span
                          key={st}
                          className={`rowflash inline-flex min-w-[86px] items-center justify-center gap-1.5 border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${meta.cls}`}
                        >
                          {st === "done" && <IconCheck className="h-2.5 w-2.5" />}
                          {meta.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
