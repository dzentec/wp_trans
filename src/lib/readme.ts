/* ============================================================
   README плагина wasee-importer — единый источник правды.
   Raw-текст (markdown / readme.txt) генерируется из блоков.
   ============================================================ */

export type ReadmeBlock =
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "code"; lang: string; code: string }
  | { kind: "table"; head: string[]; rows: string[][] };

export type ReadmeSection = { id: string; title: string; blocks: ReadmeBlock[] };

export const README_LEAD =
  "Миграция товаров waseegroup.com (OpenCart) → faseen.com (голый WordPress + тема Astra). " +
  "Плагин самодостаточен: при активации регистрирует CPT, таксономию, мета-поля и шаблоны. ACF не обязателен.";

export const README_SECTIONS: ReadmeSection[] = [
  {
    id: "overview",
    title: "Обзор",
    blocks: [
      {
        kind: "p",
        text: "Разовый плагин переноса каталога промышленных камер-модулей с витрины OpenCart 3.0.3.8 (waseegroup.com, 29 товаров в 10 категориях) на faseen.com. Целевой сайт — чистый WordPress с темой Astra без плагинов и настроенных структур: всё необходимое wasee-importer создаёт сам при активации.",
      },
      {
        kind: "list",
        items: [
          "Парсер OpenCart: категории `path=60_*`, товары `?route=product/product&product_id=NNN`",
          "Извлекает название, галерею (блоки `.item__galleryLeft` + `.item__galleryRight`), описание `.item__galleryText` и таблицу характеристик",
          "Скачивает изображения в медиатеку через `media_sideload_image` с повтором при HTTP 404",
          "Характеристики — в мета-поле `wasee_specifications` (или в repeater ACF, если ACF установлен)",
          "Батчи по 5 товаров через admin-ajax, возобновляемый импорт, журнал в `wp_wasee_import_log`",
          "Генератор 301-редиректов со старых URL и шаблоны витрины под Astra",
        ],
      },
    ],
  },
  {
    id: "requirements",
    title: "Требования",
    blocks: [
      {
        kind: "table",
        head: ["Компонент", "Минимум", "Комментарий"],
        rows: [
          ["PHP", "7.2", "рекомендуется 8.1"],
          ["WordPress", "5.0", "тестировалось на 6.5"],
          ["Тема", "Astra (любая версия)", "другие темы — только ручные шаблоны"],
          ["Расширения PHP", "cURL, DOMDocument", "обычно включены по умолчанию"],
          ["Память", "256M", "при нехватке — уменьшить батч"],
          ["ACF / ACF Pro", "не требуется", "опциональный режим синхронизации"],
        ],
      },
    ],
  },
  {
    id: "install",
    title: "Установка",
    blocks: [
      { kind: "p", text: "Вариант 1 — через админку: «Плагины → Добавить новый → Загрузить плагин», выбрать `wasee-importer-1.4.2.zip`, нажать «Установить» и «Активировать»." },
      { kind: "p", text: "Вариант 2 — через WP-CLI:" },
      {
        kind: "code",
        lang: "bash",
        code: "wp plugin install wasee-importer-1.4.2.zip --activate\n# или вручную:\n# распаковать в /wp-content/plugins/wasee-importer/ и:\nwp plugin activate wasee-importer",
      },
      {
        kind: "p",
        text: "При активации плагин: регистрирует CPT `product` и таксономию `product_category`, создаёт таблицу журнала `wp_wasee_import_log`, делает `flush_rewrite_rules()` и подключает шаблоны. В админке появится пункт «Инструменты → Wasee Import».",
      },
    ],
  },
  {
    id: "structures",
    title: "Что создаёт плагин",
    blocks: [
      {
        kind: "table",
        head: ["Структура", "Действие"],
        rows: [
          ["CPT `product`", "register_post_type: has_archive, supports — title, editor, thumbnail, custom-fields"],
          ["Таксономия `product_category`", "иерархическая; 10 терминов создаются при первом импорте"],
          ["Мета-ключи", "wasee_product_code, wasee_legacy_product_id, wasee_legacy_url, wasee_specifications, wasee_gallery"],
          ["ЧПУ", "архив `/products/`, товар `/product/%slug%/` + flush_rewrite_rules()"],
          ["Меню «Wasee Primary»", "зеркало меню оригинала в локации primary темы Astra: Home · Products (10 потомков) · About Us · Contact Us"],
          ["Служебные страницы", "Home (front_page), About Us, Contact Us + форма [wasee_contact]; cart/checkout/account → 301 на главную"],
          ["Таблица журнала", "wp_wasee_import_log (время, уровень, сообщение)"],
          ["Опции", "wasee_source_url, wasee_selectors, wasee_batch_size, wasee_field_maps, wasee_progress"],
        ],
      },
    ],
  },
  {
    id: "usage",
    title: "Использование (админка)",
    blocks: [
      {
        kind: "list",
        items: [
          "Откройте «Инструменты → Wasee Import»",
          "Вкладка «Источник»: URL `https://www.waseegroup.com`, селекторы уже подставлены под OpenCart-разметку, размер батча — 5",
          "Вкладка «Маппинг»: сверьте 9 правил «селектор → поле WP»; правки сохраняются в `wp_options`",
          "Нажмите «Тест: 1 товар» — импортируется `product_id=281`; проверьте пост, картинку в медиатеке и характеристики",
          "Нажмите «Запустить импорт» — батчи идут по AJAX, прогресс и лог обновляются в реальном времени",
          "При обрыве — кнопка «Доимпортировать пропущенные»: сверяет `wasee_legacy_product_id` с уже созданными постами",
        ],
      },
    ],
  },
  {
    id: "cli",
    title: "WP-CLI",
    blocks: [
      {
        kind: "code",
        lang: "bash",
        code: "wp wasee setup --register-cpt          # перерегистрировать структуры + flush\nwp wasee scout --format=json           # отчёт по источнику: категории, товары, медиа\nwp wasee import --batch=5 --dry-run    # прогон без записи в БД\nwp wasee import --batch=5              # полный импорт\nwp wasee import --resume-missing       # доимпортировать пропущенные\nwp wasee redirect:generate --301       # правила 301 из legacy_url\nwp wasee log --tail=50                 # последние 50 строк журнала",
      },
    ],
  },
  {
    id: "mapping",
    title: "Маппинг полей",
    blocks: [
      {
        kind: "table",
        head: ["Источник (OpenCart)", "Приёмник (WP)"],
        rows: [
          [".item h1", "post_title"],
          [".item__galleryLeft img@src", "_thumbnail_id (media_sideload)"],
          [".item__galleryRight img@src[]", "wasee_gallery (ids)"],
          [".item__galleryText", "post_content + post_excerpt"],
          ["table.specs tr td:0 / td:1", "wasee_specifications (JSON-массив пар)"],
          ["category path=60_XXX", "термин product_category"],
          ["URL product_id", "wasee_legacy_product_id"],
          ["URL страницы", "wasee_legacy_url"],
        ],
      },
      {
        kind: "p",
        text: "Если на сайте обнаружен ACF (`function_exists('acf_add_local_field_group')`), плагин собирает группу «Product Data» и дополнительно пишет repeater `specifications` и gallery-поле; фронтенд-шаблоны читают оба источника.",
      },
    ],
  },
  {
    id: "categories",
    title: "Категории (10 шт.)",
    blocks: [
      {
        kind: "table",
        head: ["path", "термин", "slug"],
        rows: [
          ["60_112", "4in1 Hybrid Camera modules", "4in1-hybrid-modules"],
          ["60_138", "Board HD Lens", "board-hd-lens"],
          ["60_131", "Embedded POE NVR Board", "embedded-poe-nvr"],
          ["60_61", "Featured Products", "featured-products"],
          ["60_104", "IP Camera Modules", "ip-camera-modules"],
          ["60_122", "NVR Boards", "nvr-boards"],
          ["60_116", "Panoramic VR Camera Module", "panoramic-vr-modules"],
          ["60_113", "WiFi AP Hotspot Camera Module", "wifi-ap-camera-modules"],
          ["60_119", "WiFi Kit NVR Board", "wifi-kit-nvr"],
          ["60_66", "Assembly Accessories", "assembly-accessories"],
        ],
      },
    ],
  },
  {
    id: "redirects",
    title: "301-редиректы",
    blocks: [
      {
        kind: "p",
        text: "После импорта выполните `wp wasee redirect:generate --301` — плагин построит пары `?route=product/product&product_id=NNN → /product/<slug>` из мета-поля `wasee_legacy_url` и положит правила в опцию `wasee_redirects` (срабатывают на `template_redirect`). Альтернатива — выгрузка в `.htaccess`.",
      },
    ],
  },
  {
    id: "astra",
    title: "Совместимость с Astra",
    blocks: [
      {
        kind: "list",
        items: [
          "Шаблоны `templates/archive-product.php` и `single-product.php` используют хуки `astra_content_loop`, `astra_entry_before/after` — вёрстка наследует контейнер и типографику темы",
          "Сетка каталога — на нативном `columns` Customizer'а Astra, без своих стилей в ленте",
          "Child-тема не обязательна: шаблоны плагин подменяет через `template_include`",
          "Дизайн карточки товара — оригинальный (спецификации таблицей, липкая галерея), клонирования faseen.com нет",
        ],
      },
    ],
  },
  {
    id: "faq",
    title: "FAQ / типовые проблемы",
    blocks: [
      {
        kind: "table",
        head: ["Симптом", "Решение"],
        rows: [
          ["Товары есть в админке, но 404 на фронте", "Настройки → Постоянные ссылки → «Сохранить» (flush правил)"],
          ["Нет пункта «Товары» в меню", "Перезагрузить страницу; права роли (manage_options)"],
          ["Картинки не скачиваются", "Источник отдаёт кэш-миниатюры; парсер автоматически идёт за оригиналом в /image/data/…"],
          ["Allowed memory size exhausted", "Батч = 2 и `define('WP_MEMORY_LIMIT','256M')` в wp-config.php"],
          ["Нужно переимпортировать", "Режим «замена» ищет пост по wasee_legacy_product_id и обновляет, а не дублирует"],
          ["Сколько идёт полный импорт", "≈ 2–3 минуты на 29 товаров при батче 5"],
        ],
      },
    ],
  },
  {
    id: "changelog",
    title: "Changelog",
    blocks: [
      {
        kind: "list",
        items: [
          "**1.4.2** — режим мета-полей без ACF; регистрация CPT/таксономии при активации; шаблоны Astra; гайд по сборке ZIP",
          "**1.4.0** — батчи по 5 через AJAX, возобновляемый импорт, повторы при 404 медиа",
          "**1.3.0** — генератор 301-редиректов, таблица журнала `wp_wasee_import_log`",
          "**1.2.0** — админ-страница с живым логом и правкой маппинга",
          "**1.0.0** — первый релиз: парсер OpenCart + базовый импорт",
        ],
      },
      { kind: "p", text: "Лицензия: GPL-2.0-or-later. Автор: команда миграции wasee→faseen." },
    ],
  },
];

/* ---------- генерация raw-текста ---------- */

export function buildReadmeRaw(): string {
  const out: string[] = [];
  out.push("# wasee-importer");
  out.push("");
  out.push(`> ${README_LEAD}`);
  out.push("");
  out.push("**Версия:** 1.4.2 · **Тестировалось:** WordPress 6.5 · **Лицензия:** GPL-2.0-or-later");
  out.push("");
  for (const s of README_SECTIONS) {
    out.push(`## ${s.title}`);
    out.push("");
    for (const b of s.blocks) {
      switch (b.kind) {
        case "p":
          out.push(b.text, "");
          break;
        case "list":
          b.items.forEach((i) => out.push(`- ${i}`));
          out.push("");
          break;
        case "code":
          out.push("```" + b.lang, b.code, "```", "");
          break;
        case "table":
          out.push(`| ${b.head.join(" | ")} |`);
          out.push(`| ${b.head.map(() => "---").join(" | ")} |`);
          b.rows.forEach((r) => out.push(`| ${r.join(" | ")} |`));
          out.push("");
          break;
      }
    }
  }
  return out.join("\n");
}
