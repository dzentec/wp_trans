import { useEffect, useState } from "react";
import { Reveal, SectionHead, TagChip } from "../lib/ui";
import { IconCheck, IconCopy, IconReset, IconWarn } from "./Icons";

type Step = {
  id: string;
  title: string;
  time: string;
  lead: string;
  actions: string[];
  command?: string;
  expect: string;
  warn?: string;
};

const STEPS: Step[] = [
  {
    id: "check",
    title: "Проверьте цель",
    time: "~2 мин",
    lead: "Убедитесь, что faseen.com — это чистый WordPress с темой Astra и ничем больше.",
    actions: [
      "Версия WordPress ≥ 5.0, PHP ≥ 7.2 (лучше 8.x)",
      "Активна тема Astra (внешний вид → темы)",
      "Плагины: кроме обязательных — ничего; ACF не обязателен",
      "Есть доступ к файлам сайта (FTP / файловый менеджер хостинга)",
    ],
    command: "wp core version && wp theme list --status=active",
    expect: "WP 6.5.x, активная тема astra, список плагинов короткий.",
  },
  {
    id: "install",
    title: "Установите плагин",
    time: "~3 мин",
    lead: "Скопируйте папку wasee-importer в каталог плагинов и активируйте её.",
    actions: [
      "Загрузите папку wasee-importer в /wp-content/plugins/",
      "Админка → Плагины → найдите «Wasee Importer» → Активировать",
      "Или через WP-CLI одной командой (ниже)",
    ],
    command: "wp plugin activate wasee-importer",
    expect: "Плагин активен, в админке нет ошибок.",
  },
  {
    id: "activate",
    title: "Дождитесь регистрации структур",
    time: "автоматически",
    lead: "При активации плагин сам создаёт всё, чего не хватает голому сайту.",
    actions: [
      "Регистрируется CPT «product» и таксономия product_category",
      "Создаются мета-ключи wasee_* и шаблоны single-product / archive-product",
      "Выполняется flush_rewrite_rules() для ЧПУ",
      "Проверьте: в левом меню админки появился пункт «Товары»",
    ],
    expect: "Пункт «Товары» есть в меню, в «Записи → Таксономии» видна product_category.",
    warn: "Если пункта «Товары» нет — см. раздел «Типовые проблемы» ниже.",
  },
  {
    id: "source",
    title: "Настройте источник",
    time: "~2 мин",
    lead: "Укажите, откуда забирать товары и как их читать.",
    actions: [
      "Админка → Инструменты → Wasee Import → вкладка «Источник»",
      "URL: https://www.waseegroup.com",
      "Селекторы уже предзаполнены: .item (карточка), table.specs (характеристики)",
      "Размер батча: 5 товаров за запрос, таймаут: 30 c",
    ],
    expect: "Кнопка «Проверить соединение» отвечает HTTP 200.",
  },
  {
    id: "mapping",
    title: "Сверьте маппинг полей",
    time: "~4 мин",
    lead: "9 правил уже настроены; проверьте, что они указывают на ваши мета-поля.",
    actions: [
      "Вкладка «Маппинг»: слева селектор OpenCart, справа поле WP",
      "title → post_title, таблица specs → wasee_specifications",
      "галерея → wasee_gallery, категория → термин product_category",
      "Сохраните — правила лежат в wp_options и переживают обновления",
    ],
    expect: "Все 9 правил без жёлтых пометок конфликта.",
  },
  {
    id: "test",
    title: "Сделайте тестовый импорт",
    time: "~3 мин",
    lead: "Импортируйте один товар и проверьте результат руками, до запуска всего каталога.",
    actions: [
      "Вкладка «Импорт» → «Один товар» → product_id = 281",
      "Дождитесь записи в логе «wp_insert_post … OK»",
      "Откройте Товары → найдите «2MP 4IN1 Camera Module»",
      "Проверьте: миниатюра загрузилась, характеристики в мета, категория привязана",
    ],
    command: "wp post list --post_type=product --fields=ID,post_title",
    expect: "Один товар с картинкой, 22 строками характеристик и категорией.",
    warn: "Не запускайте полный импорт, пока тестовый товар не выглядит правильно.",
  },
  {
    id: "full",
    title: "Запустите полный импорт",
    time: "~10–20 мин",
    lead: "Плагин прогонит все 29 товаров батчами по 5, логируя каждую операцию.",
    actions: [
      "Вкладка «Импорт» → «Полный импорт»",
      "Следите за прогресс-баром и живым логом",
      "При обрыве — кнопка «Доимпортировать пропущенные» (сверяется по legacy_id)",
      "По окончании лог покажет итог: постов, медиа, spec-строк",
    ],
    command: "wp wasee import --batch=5",
    expect: "29 товаров, ~36 медиафайлов, 0 ошибок в логе.",
  },
  {
    id: "after",
    title: "Пост-обработка",
    time: "~5 мин",
    lead: "Закройте последние штрихи, чтобы старые ссылки работали и витрина выглядела цельно.",
    actions: [
      "Сгенерируйте 301-редиректы: старый product_id → новый ЧПУ",
      "Настройки → Постоянные ссылки → Сохранить (обновить ЧПУ)",
      "Проверьте витрину на фронте: /products/ и страница товара",
      "При желании подключите ACF и синхронизируйте мета в группу «Product Data»",
    ],
    command: "wp wasee redirect:generate --301",
    expect: "Старые ссылки waseegroup.com ведут на новые страницы faseen.com.",
  },
];

const TROUBLE: { symptom: string; cause: string; fix: string }[] = [
  {
    symptom: "Пункт «Товары» не появился в админке",
    cause: "flush_rewrite_rules() не сработал при активации",
    fix: "Настройки → Постоянные ссылки → «Сохранить» (без изменений) либо деактивируйте и активируйте плагин заново",
  },
  {
    symptom: "Страницы товаров отдают 404",
    cause: "ЧПУ не обновились после регистрации CPT",
    fix: "Пересохраните постоянные ссылки; убедитесь, что структура ЧПУ не «Простые»",
  },
  {
    symptom: "Изображения не попадают в медиатеку",
    cause: "Нет прав на /wp-content/uploads или allow_url_fopen=Off",
    fix: "Права 755/775 на uploads; либо в настройках источника включите «transport: curl»",
  },
  {
    symptom: "Импорт обрывается на середине",
    cause: "PHP max_execution_time истёк на крупном батче",
    fix: "Уменьшите батч до 3 или запускайте через WP-CLI — у него нет веб-таймаута",
  },
  {
    symptom: "Повторный запуск создал дубли",
    cause: "Мета-поле wasee_legacy_id было очищено",
    fix: "Плагин сверяет по legacy_id: удалите дубли и не очищайте мета wasee_* до завершения миграции",
  },
  {
    symptom: "Характеристики не видны на странице товара",
    cause: "Тема Astra переопределила вывод single",
    fix: "Шаблон плагина single-product.php подключается автоматически; либо выведите мета хуком wasee_product_meta",
  },
];

const LS_KEY = "wasee-guide-done";

export default function GuideSection() {
  const [done, setDone] = useState<Set<string>>(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem(LS_KEY) ?? "[]") as string[]);
    } catch {
      return new Set();
    }
  });
  const [open, setOpen] = useState<string | null>(STEPS[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify([...done]));
    } catch {
      /* noop */
    }
  }, [done]);

  const pct = Math.round((done.size / STEPS.length) * 100);
  const allDone = done.size === STEPS.length;

  const toggleDone = (id: string) =>
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const copy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 1400);
    } catch {
      /* noop */
    }
  };

  return (
    <section id="guide" className="mx-auto max-w-[1360px] scroll-mt-24 px-4 py-20 md:px-8">
      <SectionHead
        index="06"
        kicker="пошаговый гайд"
        title="Как пользоваться плагином"
        note="Гайд рассчитан на faseen.com — голый WordPress + Astra. Всё делается в админке, кодить не нужно. Отмечайте выполненные шаги — прогресс сохраняется."
      />

      {/* progress */}
      <Reveal className="mb-10">
        <div className="flex flex-wrap items-center gap-5 border border-line bg-panel px-5 py-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-dim">
                готовность к миграции
              </span>
              <span className={`font-display text-2xl font-bold tabular-nums ${allDone ? "text-mint" : "text-amber"}`}>
                {done.size}/{STEPS.length}
              </span>
            </div>
            <div className="mt-2.5 h-2 border border-line2 bg-ink">
              <div
                className={`h-full transition-all duration-500 ${allDone ? "bg-mint" : "bg-amber"}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
          {allDone ? (
            <span className="tickpop inline-flex items-center gap-2 border border-mint/50 px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-mint">
              <IconCheck className="h-3.5 w-3.5" /> все шаги — можно запускать импорт
            </span>
          ) : (
            <button
              onClick={() => setDone(new Set())}
              className="inline-flex items-center gap-2 border border-line2 px-3 py-2 font-mono text-[10.5px] uppercase tracking-widest text-dim transition-colors hover:border-coral/60 hover:text-coral active:scale-95"
            >
              <IconReset className="h-3.5 w-3.5" /> сбросить
            </button>
          )}
        </div>
      </Reveal>

      {/* steps timeline */}
      <ol className="relative">
        <span className="absolute bottom-6 left-[19px] top-2 hidden w-px bg-line sm:block" />
        {STEPS.map((s, i) => {
          const isDone = done.has(s.id);
          const isOpen = open === s.id;
          return (
            <Reveal as="li" key={s.id} delay={(i % 3) * 60} className="relative pb-6">
              <div className="flex gap-4 sm:gap-6">
                {/* node */}
                <button
                  onClick={() => setOpen(isOpen ? null : s.id)}
                  aria-label={`Шаг ${i + 1}: ${s.title}`}
                  className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center border font-display text-sm font-bold transition-colors ${
                    isDone
                      ? "border-mint/60 bg-mint/10 text-mint"
                      : isOpen
                        ? "border-amber bg-amber/10 text-amber"
                        : "border-line2 bg-ink text-dim hover:border-amber/60 hover:text-amber"
                  }`}
                >
                  {isDone ? <IconCheck className="h-4 w-4" /> : String(i + 1).padStart(2, "0")}
                </button>

                {/* card */}
                <div
                  className={`min-w-0 flex-1 border transition-colors ${
                    isOpen ? "border-amber/50 bg-panel" : "border-line bg-panel/50 hover:border-line2"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-5">
                    <button
                      onClick={() => setOpen(isOpen ? null : s.id)}
                      className="min-w-0 flex-1 text-left font-display text-[16px] font-semibold leading-snug text-fog sm:text-lg"
                    >
                      {s.title}
                    </button>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-faint">{s.time}</span>
                    <button
                      onClick={() => toggleDone(s.id)}
                      className={`inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest transition-all active:scale-95 ${
                        isDone
                          ? "border-mint/60 bg-mint/10 text-mint"
                          : "border-line2 text-dim hover:border-mint/50 hover:text-mint"
                      }`}
                    >
                      <IconCheck className="h-3 w-3" />
                      {isDone ? "выполнено" : "отметить"}
                    </button>
                  </div>

                  {isOpen && (
                    <div className="fadein border-t border-line/70 px-4 py-4 sm:px-5">
                      <p className="text-sm leading-relaxed text-dim">{s.lead}</p>

                      <ul className="mt-4 space-y-2">
                        {s.actions.map((a) => (
                          <li key={a} className="flex gap-2.5 text-[13.5px] leading-relaxed text-dim">
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-amber/70" />
                            {a}
                          </li>
                        ))}
                      </ul>

                      {s.command && (
                        <div className="mt-4 flex items-center gap-3 border border-line bg-ink px-4 py-2.5">
                          <code className="min-w-0 flex-1 truncate font-mono text-[12px] text-cyan">
                            <span className="mr-2 text-amber">$</span>
                            {s.command}
                          </code>
                          <button
                            onClick={() => copy(s.id, s.command!)}
                            className={`inline-flex shrink-0 items-center gap-1.5 border px-2 py-1 font-mono text-[9.5px] uppercase tracking-widest transition-colors ${
                              copiedId === s.id
                                ? "border-mint/60 text-mint"
                                : "border-line2 text-dim hover:border-amber/60 hover:text-amber"
                            }`}
                          >
                            {copiedId === s.id ? <IconCheck className="h-3 w-3" /> : <IconCopy className="h-3 w-3" />}
                            {copiedId === s.id ? "ok" : "copy"}
                          </button>
                        </div>
                      )}

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="border border-line/70 px-3.5 py-2.5">
                          <div className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-mint">ожидаемый результат</div>
                          <p className="mt-1 text-[12.5px] leading-relaxed text-dim">{s.expect}</p>
                        </div>
                        {s.warn ? (
                          <div className="flex gap-2.5 border border-amber/40 bg-amber/[0.05] px-3.5 py-2.5">
                            <IconWarn className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                            <p className="text-[12.5px] leading-relaxed text-dim">{s.warn}</p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2.5 border border-line/70 px-3.5 py-2.5">
                            <TagChip tone="mint">безопасно</TagChip>
                            <p className="text-[12.5px] text-faint">шаг можно повторять без последствий</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </ol>

      {/* troubleshooting */}
      <Reveal className="mt-14">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-coral">
          <IconWarn className="h-4 w-4" />
          <span className="text-faint">06.1</span>
          <span className="h-px w-10 bg-coral/50" />
          <span>типовые проблемы</span>
        </div>
      </Reveal>
      <Reveal delay={80} className="mt-6">
        <div className="overflow-x-auto border border-line bg-panel/60">
          <table className="w-full min-w-[760px] text-left text-[13.5px]">
            <thead className="bg-ink2">
              <tr className="font-mono text-[10px] uppercase tracking-widest text-faint">
                <th className="px-5 py-3 font-medium">симптом</th>
                <th className="px-4 py-3 font-medium">причина</th>
                <th className="px-4 py-3 font-medium">решение</th>
              </tr>
            </thead>
            <tbody>
              {TROUBLE.map((t, i) => (
                <tr key={t.symptom} className={`border-t border-line/60 transition-colors hover:bg-panel2/50 ${i % 2 ? "bg-ink/20" : ""}`}>
                  <td className="px-5 py-3 font-medium text-fog">{t.symptom}</td>
                  <td className="px-4 py-3 text-dim">{t.cause}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block border-l-2 border-mint/60 pl-3 text-dim">{t.fix}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}
