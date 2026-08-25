import CatalogSection from "./components/CatalogSection";
import ConsoleSection from "./components/ConsoleSection";
import MappingSection from "./components/MappingSection";
import Overview from "./components/Overview";
import ReportSection from "./components/ReportSection";
import StatusBar from "./components/StatusBar";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink font-sans text-fog">
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
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <StatusBar />

      <main>
        <Overview />
        <div className="mx-auto h-px max-w-[1360px] bg-gradient-to-r from-transparent via-line2 to-transparent" />
        <ConsoleSection />
        <div className="mx-auto h-px max-w-[1360px] bg-gradient-to-r from-transparent via-line2 to-transparent" />
        <CatalogSection />
        <div className="mx-auto h-px max-w-[1360px] bg-gradient-to-r from-transparent via-line2 to-transparent" />
        <MappingSection />
        <div className="mx-auto h-px max-w-[1360px] bg-gradient-to-r from-transparent via-line2 to-transparent" />
        <ReportSection />
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1360px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-6 font-mono text-[10.5px] text-faint md:px-8">
          <span className="text-dim">
            wasee-importer <span className="text-amber">v1.4.2</span> · демонстрационная консоль
          </span>
          <span className="hidden sm:inline">OpenCart → WordPress + ACF · батчи 5/req · лог wp_wasee_import_log</span>
          <span className="ml-auto">
            не клон faseen.com — оригинальный B2B-дизайн ·{" "}
            <a href="#overview" className="text-dim underline decoration-line2 underline-offset-4 transition-colors hover:text-amber">
              наверх ↑
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
