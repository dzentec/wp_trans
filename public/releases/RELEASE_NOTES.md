# wasee-importer 1.4.2 — release notes

Миграция товаров OpenCart (waseegroup.com) → голый WordPress + Astra (faseen.com).

## Состав архива `wasee-importer-1.4.2.zip`

```
wasee-importer/
├── wasee-importer.php             бутстрап, активация, admin-ajax
├── uninstall.php                  удаление таблиц и опций
├── includes/
│   ├── class-wasee-setup.php      CPT «product», таксономия, мета-ключи, шаблоны Astra
│   ├── class-wasee-parser.php     cURL + DOMDocument/XPath (блоки .item)
│   ├── class-wasee-mapper.php     9 правил маппинга, мета-поля wasee_*
│   ├── class-wasee-importer.php   wp_insert_post + media_sideload_image, батчи 5/req
│   └── class-wasee-log.php        журнал в wp_wasee_import_log
├── admin/
│   ├── class-wasee-admin.php      экран «Инструменты → Wasee Import»
│   └── views/page-import.php      прогресс, живой лог, тестовый импорт
├── assets/admin.css
├── templates/
│   ├── single-product.php         спецификации + галерея (дизайн — не клон)
│   └── archive-product.php        сетка каталога с фильтрами
└── readme.txt                     полная документация (12 разделов)
```

## Установка

1. WP-админка → Плагины → «Добавить новый» → «Загрузить плагин» → выбрать zip.
2. Активировать: плагин сам зарегистрирует CPT `product`, таксономию `product_category` и мета-ключи `wasee_*`.
3. Инструменты → Wasee Import → тестовый импорт (product_id=281) → полный импорт.

Или WP-CLI:

```sh
wp plugin install wasee-importer-1.4.2.zip --activate
wp wasee setup --register-cpt
wp wasee import --batch=5
```

## Контрольная сумма

Архив детерминирован: одинаковые исходники → одинаковые байты. CRC32 и размер
текущей сборки выводятся в консоли миграции (раздел «README и релиз», карточка ZIP) —
сравните после скачивания.

## Требования

- PHP 7.2+, WordPress 5.0+
- Тема Astra (любая), ACF не обязателен (фолбэк на мета-поля)
- allow_url_fopen или ext-curl на сервере

## Changelog

- 1.4.2 — цель «голый WP + Astra»: регистрация CPT/таксономии при активации, фолбэк мета-полей без ACF, шаблоны single/archive
- 1.3.0 — повторная загрузка медиа при 404, доимпорт пропущенных
- 1.2.0 — журнал wp_wasee_import_log, генератор 301-редиректов
- 1.0.0 — первый импорт: парсер .item, 10 категорий path=60_*
