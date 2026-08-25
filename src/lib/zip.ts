import JSZip from "jszip";
import { buildReadmeRaw } from "./readme";

export const ZIP_NAME = "wasee-importer-1.4.2.zip";

/* ---------- дерево архива (для отображения) ---------- */

export const ZIP_TREE: { path: string; note: string; size: string }[] = [
  { path: "wasee-importer/wasee-importer.php", note: "бутстрап, хуки, активация", size: "5.1 KB" },
  { path: "wasee-importer/uninstall.php", note: "очистка при удалении", size: "0.6 KB" },
  { path: "wasee-importer/index.php", note: "silence is golden", size: "0.1 KB" },
  { path: "wasee-importer/readme.txt", note: "документация — вставляется автоматически", size: "9.8 KB" },
  { path: "wasee-importer/includes/class-wasee-setup.php", note: "CPT, таксономия, таблица лога", size: "4.4 KB" },
  { path: "wasee-importer/includes/class-wasee-parser.php", note: "cURL + XPath по OpenCart", size: "8.9 KB" },
  { path: "wasee-importer/includes/class-wasee-mapper.php", note: "селекторы → пост + мета", size: "5.2 KB" },
  { path: "wasee-importer/includes/class-wasee-importer.php", note: "запись, медиа, термины", size: "10.6 KB" },
  { path: "wasee-importer/includes/class-wasee-log.php", note: "журнал wp_wasee_import_log", size: "2.9 KB" },
  { path: "wasee-importer/admin/class-wasee-admin.php", note: "меню, AJAX-хендлеры", size: "7.1 KB" },
  { path: "wasee-importer/admin/views/page-import.php", note: "вкладки, живой лог", size: "8.3 KB" },
  { path: "wasee-importer/templates/archive-product.php", note: "витрина под Astra", size: "2.2 KB" },
  { path: "wasee-importer/templates/single-product.php", note: "карточка товара под Astra", size: "3.4 KB" },
  { path: "wasee-importer/assets/admin.css", note: "стили админ-страницы", size: "3.4 KB" },
  { path: "wasee-importer/assets/admin.js", note: "AJAX-батчи, автопрокрутка лога", size: "5.7 KB" },
];

export const ZIP_EXCLUDED: { path: string; reason: string }[] = [
  { path: ".git/", reason: "система контроля версий" },
  { path: "tests/", reason: "PHPUnit — нужен только при разработке" },
  { path: "composer.json · package.json", reason: "dev-зависимости" },
  { path: ".DS_Store · *.map", reason: "мусорные файлы" },
];

export const ZIP_CHECKS: { id: string; text: string }[] = [
  { id: "ver", text: "Версия в шапке плагина совпадает с именем архива (1.4.2)" },
  { id: "secrets", text: "В коде нет логинов, паролей и приватных ключей" },
  { id: "folder", text: "Все файлы внутри папки wasee-importer/ (в корне архива — только она)" },
  { id: "i18n", text: "Textdomain wasee-importer объявлен в шапке, load_plugin_textdomain подключён" },
];

/* ---------- исходники плагина ---------- */

const SRC: Record<string, string> = {
  "wasee-importer.php": `<?php
/**
 * Plugin Name:       Wasee Importer
 * Plugin URI:        https://faseen.com
 * Description:       Миграция товаров waseegroup.com (OpenCart) на голый WordPress + Astra. Сам регистрирует CPT, таксономию и мета-поля. ACF не обязателен.
 * Version:           1.4.2
 * Requires at least: 5.0
 * Requires PHP:      7.2
 * Author:            wasee→faseen migration team
 * License:           GPL-2.0-or-later
 * Text Domain:       wasee-importer
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

define( 'WASEE_VERSION', '1.4.2' );
define( 'WASEE_PATH', plugin_dir_path( __FILE__ ) );
define( 'WASEE_URL', plugin_dir_url( __FILE__ ) );

require_once WASEE_PATH . 'includes/class-wasee-log.php';
require_once WASEE_PATH . 'includes/class-wasee-setup.php';
require_once WASEE_PATH . 'includes/class-wasee-parser.php';
require_once WASEE_PATH . 'includes/class-wasee-mapper.php';
require_once WASEE_PATH . 'includes/class-wasee-importer.php';

register_activation_hook( __FILE__, array( 'Wasee_Setup', 'activate' ) );
register_deactivation_hook( __FILE__, array( 'Wasee_Setup', 'deactivate' ) );

add_action( 'init', array( 'Wasee_Setup', 'register' ) );
add_action( 'admin_menu', array( 'Wasee_Admin', 'menu' ) );
add_action( 'admin_enqueue_scripts', array( 'Wasee_Admin', 'assets' ) );
add_action( 'wp_ajax_wasee_batch', array( 'Wasee_Admin', 'ajax_batch' ) );
add_action( 'wp_ajax_wasee_status', array( 'Wasee_Admin', 'ajax_status' ) );
add_filter( 'template_include', array( 'Wasee_Setup', 'templates' ) );

require_once WASEE_PATH . 'admin/class-wasee-admin.php';

if ( defined( 'WP_CLI' ) && WP_CLI ) {
    require_once WASEE_PATH . 'includes/class-wasee-cli.php';
}
`,

  "uninstall.php": `<?php
/** Очистка при удалении плагина. */
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) { exit; }

global $wpdb;
$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->prefix}wasee_import_log" );

foreach ( array( 'wasee_source_url', 'wasee_selectors', 'wasee_batch_size', 'wasee_field_maps', 'wasee_progress', 'wasee_redirects' ) as $opt ) {
    delete_option( $opt );
}
// Посты и медиа намеренно сохраняем: данные важнее плагина.
`,

  "index.php": `<?php // Silence is golden.
`,

  "includes/class-wasee-setup.php": `<?php
/** Регистрация CPT, таксономии, таблицы журнала, шаблонов. */
class Wasee_Setup {

    public static function register() {
        register_post_type( 'product', array(
            'labels'       => array( 'name' => __( 'Товары', 'wasee-importer' ), 'singular_name' => __( 'Товар', 'wasee-importer' ) ),
            'public'       => true,
            'has_archive'  => 'products',
            'menu_icon'    => 'dashicons-products',
            'show_in_rest' => true,
            'supports'     => array( 'title', 'editor', 'thumbnail', 'custom-fields', 'excerpt' ),
            'rewrite'      => array( 'slug' => 'product' ),
        ) );

        register_taxonomy( 'product_category', 'product', array(
            'labels'      => array( 'name' => __( 'Категории товаров', 'wasee-importer' ) ),
            'hierarchical' => true,
            'show_in_rest' => true,
            'rewrite'     => array( 'slug' => 'product-category' ),
        ) );
    }

    public static function activate() {
        self::register();
        Wasee_Log::ensure_table();
        flush_rewrite_rules();
        update_option( 'wasee_source_url', 'https://www.waseegroup.com' );
        update_option( 'wasee_batch_size', 5 );
    }

    public static function deactivate() {
        flush_rewrite_rules();
    }

    /** Подменяем шаблоны CPT на собственные (работает без child-темы Astra). */
    public static function templates( $template ) {
        if ( is_singular( 'product' ) && file_exists( WASEE_PATH . 'templates/single-product.php' ) ) {
            return WASEE_PATH . 'templates/single-product.php';
        }
        if ( ( is_post_type_archive( 'product' ) || is_tax( 'product_category' ) )
            && file_exists( WASEE_PATH . 'templates/archive-product.php' ) ) {
            return WASEE_PATH . 'templates/archive-product.php';
        }
        return $template;
    }
}
`,

  "includes/class-wasee-parser.php": `<?php
/** Парсер OpenCart: категории path=60_*, товары по product_id. */
class Wasee_Parser {

    private $base;
    private $log;

    public function __construct( $base_url ) {
        $this->base = rtrim( $base_url, '/' );
        $this->log  = new Wasee_Log();
    }

    private function fetch( $url, $retries = 2 ) {
        for ( $i = 0; $i <= $retries; $i++ ) {
            $res = wp_remote_get( $url, array( 'timeout' => 20, 'redirection' => 5 ) );
            if ( ! is_wp_error( $res ) && wp_remote_retrieve_response_code( $res ) === 200 ) {
                return wp_remote_retrieve_body( $res );
            }
            usleep( 300000 );
        }
        return false;
    }

    /** Список product_id для категории вида path=60_112. */
    public function product_ids( $path ) {
        $html = $this->fetch( $this->base . '/index.php?route=product/category&path=' . $path );
        if ( ! $html ) { return array(); }
        $doc = new DOMDocument();
        @$doc->loadHTML( $html );
        $xpath = new DOMXPath( $doc );
        $ids   = array();
        foreach ( $xpath->query( "//a[contains(@href,'product_id=')]" ) as $a ) {
            if ( preg_match( '/product_id=(\\d+)/', $a->getAttribute( 'href' ), $m ) ) {
                $ids[] = (int) $m[1];
            }
        }
        return array_values( array_unique( $ids ) );
    }

    /** Полные данные товара: title, images, description, specs. */
    public function product( $product_id ) {
        $url  = $this->base . '/index.php?route=product/product&product_id=' . $product_id;
        $html = $this->fetch( $url );
        if ( ! $html ) { return false; }

        $doc = new DOMDocument();
        @$doc->loadHTML( $html );
        $x = new DOMXPath( $doc );
        $q = function ( $expr ) use ( $x ) {
            $n = $x->query( $expr );
            return $n->length ? $n->item( 0 ) : null;
        };

        $images = array();
        foreach ( array( "//div[contains(@class,'item__galleryLeft')]//img", "//div[contains(@class,'item__galleryRight')]//img" ) as $expr ) {
            foreach ( $x->query( $expr ) as $img ) {
                $src = $img->getAttribute( 'src' );
                if ( $src ) { $images[] = $this->absolutize( $src ); }
            }
        }

        $specs = array();
        foreach ( $x->query( "//div[contains(@class,'item')]//table//tr" ) as $tr ) {
            $tds = $x->query( './td', $tr );
            if ( $tds->length >= 2 ) {
                $specs[] = array(
                    'spec_name'  => trim( $tds->item( 0 )->textContent ),
                    'spec_value' => trim( $tds->item( 1 )->textContent ),
                );
            }
        }

        $title = $q( "//div[contains(@class,'item')]//h1" );
        $desc  = $q( "//div[contains(@class,'item__galleryText')]" );

        return array(
            'product_id'  => $product_id,
            'source_url'  => $url,
            'title'       => $title ? trim( $title->textContent ) : '',
            'description' => $desc ? trim( $desc->textContent ) : '',
            'images'      => $images,
            'specs'       => $specs,
        );
    }

    private function absolutize( $src ) {
        return strpos( $src, 'http' ) === 0 ? $src : $this->base . '/' . ltrim( $src, '/' );
    }
}
`,

  "includes/class-wasee-mapper.php": `<?php
/** Маппинг данных парсера в аргументы wp_insert_post + мета-поля. */
class Wasee_Mapper {

    public static function to_postarr( $data, $term_slug ) {
        return array(
            'post_type'    => 'product',
            'post_title'   => sanitize_text_field( $data['title'] ),
            'post_content' => wp_kses_post( $data['description'] ),
            'post_excerpt' => wp_trim_words( wp_strip_all_tags( $data['description'] ), 28 ),
            'post_status'  => 'publish',
            'meta_input'   => array(
                'wasee_legacy_product_id' => (int) $data['product_id'],
                'wasee_legacy_url'        => esc_url_raw( $data['source_url'] ),
                'wasee_specifications'    => wp_json_encode( $data['specs'], JSON_UNESCAPED_UNICODE ),
            ),
        );
    }

    public static function slugify( $title ) {
        $slug = sanitize_title( $title );
        return $slug !== '' ? $slug : 'product-' . md5( $title );
    }

    /** Если установлен ACF — продублируем спеки в repeater. */
    public static function maybe_sync_acf( $post_id, $specs ) {
        if ( ! function_exists( 'update_field' ) ) { return; }
        update_field( 'specifications', $specs, $post_id );
    }
}
`,

  "includes/class-wasee-importer.php": `<?php
/** Импорт: посты, медиа (sideload), термины, дедупликация по legacy_id. */
class Wasee_Importer {

    private $parser;
    private $log;

    public function __construct( $source_url ) {
        $this->parser = new Wasee_Parser( $source_url );
        $this->log    = new Wasee_Log();
    }

    /** Импорт одного товара. Режим 'replace' обновляет существующий пост. */
    public function import_one( $product_id, $term_slug, $mode = 'skip' ) {
        $data = $this->parser->product( $product_id );
        if ( ! $data ) {
            $this->log->add( 'err', "product_id={$product_id}: не удалось получить страницу" );
            return false;
        }

        $existing = $this->find_by_legacy_id( $product_id );
        if ( $existing && $mode === 'skip' ) {
            $this->log->add( 'warn', "product_id={$product_id}: уже импортирован (post {$existing}), пропуск" );
            return $existing;
        }

        $postarr = Wasee_Mapper::to_postarr( $data, $term_slug );
        $post_id = $existing ? wp_update_post( array_merge( $postarr, array( 'ID' => $existing ) ), true )
                             : wp_insert_post( $postarr, true );
        if ( is_wp_error( $post_id ) ) {
            $this->log->add( 'err', "product_id={$product_id}: " . $post_id->get_error_message() );
            return false;
        }

        // Термин категории.
        $term = term_exists( $term_slug, 'product_category' );
        if ( ! $term ) { $term = wp_insert_term( $term_slug, 'product_category', array( 'slug' => $term_slug ) ); }
        if ( ! is_wp_error( $term ) ) { wp_set_object_terms( $post_id, (int) $term['term_id'], 'product_category' ); }

        // Медиа: первое изображение — миниатюра, остальные — галерея.
        require_once ABSPATH . 'wp-admin/includes/media.php';
        require_once ABSPATH . 'wp-admin/includes/file.php';
        require_once ABSPATH . 'wp-admin/includes/image.php';

        $gallery = array();
        foreach ( $data['images'] as $i => $url ) {
            $att_id = media_sideload_image( $url, $post_id, null, 'id' );
            if ( is_wp_error( $att_id ) ) {
                $this->log->add( 'warn', "product_id={$product_id}: sideload не удался ({$url})" );
                continue;
            }
            if ( $i === 0 ) { set_post_thumbnail( $post_id, $att_id ); }
            $gallery[] = $att_id;
        }
        update_post_meta( $post_id, 'wasee_gallery', $gallery );

        Wasee_Mapper::maybe_sync_acf( $post_id, $data['specs'] );
        $this->log->add( 'ok', "product_id={$product_id} -> post {$post_id} ({$data['title']})" );
        return $post_id;
    }

    private function find_by_legacy_id( $product_id ) {
        $q = new WP_Query( array(
            'post_type'      => 'product',
            'posts_per_page' => 1,
            'fields'         => 'ids',
            'meta_key'       => 'wasee_legacy_product_id',
            'meta_value'     => (int) $product_id,
        ) );
        return $q->posts ? (int) $q->posts[0] : 0;
    }
}
`,

  "includes/class-wasee-log.php": `<?php
/** Журнал операций в собственной таблице. */
class Wasee_Log {

    public static function ensure_table() {
        global $wpdb;
        $table   = $wpdb->prefix . 'wasee_import_log';
        $charset = $wpdb->get_charset_collate();
        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta( "CREATE TABLE {$table} (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            level VARCHAR(8) NOT NULL,
            message TEXT NOT NULL,
            PRIMARY KEY (id)
        ) {$charset};" );
    }

    public function add( $level, $message ) {
        global $wpdb;
        $wpdb->insert( $wpdb->prefix . 'wasee_import_log', array(
            'level'   => $level,
            'message' => $message,
        ) );
    }

    public static function tail( $limit = 50 ) {
        global $wpdb;
        return $wpdb->get_results( $wpdb->prepare(
            "SELECT level, message, created_at FROM {$wpdb->prefix}wasee_import_log ORDER BY id DESC LIMIT %d",
            $limit
        ) );
    }
}
`,

  "admin/class-wasee-admin.php": `<?php
/** Админ-страница и AJAX-батчи. */
class Wasee_Admin {

    public static function menu() {
        add_management_page(
            __( 'Wasee Import', 'wasee-importer' ),
            __( 'Wasee Import', 'wasee-importer' ),
            'manage_options',
            'wasee-import',
            array( __CLASS__, 'render' )
        );
    }

    public static function render() {
        require WASEE_PATH . 'admin/views/page-import.php';
    }

    public static function assets( $hook ) {
        if ( $hook !== 'tools_page_wasee-import' ) { return; }
        wp_enqueue_style( 'wasee-admin', WASEE_URL . 'assets/admin.css', array(), WASEE_VERSION );
        wp_enqueue_script( 'wasee-admin', WASEE_URL . 'assets/admin.js', array( 'jquery' ), WASEE_VERSION, true );
        wp_localize_script( 'wasee-admin', 'WaseeAdmin', array(
            'ajax'  => admin_url( 'admin-ajax.php' ),
            'nonce' => wp_create_nonce( 'wasee' ),
            'batch' => (int) get_option( 'wasee_batch_size', 5 ),
        ) );
    }

    /** Один батч: массив product_id + term_slug, режим skip|replace. */
    public static function ajax_batch() {
        check_ajax_referer( 'wasee', 'nonce' );
        $ids  = array_map( 'intval', (array) $_POST['ids'] );
        $term = sanitize_title( wp_unslash( $_POST['term'] ?? 'featured-products' ) );
        $mode = ( $_POST['mode'] ?? 'skip' ) === 'replace' ? 'replace' : 'skip';

        $importer = new Wasee_Importer( get_option( 'wasee_source_url' ) );
        $done = array();
        foreach ( $ids as $pid ) {
            $post_id = $importer->import_one( $pid, $term, $mode );
            if ( $post_id ) { $done[] = array( 'pid' => $pid, 'post' => $post_id ); }
        }
        wp_send_json_success( array( 'done' => $done, 'log' => Wasee_Log::tail( 20 ) ) );
    }

    public static function ajax_status() {
        check_ajax_referer( 'wasee', 'nonce' );
        wp_send_json_success( array( 'log' => Wasee_Log::tail( 100 ) ) );
    }
}
`,

  "admin/views/page-import.php": `<?php if ( ! defined( 'ABSPATH' ) ) { exit; } ?>
<div class="wrap wasee-wrap">
    <h1>Wasee Import <span class="wasee-ver">v<?php echo esc_html( WASEE_VERSION ); ?></span></h1>
    <p class="wasee-sub">waseegroup.com (OpenCart) → faseen.com (WordPress + Astra)</p>

    <nav class="wasee-tabs">
        <button class="wasee-tab active" data-tab="run">Импорт</button>
        <button class="wasee-tab" data-tab="map">Маппинг</button>
        <button class="wasee-tab" data-tab="log">Журнал</button>
    </nav>

    <section id="wasee-tab-run" class="wasee-panel active">
        <div class="wasee-bar">
            <label>Источник: <input id="wasee-source" value="<?php echo esc_attr( get_option( 'wasee_source_url' ) ); ?>" /></label>
            <label>Батч: <input id="wasee-batch" type="number" min="1" max="10" value="<?php echo esc_attr( get_option( 'wasee_batch_size', 5 ) ); ?>" /></label>
            <select id="wasee-mode">
                <option value="skip">Пропускать существующие</option>
                <option value="replace">Заменять существующие</option>
            </select>
        </div>
        <div class="wasee-progress"><i id="wasee-progress-fill"></i></div>
        <div class="wasee-actions">
            <button id="wasee-test" class="button">Тест: 1 товар (id=281)</button>
            <button id="wasee-run" class="button button-primary">Запустить импорт</button>
            <button id="wasee-resume" class="button">Доимпортировать пропущенные</button>
        </div>
        <pre id="wasee-log" class="wasee-log" aria-live="polite"></pre>
    </section>

    <section id="wasee-tab-map" class="wasee-panel">
        <p>Правила маппинга хранятся в опции <code>wasee_field_maps</code>. Правки переживают обновления плагина.</p>
        <div id="wasee-map-rows"></div>
    </section>

    <section id="wasee-tab-log" class="wasee-panel">
        <button id="wasee-log-refresh" class="button">Обновить</button>
        <pre id="wasee-log-full" class="wasee-log"></pre>
    </section>
</div>
`,

  "templates/archive-product.php": `<?php
/** Архив товаров под Astra: используем хуки темы, сетка — на CSS темы. */
get_header(); ?>
<div id="primary" class="content-area">
    <main id="main" class="site-main">
        <?php astra_content_loop(); ?>
        <section class="wasee-grid">
            <?php while ( have_posts() ) : the_post(); ?>
                <article class="wasee-card">
                    <a href="<?php the_permalink(); ?>">
                        <?php the_post_thumbnail( 'medium_large' ); ?>
                        <h2><?php the_title(); ?></h2>
                    </a>
                    <code><?php echo esc_html( get_post_meta( get_the_ID(), 'wasee_product_code', true ) ); ?></code>
                </article>
            <?php endwhile; ?>
        </section>
        <?php the_posts_pagination(); ?>
    </main>
</div>
<?php get_footer(); ?>
`,

  "templates/single-product.php": `<?php
/** Карточка товара: липкая галерея + таблица спецификаций. */
get_header(); ?>
<div id="primary" class="content-area">
    <main id="main" class="site-main">
        <?php while ( have_posts() ) : the_post();
            $specs = json_decode( get_post_meta( get_the_ID(), 'wasee_specifications', true ), true );
            $gallery = get_post_meta( get_the_ID(), 'wasee_gallery', true );
        ?>
        <article class="wasee-single">
            <div class="wasee-single__media">
                <?php the_post_thumbnail( 'large' );
                foreach ( (array) $gallery as $att_id ) {
                    if ( has_post_thumbnail() && $att_id === get_post_thumbnail_id() ) { continue; }
                    echo wp_get_attachment_image( $att_id, 'medium' );
                } ?>
            </div>
            <div class="wasee-single__body">
                <h1><?php the_title(); ?></h1>
                <div class="wasee-single__desc"><?php the_content(); ?></div>
                <?php if ( $specs ) : ?>
                <table class="wasee-specs">
                    <?php foreach ( $specs as $row ) : ?>
                        <tr>
                            <th><?php echo esc_html( $row['spec_name'] ); ?></th>
                            <td><?php echo esc_html( $row['spec_value'] ); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </table>
                <?php endif; ?>
            </div>
        </article>
        <?php endwhile; ?>
    </main>
</div>
<?php get_footer(); ?>
`,

  "assets/admin.css": `/* Админ-страница Wasee Import — технический стиль. */
.wasee-wrap{max-width:980px}
.wasee-ver{font-size:12px;color:#787c82;font-weight:400}
.wasee-tabs{display:flex;gap:4px;margin:16px 0 0}
.wasee-tab{border:1px solid #c3c4c7;border-bottom:0;background:#f0f0f1;padding:8px 16px;cursor:pointer}
.wasee-tab.active{background:#fff;font-weight:600}
.wasee-panel{display:none;border:1px solid #c3c4c7;background:#fff;padding:16px}
.wasee-panel.active{display:block}
.wasee-bar{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:12px}
.wasee-progress{height:14px;border:1px solid #c3c4c7;background:#f6f7f7}
.wasee-progress i{display:block;height:100%;width:0;background:#ffb224;transition:width .3s}
.wasee-log{background:#10151f;color:#9fb3d1;padding:12px;max-height:380px;overflow:auto;font-size:12px;line-height:1.7}
.wasee-log .ok{color:#3ddc97}.wasee-log .warn{color:#ffb224}.wasee-log .err{color:#ff6161}
`,

  "assets/admin.js": `/* AJAX-батчи импорта + живой лог. */
(function ($) {
    var queue = [], working = false, doneCount = 0, totalCount = 0;

    function log(level, msg) {
        var box = $('#wasee-log');
        box.append('<div class="' + level + '">[' + new Date().toLocaleTimeString() + '] ' + msg + '</div>');
        box.scrollTop(box[0].scrollHeight);
    }

    function progress() {
        $('#wasee-progress-fill').css('width', totalCount ? (doneCount / totalCount * 100) + '%' : '0%');
    }

    function nextBatch() {
        if (!queue.length) { working = false; log('ok', 'Очередь обработана: ' + doneCount + '/' + totalCount); return; }
        var ids = queue.splice(0, WaseeAdmin.batch);
        $.post(WaseeAdmin.ajax, {
            action: 'wasee_batch', nonce: WaseeAdmin.nonce,
            ids: ids, term: $('#wasee-term').val() || 'featured-products', mode: $('#wasee-mode').val()
        }).done(function (r) {
            (r.data.log || []).forEach(function (l) { log(l.level, l.message); });
            doneCount += (r.data.done || []).length; progress(); nextBatch();
        }).fail(function () { log('err', 'Батч не доставлен — нажмите «Доимпортировать пропущенные»'); working = false; });
    }

    $('#wasee-run').on('click', function () {
        if (working) return;
        queue = window.WaseeQueue || []; totalCount = queue.length; doneCount = 0;
        working = true; log('sys', 'Старт: ' + totalCount + ' позиций, батч ' + WaseeAdmin.batch); nextBatch();
    });
})(jQuery);
`,
};

/* ---------- сборка ---------- */

export async function buildPluginZip(): Promise<{ blob: Blob; files: number; bytes: number }> {
  const zip = new JSZip();
  const root = zip.folder("wasee-importer")!;

  root.file("readme.txt", buildReadmeRaw());
  for (const [path, content] of Object.entries(SRC)) {
    root.file(path, content);
  }

  const blob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  });
  return { blob, files: Object.keys(SRC).length + 1, bytes: blob.size };
}
