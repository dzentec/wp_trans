import BootOverlay from "./components/BootOverlay";
import CatalogSection from "./components/CatalogSection";
import ConsoleSection from "./components/ConsoleSection";
import DocsSection from "./components/DocsSection";
import GuideSection from "./components/GuideSection";
import MappingSection from "./components/MappingSection";
import Overview from "./components/Overview";
import ReportSection from "./components/ReportSection";
import StatusBar from "./components/StatusBar";
import Ticker from "./components/Ticker";
import { PLUGIN_FILES } from "./lib/data";

const FOOTER_NAV = [
  { id: "overview", label: "Обзор операции" },
  { id: "import", label: "Консоль импорта" },
  { id: "catalog", label: "Каталог источника" },
  { id: "mapping", label: "Маппинг полей" },
  { id: "report", label: "Цель: голый WP + Astra" },
  { id: "guide", label: "Гайд по использованию" },
  { id: "docs", label: "README и ZIP" },
];

const QUICK_CMDS = [
  "wp plugin activate wasee-importer",
  "wp wasee setup --register-cpt",
  "wp wasee import --batch=5 --dry-run",
  "wp wasee import --resume-missing",
  "wp wasee redirect:generate --301",
];

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink font-sans text-fog">
      <BootOverlay />

      {/* ambient layers */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div
          className="glowpulse absolute inset-0"
          style={{
            background:
              "radial-gradient(640px 420px at 10% -6%, rgba(255,178,36,0.075), transparent 70%), radial-gradient(760px 520px at 92% 8%, rgba(67,210,255,0.06), transparent 70%), radial-gradient(900px 600px at 50% 110%, rgba(61,220,151,0.045), transparent 70%)",
          }}
        />
      </div>

      <StatusBar />

      <main>
        <Overview />
        <Ticker />
        <ConsoleSection />
        <div className="mx-auto h-px max-w-[1360px] bg-gradient-to-r from-transparent via-line2 to-transparent" />
        <CatalogSection />
        <div className="mx-auto h-px max-w-[1360px] bg-gradient-to-r from-transparent via-line2 to-transparent" />
        <MappingSection />
        <div className="mx-auto h-px max-w-[1360px] bg-gradient-to-r from-transparent via-line2 to-transparent" />
        <ReportSection />
        <div className="mx-auto h-px max-w-[1360px] bg-gradient-to-r from-transparent via-line2 to-transparent" />
        <GuideSection />
        <div className="mx-auto h-px max-w-[1360px] bg-gradient-to-r from-transparent via-line2 to-transparent" />
        <DocsSection />
      </main>

      <footer className="relative border-t border-line bg-ink2/60">
        <div className="mx-auto grid max-w-[1360px] gap-10 px-4 py-14 md:grid-cols-12 md:px-8">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center border border-amber/60 bg-amber/10 text-amber">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="7.5" />
                  <circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none" />
                  <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" />
                </svg>
              </span>
              <span className="font-display text-lg font-bold tracking-tight">
                WASEE<span className="text-amber">→</span>FASEEN
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-dim">
              Демонстрационная консоль миграции промышленных камер-модулей: OpenCart → голый WordPress + Astra.
              Плагин регистрирует CPT, таксономию и поля сам; ACF не обязателен.
            </p>
            <div className="mt-4 flex gap-2 font-mono text-[10.5px]">
              <span className="border border-line2 px-2 py-1 text-dim">v1.4.2</span>
              <span className="border border-mint/40 px-2 py-1 text-mint">PHP 7.2+</span>
              <span className="border border-line2 px-2 py-1 text-dim">WP 6.5</span>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-mono text-[10.5px] uppercase tracking-[0.26em] text-faint">разделы</h4>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className="group inline-flex items-center gap-2 text-[13.5px] text-dim transition-colors hover:text-amber"
                  >
                    <span className="h-px w-4 bg-line2 transition-all group-hover:w-6 group-hover:bg-amber" />
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-mono text-[10.5px] uppercase tracking-[0.26em] text-faint">ядро плагина</h4>
            <ul className="mt-4 space-y-2.5 font-mono text-[11.5px]">
              {PLUGIN_FILES.slice(0, 5).map((f) => (
                <li key={f.path} className="text-dim transition-colors hover:text-cyan">
                  {f.path.split("/").pop()}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-mono text-[10.5px] uppercase tracking-[0.26em] text-faint">wp-cli</h4>
            <div className="mt-4 border border-line bg-ink p-4 font-mono text-[11px] leading-[1.9]">
              {QUICK_CMDS.map((c) => (
                <p key={c} className="truncate text-dim">
                  <span className="text-amber">~$</span> <span className="text-fog/80">{c}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* ghost wordmark */}
        <div className="pointer-events-none select-none overflow-hidden">
          <div className="ghost-text -mb-2 whitespace-nowrap text-center font-display text-[14.5vw] font-bold leading-[0.78] tracking-tight opacity-60">
            WASEE→FASEEN
          </div>
        </div>

        <div className="border-t border-line/70">
          <div className="mx-auto flex max-w-[1360px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-4 font-mono text-[10.5px] text-faint md:px-8">
            <span className="text-dim">wasee-importer · миграция MIG-2025-11</span>
            <span className="hidden sm:inline">батчи 5/req · лог wp_wasee_import_log · 301-редиректы legacy_url</span>
            <a
              href="#overview"
              className="ml-auto text-dim underline decoration-line2 underline-offset-4 transition-colors hover:text-amber"
            >
              наверх ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
