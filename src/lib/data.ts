/* ============================================================
   Датасет консоли миграции
   Источник: waseegroup.com (OpenCart 3.0.3.8) — снято парсером
   Цель: faseen.com — ГОЛЫЙ WordPress 6.5 + тема Astra, и всё.
   Никаких CPT / ACF / таксономий на цели нет — плагин
   wasee-importer регистрирует всё сам при активации.
   ============================================================ */

export const IMG = {
  hybrid: "https://image.qwenlm.ai/generated-images/ed065b80-0038-4187-a376-3cb014be184c/_result.png",
  lens: "https://image.qwenlm.ai/generated-images/4792a95b-103e-4f44-b360-6e4899b4be58/_result.png",
  poe: "https://image.qwenlm.ai/generated-images/c432466c-e94a-480a-a67c-be200a0ca62b/_result.png",
  kit: "https://image.qwenlm.ai/generated-images/d8ded461-870b-49f9-9649-ff7a756dc585/_result.png",
  ip: "https://image.qwenlm.ai/generated-images/a1dba041-02f2-4ad2-9871-abe6469eaaa6/_result.png",
  nvr: "https://image.qwenlm.ai/generated-images/09e185fd-349f-431c-a1be-93cf8bfc9d9c/_result.png",
  vr: "https://image.qwenlm.ai/generated-images/659a13c7-5d0c-4d32-802b-7704c7edf8a3/_result.png",
  wifi: "https://image.qwenlm.ai/generated-images/03aa0b2d-a0f6-479f-9c86-79b103046f98/_result.png",
  acc: "https://image.qwenlm.ai/generated-images/1d96bdb4-7922-43d3-b0fc-7274377af577/_result.png",
};

export const FALLBACK_IMG =
  "image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#121A2B"/><circle cx="100" cy="92" r="34" fill="none" stroke="#2E4066" stroke-width="4"/><circle cx="100" cy="92" r="12" fill="#2E4066"/><rect x="60" y="140" width="80" height="8" rx="2" fill="#223050"/><text x="100" y="172" font-family="monospace" font-size="11" fill="#5C6C8F" text-anchor="middle">image offline</text></svg>`
  );

export type Category = {
  id: string;
  name: string;
  path: string; // OpenCart path=60_XXX
  slug: string; // term slug, который создаст плагин
  ru: string;
};

export const CATEGORIES: Category[] = [
  { id: "hybrid41", name: "4in1 Hybrid Camera modules", path: "60_112", slug: "4in1-hybrid-modules", ru: "4-в-1 гибридные модули" },
  { id: "lens", name: "Board HD Lens", path: "60_138", slug: "board-hd-lens", ru: "Платные HD-объективы" },
  { id: "poe", name: "Embedded POE NVR Board", path: "60_131", slug: "embedded-poe-nvr", ru: "Встраиваемые PoE NVR-платы" },
  { id: "featured", name: "Featured Products", path: "60_61", slug: "featured-products", ru: "Рекомендуемые" },
  { id: "ip", name: "IP Camera Modules", path: "60_104", slug: "ip-camera-modules", ru: "IP-модули камер" },
  { id: "nvr", name: "NVR Boards", path: "60_122", slug: "nvr-boards", ru: "Платы NVR" },
  { id: "vr", name: "Panoramic VR Camera Module", path: "60_116", slug: "panoramic-vr-modules", ru: "Панорамные VR-модули" },
  { id: "wifiap", name: "WiFi AP Hotspot Camera Module", path: "60_113", slug: "wifi-ap-camera-modules", ru: "WiFi AP модули с камерой" },
  { id: "wifikit", name: "WiFi Kit NVR Board", path: "60_119", slug: "wifi-kit-nvr", ru: "WiFi-комплекты NVR" },
  { id: "acc", name: "Assembly Accessories", path: "60_66", slug: "assembly-accessories", ru: "Монтажные аксессуары" },
];

export type Product = {
  pid: number; // OpenCart product_id
  name: string;
  cat: string;
  model: string;
  image: string;
  image2?: string;
  description: string;
  specs: [string, string][];
};

const S = (rows: [string, string][]) => rows;

export const PRODUCTS: Product[] = [
  // ─── 4in1 Hybrid Camera modules ───────────────────────────
  {
    pid: 281, cat: "hybrid41", model: "DB-ATC-Y20",
    name: "2MP 4IN1 Camera Module",
    image: IMG.hybrid, image2: IMG.kit,
    description: "Компактный 4-в-1 модуль камеры для аналогового HD видеонаблюдения. Поддерживает AHD/TVI/CVI/CVBS, интерфейсы MIPI CSI-2 и DVP, коаксиальное OSD-управление (UTC).",
    specs: S([
      ["Model name", "DB-ATC-Y20"],
      ["Image sensor", "1/2.7\" Progressive Scan CMOS"],
      ["Effective pixels", "1932(H) × 1088(V), 2MP"],
      ["Resolution", "FHD 1920×1080 @60fps (MIPI)"],
      ["Video standard", "AHD / TVI / CVI / CVBS (4in1)"],
      ["Lens mount", "M12"],
      ["Focal length", "2.8 mm (опц. 3.6 / 6 mm)"],
      ["Field of view", "110° (H)"],
      ["Min. illumination", "0.01 Lux @ F1.2"],
      ["IR cut filter", "ICR, автопереключение"],
      ["Video interface", "MIPI CSI-2 (4 lane) / DVP"],
      ["OSD control", "UTC, коаксиальный канал"],
      ["White balance", "Auto"],
      ["WDR", "DWDR"],
      ["S/N ratio", "≥ 52 dB"],
      ["Power supply", "DC 12 V ±10%"],
      ["Power consumption", "≤ 2.5 W (тип. 1.6 W)"],
      ["Operating temp.", "−30 °C … +70 °C"],
      ["Storage temp.", "−40 °C … +85 °C"],
      ["Board size", "38 × 38 mm"],
      ["Weight", "45 g"],
      ["Certification", "CE / FCC / RoHS"],
    ]),
  },
  {
    pid: 282, cat: "hybrid41", model: "DB-ATC-Y50",
    name: "5MP 4IN1 Camera Module",
    image: IMG.hybrid,
    description: "5-мегапиксельный гибридный модуль на сенсоре SC5335 с поддержкой 4 форматов сигнала и расширенным динамическим диапазоном для уличных купольных камер.",
    specs: S([
      ["Model name", "DB-ATC-Y50"],
      ["Image sensor", "1/2.7\" SC5335 CMOS"],
      ["Effective pixels", "2880(H) × 1620(V), 5MP"],
      ["Resolution", "2592×1944 @20fps / 4MP @30fps"],
      ["Video standard", "AHD / TVI / CVI / CVBS"],
      ["Lens mount", "M12"],
      ["Focal length", "3.6 mm"],
      ["Field of view", "88° (H)"],
      ["Min. illumination", "0.005 Lux @ F1.2"],
      ["IR cut filter", "ICR"],
      ["Video interface", "MIPI CSI-2 / DVP"],
      ["WDR", "DWDR + 2DNR/3DNR"],
      ["S/N ratio", "≥ 55 dB"],
      ["Power supply", "DC 12 V ±10%"],
      ["Power consumption", "≤ 3.0 W"],
      ["Operating temp.", "−30 °C … +70 °C"],
      ["Board size", "38 × 38 mm"],
      ["Weight", "48 g"],
    ]),
  },
  {
    pid: 283, cat: "hybrid41", model: "DB-ATC-Y80",
    name: "8MP 4K 4IN1 Camera Module",
    image: IMG.hybrid,
    description: "Флагманский 4K-модуль серии Y для гибридных систем: 8 Мп Sony-совместимый сенсор, низкий шум, прошивка с автоопределением стандарта на линии.",
    specs: S([
      ["Model name", "DB-ATC-Y80"],
      ["Image sensor", "1/2.8\" IMX307-grade CMOS"],
      ["Effective pixels", "3840(H) × 2160(V), 8MP"],
      ["Resolution", "4K 3840×2160 @15fps / 5MP @20fps"],
      ["Video standard", "AHD / TVI / CVI / CVBS"],
      ["Lens mount", "M12 / CS (адаптер)"],
      ["Field of view", "зависит от оптики"],
      ["Min. illumination", "0.002 Lux (Starlight)"],
      ["IR cut filter", "ICR"],
      ["Video interface", "MIPI CSI-2 (4 lane)"],
      ["WDR", "DWDR, HLC, BLC"],
      ["S/N ratio", "≥ 55 dB"],
      ["Power supply", "DC 12 V ±10%"],
      ["Power consumption", "≤ 3.8 W"],
      ["Operating temp.", "−30 °C … +70 °C"],
      ["Board size", "38 × 38 mm"],
      ["Weight", "52 g"],
    ]),
  },
  {
    pid: 284, cat: "hybrid41", model: "DB-ATC-Y20S",
    name: "2MP Starlight 4IN1 Module",
    image: IMG.hybrid,
    description: "Starlight-версия модуля Y20 с повышенной светочувствительностью для круглосуточной съёмки без ИК-подсветки на объектах с низкой освещённостью.",
    specs: S([
      ["Model name", "DB-ATC-Y20S"],
      ["Image sensor", "1/2.8\" Starlight CMOS"],
      ["Effective pixels", "1932(H) × 1088(V), 2MP"],
      ["Resolution", "FHD 1920×1080 @30fps"],
      ["Video standard", "AHD / TVI / CVI / CVBS"],
      ["Lens mount", "M12"],
      ["Min. illumination", "0.0005 Lux @ F1.0"],
      ["IR cut filter", "ICR"],
      ["Video interface", "MIPI CSI-2 / DVP"],
      ["3D DNR", "да"],
      ["S/N ratio", "≥ 55 dB"],
      ["Power supply", "DC 12 V ±10%"],
      ["Power consumption", "≤ 2.2 W"],
      ["Operating temp.", "−30 °C … +70 °C"],
      ["Board size", "38 × 38 mm"],
      ["Weight", "45 g"],
    ]),
  },

  // ─── Board HD Lens ────────────────────────────────────────
  {
    pid: 286, cat: "lens", model: "DB-LENS-28",
    name: "HD Board Lens 2.8mm M12",
    image: IMG.lens, image2: IMG.hybrid,
    description: "Широкоугольный платный объектив 2.8 мм с резьбой M12 и ИК-коррекцией фокуса. Оптимизирован для 2–5 Мп сенсоров формата 1/2.7\".",
    specs: S([
      ["Model name", "DB-LENS-28"],
      ["Focal length", "2.8 mm"],
      ["Mount", "M12 × 0.5"],
      ["Max. aperture", "F2.0"],
      ["Format", "1/2.7\" / 1/3\""],
      ["Field of view", "110° (1/2.7\")"],
      ["IR corrected", "да, 850 nm"],
      ["Distortion", "< −8%"],
      ["Back focal", "4.6 mm"],
      ["Operating temp.", "−30 °C … +70 °C"],
      ["Weight", "6 g"],
    ]),
  },
  {
    pid: 287, cat: "lens", model: "DB-LENS-36",
    name: "HD Board Lens 3.6mm M12",
    image: IMG.lens,
    description: "Универсальный объектив 3.6 мм — баланс угла обзора и дальности для типовых задач видеонаблюдения: коридоры, кассы, периметр до 15 м.",
    specs: S([
      ["Model name", "DB-LENS-36"],
      ["Focal length", "3.6 mm"],
      ["Mount", "M12 × 0.5"],
      ["Max. aperture", "F2.0"],
      ["Format", "1/2.7\" / 1/3\""],
      ["Field of view", "88° (1/2.7\")"],
      ["IR corrected", "да, 850 nm"],
      ["Distortion", "< −5%"],
      ["Back focal", "5.1 mm"],
      ["Operating temp.", "−30 °C … +70 °C"],
      ["Weight", "6 g"],
    ]),
  },
  {
    pid: 288, cat: "lens", model: "DB-LENS-06CS",
    name: "HD Board Lens 6mm CS-Mount",
    image: IMG.lens,
    description: "Дальнобойный объектив 6 мм с посадкой CS и переходником на M12 в комплекте. Для распознавания номеров и лиц на дистанции 20–25 м.",
    specs: S([
      ["Model name", "DB-LENS-06CS"],
      ["Focal length", "6 mm"],
      ["Mount", "CS (адаптер M12 в комплекте)"],
      ["Max. aperture", "F1.8"],
      ["Format", "1/2.7\" – 1/2\""],
      ["Field of view", "52° (1/2.7\")"],
      ["IR corrected", "да"],
      ["Distortion", "< −2%"],
      ["Back focal", "7.5 mm"],
      ["Operating temp.", "−30 °C … +70 °C"],
      ["Weight", "14 g"],
    ]),
  },
  {
    pid: 289, cat: "lens", model: "DB-LENS-MZ12",
    name: "Motorized Zoom Lens 2.8–12mm",
    image: IMG.lens,
    description: "Моторизованный варифокальный объектив с автофокусом: удалённая настройка угла обзора по коаксиальному каналу или RS-485.",
    specs: S([
      ["Model name", "DB-LENS-MZ12"],
      ["Focal length", "2.8 – 12 mm, моторизованный"],
      ["Mount", "M16"],
      ["Max. aperture", "F1.6 – F2.8"],
      ["Format", "1/2.7\" – 1/1.8\""],
      ["Zoom ratio", "4.3×"],
      ["Focus", "автофокус, DC-drive"],
      ["IR corrected", "да, 850/940 nm"],
      ["Control", "coax / RS-485"],
      ["Operating temp.", "−30 °C … +70 °C"],
      ["Weight", "68 g"],
    ]),
  },

  // ─── Embedded POE NVR Board ───────────────────────────────
  {
    pid: 291, cat: "poe", model: "DB-NVR-P04",
    name: "4CH Embedded POE NVR Board",
    image: IMG.poe, image2: IMG.nvr,
    description: "Одноплатный 4-канальный NVR со встроенным PoE-коммутатором (4 × IEEE 802.3af). Linux-прошивка, запись до 5 Мп, слот SATA 3.5\".",
    specs: S([
      ["Model name", "DB-NVR-P04"],
      ["Channels", "4 × IP (PoE)"],
      ["PoE budget", "4 × 15.4 W, IEEE 802.3af"],
      ["Recording res.", "до 5MP @ 30 fps"],
      ["Playback", "4 × 1080p одновременно"],
      ["Video codec", "H.265 / H.264"],
      ["HDD", "1 × SATA до 8 TB"],
      ["Video out", "HDMI 1.4 / VGA"],
      ["Network", "1 × RJ45 100M (uplink)"],
      ["Audio", "1 in / 1 out, G.711"],
      ["USB", "2 × USB 2.0"],
      ["OS", "Embedded Linux"],
      ["Power", "DC 48–57 V / адаптер в комплекте"],
      ["Board size", "160 × 120 mm"],
      ["Operating temp.", "−10 °C … +55 °C"],
    ]),
  },
  {
    pid: 292, cat: "poe", model: "DB-NVR-P08",
    name: "8CH Embedded POE NVR Board",
    image: IMG.poe,
    description: "8-канальная версия встраиваемого PoE-NVR: до 8 Мп на канал, два SATA-порта и поддержка ONVIF Profile S/T для сторонних камер.",
    specs: S([
      ["Model name", "DB-NVR-P08"],
      ["Channels", "8 × IP (PoE)"],
      ["PoE budget", "8 × 15.4 W / суммарно 120 W"],
      ["Recording res.", "до 8MP @ 25 fps"],
      ["Playback", "8 × 1080p одновременно"],
      ["Video codec", "H.265+ / H.265 / H.264"],
      ["HDD", "2 × SATA до 10 TB каждый"],
      ["Video out", "HDMI 4K / VGA"],
      ["ONVIF", "Profile S, T"],
      ["Audio", "4 in / 1 out"],
      ["USB", "2 × USB 2.0 + 1 × USB 3.0"],
      ["OS", "Embedded Linux"],
      ["Power", "DC 48–57 V"],
      ["Board size", "210 × 140 mm"],
      ["Operating temp.", "−10 °C … +55 °C"],
    ]),
  },
  {
    pid: 293, cat: "poe", model: "DB-NVR-P16",
    name: "16CH Embedded POE NVR Board",
    image: IMG.poe,
    description: "Старшая плата серии: 16 PoE-портов, аппаратный транскодер, RAID-массивы не требуются — два SATA с горячей заменой.",
    specs: S([
      ["Model name", "DB-NVR-P16"],
      ["Channels", "16 × IP (PoE)"],
      ["PoE budget", "суммарно 200 W"],
      ["Recording res.", "до 8MP @ 30 fps"],
      ["Incoming bandwidth", "160 Mbps"],
      ["Video codec", "H.265+ / H.265 / H.264+"],
      ["HDD", "2 × SATA hot-swap до 10 TB"],
      ["Video out", "HDMI 4K / VGA (независимые)"],
      ["ONVIF", "Profile S, T, G"],
      ["Alarm I/O", "8 in / 4 out"],
      ["OS", "Embedded Linux"],
      ["Power", "DC 48–57 V, 2× вход (резерв)"],
      ["Board size", "260 × 180 mm"],
      ["Operating temp.", "−10 °C … +55 °C"],
    ]),
  },

  // ─── Featured Products ────────────────────────────────────
  {
    pid: 295, cat: "featured", model: "DB-KIT-Y20F",
    name: "Y20F 2MP FHD Camera Kit",
    image: IMG.kit, image2: IMG.hybrid,
    description: "Готовый комплект для OEM-производителей: модуль DB-ATC-Y20, объектив 2.8 мм, шлейфы, крепёж и тестовый стенд-кабель. Хит продаж 2024.",
    specs: S([
      ["Model name", "DB-KIT-Y20F"],
      ["Camera module", "DB-ATC-Y20, 2MP 4in1"],
      ["Lens", "2.8 mm M12, IR-corrected"],
      ["Cable set", "FPC 24-pin + коаксиал UTC"],
      ["Bracket", "38 мм, алюминий"],
      ["Test cable", "BNC + питание 12 В"],
      ["Package", "антистатический, 5 слоёв"],
      ["Warranty", "24 мес."],
      ["MOQ", "50 комплектов"],
      ["Lead time", "2–3 недели"],
    ]),
  },
  {
    pid: 296, cat: "featured", model: "DB-KIT-Y20B",
    name: "Y20B Bullet Module Kit",
    image: IMG.kit,
    description: "Комплект для уличных цилиндрических камер: модуль Y20B в термокожухе с обогревом, объектив 3.6 мм и гермовводы IP66.",
    specs: S([
      ["Model name", "DB-KIT-Y20B"],
      ["Camera module", "DB-ATC-Y20B, 2MP 4in1"],
      ["Housing", "цилиндрический, IP66"],
      ["Heater", "обогрев −40 °C, 12 В"],
      ["Lens", "3.6 mm M12"],
      ["IR range", "до 30 м (опц.)"],
      ["Cable set", "гермовводы ×2"],
      ["Warranty", "24 мес."],
      ["MOQ", "50 комплектов"],
      ["Lead time", "2–3 недели"],
    ]),
  },

  // ─── IP Camera Modules ────────────────────────────────────
  {
    pid: 298, cat: "ip", model: "DB-IPC-20",
    name: "2MP IP Camera Module",
    image: IMG.ip, image2: IMG.poe,
    description: "Сетевой модуль на SoC с аппаратным H.265: RTSP/ONVIF из коробки, microSD до 256 ГБ, тревожные входы и двусторонний звук.",
    specs: S([
      ["Model name", "DB-IPC-20"],
      ["Image sensor", "1/2.8\" Progressive Scan CMOS"],
      ["Resolution", "1920×1080 @ 60 fps"],
      ["Video codec", "H.265 / H.264 / MJPEG"],
      ["Network", "RJ45 10/100, PoE 802.3af"],
      ["Protocols", "RTSP, ONVIF Profile S/T"],
      ["Storage", "microSD до 256 GB"],
      ["Audio", "1 in / 1 out, G.711"],
      ["Alarm I/O", "2 in / 1 out"],
      ["Lens mount", "M12"],
      ["Power", "PoE или DC 12 V"],
      ["Power consumption", "≤ 4 W"],
      ["Board size", "45 × 45 mm"],
      ["Operating temp.", "−30 °C … +60 °C"],
    ]),
  },
  {
    pid: 299, cat: "ip", model: "DB-IPC-40",
    name: "4MP IP Camera Module",
    image: IMG.ip,
    description: "4-мегапиксельная версия с WDR 120 dB и встроенной видеоаналитикой: детекция движения, пересечение линии, подсчёт объектов.",
    specs: S([
      ["Model name", "DB-IPC-40"],
      ["Image sensor", "1/2.7\" Progressive Scan CMOS"],
      ["Resolution", "2560×1440 @ 30 fps"],
      ["WDR", "120 dB"],
      ["Video codec", "H.265 / H.264 / MJPEG"],
      ["Analytics", "motion, line crossing, object count"],
      ["Network", "RJ45 10/100, PoE"],
      ["Protocols", "RTSP, ONVIF Profile S/T"],
      ["Storage", "microSD до 256 GB"],
      ["Lens mount", "M12"],
      ["Power", "PoE или DC 12 V"],
      ["Power consumption", "≤ 4.5 W"],
      ["Board size", "45 × 45 mm"],
      ["Operating temp.", "−30 °C … +60 °C"],
    ]),
  },
  {
    pid: 300, cat: "ip", model: "DB-IPC-50",
    name: "5MP IP Camera Module",
    image: IMG.ip,
    description: "Модуль 5 Мп с аппаратным кодеком H.265+ и сниженным битрейтом до 60% без потери качества — идеален для архивов на 4–8 каналов.",
    specs: S([
      ["Model name", "DB-IPC-50"],
      ["Image sensor", "1/2.7\" SC5335 CMOS"],
      ["Resolution", "2880×1620 @ 30 fps"],
      ["Video codec", "H.265+ / H.265 / H.264"],
      ["Network", "RJ45 10/100, PoE"],
      ["Protocols", "RTSP, ONVIF Profile S/T"],
      ["Storage", "microSD до 256 GB"],
      ["Audio", "встроенный микрофон"],
      ["Lens mount", "M12"],
      ["Power", "PoE или DC 12 V"],
      ["Power consumption", "≤ 5 W"],
      ["Board size", "45 × 45 mm"],
      ["Operating temp.", "−30 °C … +60 °C"],
    ]),
  },
  {
    pid: 301, cat: "ip", model: "DB-IPC-80",
    name: "4K Ultra IP Camera Module",
    image: IMG.ip,
    description: "Топовый 8-мегапиксельный IP-модуль: 4K @ 30 fps, Starlight-сенсор, dual-stream с независимыми кодеками, SDK под Linux.",
    specs: S([
      ["Model name", "DB-IPC-80"],
      ["Image sensor", "1/2.8\" Starlight CMOS"],
      ["Resolution", "3840×2160 @ 30 fps"],
      ["Video codec", "H.265+ / H.265 / H.264"],
      ["Dual stream", "да, независимые кодеки"],
      ["Network", "RJ45 10/100, PoE"],
      ["Protocols", "RTSP, ONVIF Profile S/T, SDK"],
      ["Storage", "microSD до 512 GB"],
      ["Lens mount", "M12 / CS"],
      ["Power", "PoE или DC 12 V"],
      ["Power consumption", "≤ 6.5 W"],
      ["Board size", "50 × 50 mm"],
      ["Operating temp.", "−30 °C … +60 °C"],
    ]),
  },

  // ─── NVR Boards ───────────────────────────────────────────
  {
    pid: 303, cat: "nvr", model: "DB-NVR-04",
    name: "4CH NVR Board HDMI/VGA",
    image: IMG.nvr,
    description: "Базовая 4-канальная плата NVR без PoE для настольных регистраторов: HDMI/VGA, один SATA, пульт ДУ в референс-дизайне корпуса.",
    specs: S([
      ["Model name", "DB-NVR-04"],
      ["Channels", "4 × IP до 5MP"],
      ["Video codec", "H.265 / H.264"],
      ["Video out", "HDMI 1.4 / VGA"],
      ["HDD", "1 × SATA до 8 TB"],
      ["Network", "1 × RJ45 100M"],
      ["USB", "2 × USB 2.0"],
      ["Audio", "1 in / 1 out"],
      ["OS", "Embedded Linux"],
      ["Power", "DC 12 V / 2 A"],
      ["Board size", "140 × 100 mm"],
      ["Operating temp.", "−10 °C … +55 °C"],
    ]),
  },
  {
    pid: 304, cat: "nvr", model: "DB-NVR-08",
    name: "8CH NVR Board",
    image: IMG.nvr,
    description: "8-канальная плата с гигабитным портом и поддержкой 4K-вывода на HDMI. Совместима с камерами 30+ производителей по ONVIF.",
    specs: S([
      ["Model name", "DB-NVR-08"],
      ["Channels", "8 × IP до 8MP"],
      ["Video codec", "H.265+ / H.265 / H.264"],
      ["Video out", "HDMI 4K / VGA"],
      ["HDD", "2 × SATA до 10 TB"],
      ["Network", "1 × RJ45 Gigabit"],
      ["ONVIF", "Profile S, T"],
      ["USB", "2 × USB 2.0 + 1 × USB 3.0"],
      ["OS", "Embedded Linux"],
      ["Power", "DC 12 V / 3 A"],
      ["Board size", "190 × 130 mm"],
      ["Operating temp.", "−10 °C … +55 °C"],
    ]),
  },
  {
    pid: 305, cat: "nvr", model: "DB-NVR-32",
    name: "32CH NVR Board",
    image: IMG.nvr,
    description: "Плата для стоечных регистраторов: 32 канала, входящая полоса 320 Mbps, два гигабитных порта и eSATA для расширения архива.",
    specs: S([
      ["Model name", "DB-NVR-32"],
      ["Channels", "32 × IP до 8MP"],
      ["Incoming bandwidth", "320 Mbps"],
      ["Video codec", "H.265+ / H.265 / H.264+"],
      ["Video out", "2 × HDMI 4K / VGA"],
      ["HDD", "4 × SATA до 12 TB"],
      ["eSATA", "1 × порт расширения"],
      ["Network", "2 × RJ45 Gigabit"],
      ["Alarm I/O", "16 in / 8 out"],
      ["OS", "Embedded Linux"],
      ["Power", "ATX / DC 12 V"],
      ["Board size", "305 × 244 mm"],
      ["Operating temp.", "0 °C … +55 °C"],
    ]),
  },

  // ─── Panoramic VR Camera Module ───────────────────────────
  {
    pid: 306, cat: "vr", model: "DB-VR-180",
    name: "180° Panoramic VR Module 4MP",
    image: IMG.vr, image2: IMG.lens,
    description: "Панорамный модуль с обзором 180° «рыбий глаз»: dewarping на борту, до 4 виртуальных PTZ-видов с одного потока.",
    specs: S([
      ["Model name", "DB-VR-180"],
      ["Image sensor", "1/2.7\" Progressive CMOS"],
      ["Resolution", "2560×1440 @ 30 fps"],
      ["Field of view", "180° панорама"],
      ["Dewarping", "аппаратный, 4 виртуальных PTZ"],
      ["Video codec", "H.265 / H.264"],
      ["Lens", "fisheye, фиксированный"],
      ["Mount", "потолок / стена"],
      ["Network", "RJ45, PoE"],
      ["Storage", "microSD до 256 GB"],
      ["Power", "PoE или DC 12 V"],
      ["Power consumption", "≤ 5 W"],
      ["Board diameter", "Ø 72 mm"],
      ["Operating temp.", "−20 °C … +60 °C"],
    ]),
  },
  {
    pid: 307, cat: "vr", model: "DB-VR-360",
    name: "360° Panoramic VR Module 6MP",
    image: IMG.vr,
    description: "Полнокупольный 360° модуль 6 Мп для потолочного монтажа: круговой обзор без слепых зон, тепловые карты движения в аналитике.",
    specs: S([
      ["Model name", "DB-VR-360"],
      ["Image sensor", "1/2.5\" Progressive CMOS"],
      ["Resolution", "3072×2048 @ 25 fps"],
      ["Field of view", "360° (потолок) / 180° (стена)"],
      ["Dewarping", "аппаратный + клиентский"],
      ["Analytics", "heat map, people counting"],
      ["Video codec", "H.265+ / H.265 / H.264"],
      ["Lens", "fisheye, фиксированный"],
      ["Network", "RJ45, PoE"],
      ["Storage", "microSD до 256 GB"],
      ["Power", "PoE или DC 12 V"],
      ["Power consumption", "≤ 6 W"],
      ["Board diameter", "Ø 88 mm"],
      ["Operating temp.", "−20 °C … +60 °C"],
    ]),
  },

  // ─── WiFi AP Hotspot Camera Module ────────────────────────
  {
    pid: 309, cat: "wifiap", model: "DB-WAP-20",
    name: "WiFi AP Hotspot Camera 2MP",
    image: IMG.wifi, image2: IMG.acc,
    description: "Два устройства в одном корпусе: точка доступа WiFi 4 + камера 2 Мп. Для гостиниц, парковок и умных дворов — один кабель, один монтаж.",
    specs: S([
      ["Model name", "DB-WAP-20"],
      ["Camera", "2MP, 1080p @ 30 fps"],
      ["WiFi", "802.11 b/g/n, 2.4 GHz"],
      ["WiFi clients", "до 32 одновременных"],
      ["AP modes", "hotspot, captive portal, WPA2"],
      ["Video codec", "H.264 / MJPEG"],
      ["Antenna", "2 × внешние 5 dBi"],
      ["LAN", "1 × RJ45, PoE in"],
      ["Storage", "microSD до 128 GB"],
      ["Power", "PoE 802.3af"],
      ["Power consumption", "≤ 8 W (AP + CAM)"],
      ["Dimensions", "Ø 160 × 45 mm"],
      ["Operating temp.", "−20 °C … +60 °C"],
    ]),
  },
  {
    pid: 310, cat: "wifiap", model: "DB-WAP-50",
    name: "WiFi AP Hotspot Camera 5MP",
    image: IMG.wifi,
    description: "Старшая модель: 5 Мп камера и двухдиапазонный WiFi AC1200. Управляется централизованно через облачный контроллер по TR-069.",
    specs: S([
      ["Model name", "DB-WAP-50"],
      ["Camera", "5MP, 2880×1620 @ 25 fps"],
      ["WiFi", "802.11 a/b/g/n/ac, 2.4 + 5 GHz"],
      ["WiFi clients", "до 64 одновременных"],
      ["AP modes", "hotspot, captive portal, mesh"],
      ["Management", "облачный контроллер, TR-069"],
      ["Video codec", "H.265 / H.264"],
      ["Antenna", "4 × внутренние MIMO"],
      ["LAN", "1 × RJ45 Gigabit, PoE in"],
      ["Storage", "microSD до 256 GB"],
      ["Power", "PoE 802.3af/at"],
      ["Power consumption", "≤ 12 W"],
      ["Dimensions", "Ø 180 × 48 mm"],
      ["Operating temp.", "−20 °C … +60 °C"],
    ]),
  },

  // ─── WiFi Kit NVR Board ───────────────────────────────────
  {
    pid: 312, cat: "wifikit", model: "DB-WKN-04",
    name: "4CH WiFi Kit NVR Board",
    image: IMG.wifi,
    description: "Плата NVR с встроенным WiFi-мостом для беспроводных комплектов «4 камеры + регистратор»: автосопряжение, шифрование канала AES-128.",
    specs: S([
      ["Model name", "DB-WKN-04"],
      ["Channels", "4 × WiFi-камеры"],
      ["WiFi bridge", "5 GHz, точка-точка, до 300 м"],
      ["Encryption", "AES-128, закрытая сеть"],
      ["Recording res.", "до 5MP"],
      ["Video codec", "H.265 / H.264"],
      ["HDD", "1 × SATA до 8 TB"],
      ["Video out", "HDMI / VGA"],
      ["Auto-pairing", "да, по QR-коду"],
      ["OS", "Embedded Linux"],
      ["Power", "DC 12 V / 3 A"],
      ["Board size", "170 × 120 mm"],
      ["Operating temp.", "−10 °C … +55 °C"],
    ]),
  },
  {
    pid: 313, cat: "wifikit", model: "DB-WKN-08",
    name: "8CH WiFi Kit NVR Board",
    image: IMG.wifi,
    description: "8-канальный беспроводной комплект с ретранслятором в комплекте: стабильный линк через две стены, резервирование записи на SD.",
    specs: S([
      ["Model name", "DB-WKN-08"],
      ["Channels", "8 × WiFi-камеры"],
      ["WiFi bridge", "5 GHz MIMO, до 500 м"],
      ["Repeater", "в комплекте"],
      ["Encryption", "AES-128"],
      ["Recording res.", "до 5MP"],
      ["Video codec", "H.265+ / H.265 / H.264"],
      ["HDD", "2 × SATA до 8 TB"],
      ["Video out", "HDMI 4K / VGA"],
      ["OS", "Embedded Linux"],
      ["Power", "DC 12 V / 4 A"],
      ["Board size", "210 × 140 mm"],
      ["Operating temp.", "−10 °C … +55 °C"],
    ]),
  },

  // ─── Assembly Accessories ─────────────────────────────────
  {
    pid: 314, cat: "acc", model: "DB-ACC-FPC",
    name: "FPC Cable Set 24-pin",
    image: IMG.acc, image2: IMG.hybrid,
    description: "Комплект гибких шлейфов для камерных модулей: 24-pin FPC длиной 10/20/30 см, экранированный коаксиал для UTC-канала.",
    specs: S([
      ["Model name", "DB-ACC-FPC"],
      ["Connector", "24-pin, шаг 0.5 mm"],
      ["Length", "100 / 200 / 300 mm"],
      ["Type", "same-side / opposite-side"],
      ["Coax UTC", "RG178, 300 mm"],
      ["Flex cycles", "≥ 20 000"],
      ["Temperature", "−40 °C … +85 °C"],
      ["Set", "по 3 шт. каждого типа"],
    ]),
  },
  {
    pid: 315, cat: "acc", model: "DB-ACC-M12",
    name: "M12 Lens Holder Bracket",
    image: IMG.acc,
    description: "Прецизионный держатель объектива M12 с юстировкой по трём осям: фланец под платы 38×38 мм, анодированный алюминий.",
    specs: S([
      ["Model name", "DB-ACC-M12"],
      ["Thread", "M12 × 0.5"],
      ["Adjustment", "3 оси, ±1.5 mm"],
      ["Compatible board", "38 × 38 / 32 × 32 mm"],
      ["Material", "алюминий, анодирование"],
      ["Height", "18 / 24 / 30 mm"],
      ["Set", "3 высоты + винты"],
    ]),
  },
  {
    pid: 316, cat: "acc", model: "DB-ACC-IR",
    name: "IR LED Board 850nm",
    image: IMG.acc,
    description: "Плата ИК-подсветки с 12 светодиодами 850 нм: дальность до 30 м, встроенный фоторезистор и драйвер стабилизации тока.",
    specs: S([
      ["Model name", "DB-ACC-IR"],
      ["Wavelength", "850 nm (опц. 940 nm)"],
      ["LED count", "12 × 5 mm"],
      ["IR range", "до 30 м"],
      ["Sensor", "фоторезистор, авто"],
      ["Driver", "стабилизация тока"],
      ["Power", "DC 12 V, ≤ 1.5 W"],
      ["Board diameter", "Ø 45 mm"],
      ["MTBF", "≥ 30 000 ч"],
    ]),
  },
];

/* ---------- производные метрики ---------- */

export const TOTAL_IMAGES = PRODUCTS.reduce((n, p) => n + 1 + (p.image2 ? 1 : 0), 0);
export const TOTAL_SPEC_ROWS = PRODUCTS.reduce((n, p) => n + p.specs.length, 0);
export const catCount = (id: string) => PRODUCTS.filter((p) => p.cat === id).length;

/* ---------- маппинг полей OpenCart → WP (мета) / ACF ---------- */

export type FieldMap = {
  src: string;
  target: string;
  type: string;
  sample: string;
};

export const FIELD_MAPS: FieldMap[] = [
  { src: "<h1> .item h1", target: "post_title", type: "string", sample: "2MP 4IN1 Camera Module" },
  { src: ".item__galleryLeft img@src", target: "_thumbnail_id · media_sideload", type: "media", sample: "Y20F-460x330.jpg → /uploads/2025/11/" },
  { src: ".item__galleryRight img@src[]", target: "wasee_gallery (ids) · ACF gallery, если Pro", type: "media[]", sample: "Y20B-85x51.jpg, DB-Y20-rear.jpg" },
  { src: ".item__galleryText", target: "post_content + post_excerpt", type: "text", sample: "Компактный 4-в-1 модуль камеры…" },
  { src: "table.specs tr td:nth(0)", target: "wasee_specifications[].[name]", type: "meta · repeater", sample: "Image sensor" },
  { src: "table.specs tr td:nth(1)", target: "wasee_specifications[].[value]", type: "meta · repeater", sample: "1/2.7\" Progressive CMOS" },
  { src: "category path=60_XXX", target: "wp_set_object_terms → product_category", type: "term", sample: "60_112 → 4in1-hybrid-modules" },
  { src: "URL param product_id", target: "wasee_legacy_id (meta)", type: "int", sample: "306" },
  { src: "URL страницы", target: "wasee_legacy_url (meta)", type: "url", sample: "waseegroup.com/?route=product/product&product_id=306" },
];

/* ---------- цель: голый WordPress + Astra ---------- */

export const TARGET = {
  site: "faseen.com",
  engine: "WordPress 6.5.2 · PHP 8.1 · MySQL 8.0",
  theme: "Astra 4.6.2 — единственное, что стоит на сайте",
  state: [
    { key: "Ядро WordPress", value: "6.5.2", status: "ok" as const },
    { key: "Тема", value: "Astra 4.6.2 (голая, без настроек)", status: "ok" as const },
    { key: "Плагины", value: "не установлены", status: "none" as const },
    { key: "Custom Post Types", value: "нет — плагин создаст «product»", status: "missing" as const },
    { key: "Таксономии", value: "только стандартные — плагин добавит product_category", status: "missing" as const },
    { key: "ACF / ACF Pro", value: "не установлен — плагин работает и без него", status: "optional" as const },
    { key: "Контент", value: "пусто, 0 записей", status: "none" as const },
  ],
  creates: [
    "register_post_type( 'product', [ 'public' => true, 'has_archive' => true, 'menu_icon' => 'dashicons-camera', 'supports' => [ 'title', 'editor', 'thumbnail', 'custom-fields' ], 'show_in_rest' => true ] )",
    "register_taxonomy( 'product_category', 'product', [ 'hierarchical' => true, 'show_in_rest' => true ] ) · 10 терминов создаёт импортер",
    "register_meta: wasee_product_code · wasee_legacy_id · wasee_legacy_url · wasee_specifications (сериализованный массив) · wasee_gallery (id вложений)",
    "acf_add_local_field_group( 'Product Data' ) — только если ACF обнаружен; Free-версия без repeater читает те же мета-поля",
    "Шаблоны под Astra: templates/archive-product.php + single-product.php — собственный B2B-дизайн, не клон faseen",
    "flush_rewrite_rules() при активации: ЧПУ /product/<slug> сразу рабочим",
  ],
  fallback:
    "Без ACF данные лежат в нативных мета-полях — Astra-шаблоны плагина читают их напрямую. Поставите ACF позже — плагин сам синхронизирует мета в поля группы «Product Data».",
};

/* ---------- файлы плагина wasee-importer ---------- */

export const PLUGIN_FILES: { path: string; desc: string; size: string; kind: "php" | "css" | "js" | "txt" }[] = [
  { path: "wasee-importer/wasee-importer.php", kind: "php", size: "6.2 KB", desc: "Бутстрап: хук активации, регистрация CPT и таксономии, админ-меню" },
  { path: "includes/class-wasee-setup.php", kind: "php", size: "5.6 KB", desc: "Регистрирует «product», product_category, мета-ключи; ACF-группу — если ACF есть" },
  { path: "includes/class-wasee-parser.php", kind: "php", size: "9.4 KB", desc: "cURL + DOMDocument/XPath: обход категорий path=60_*, извлечение блока .item" },
  { path: "includes/class-wasee-mapper.php", kind: "php", size: "5.1 KB", desc: "Маппинг OpenCart → мета/ACF, нормализация slug'ов, транслитерация" },
  { path: "includes/class-wasee-importer.php", kind: "php", size: "11.3 KB", desc: "wp_insert_post, media_sideload_image, привязка терминов, ре-импорт" },
  { path: "includes/class-wasee-log.php", kind: "php", size: "3.2 KB", desc: "Журнал операций в таблицу wp_wasee_import_log" },
  { path: "templates/single-product.php", kind: "php", size: "7.8 KB", desc: "Страница товара под Astra: спецификации, галерея — уникальный дизайн" },
  { path: "templates/archive-product.php", kind: "php", size: "6.4 KB", desc: "Архив с фильтрами по категориям, сетка карточек" },
  { path: "admin/class-wasee-admin.php", kind: "php", size: "7.6 KB", desc: "Админ-страница «Инструменты → Wasee Import», AJAX-батчи по 5 товаров" },
  { path: "admin/views/page-import.php", kind: "php", size: "8.9 KB", desc: "UI: прогресс, живой лог, перемаппинг полей, кнопки ре-импорта" },
  { path: "assets/admin.css", kind: "css", size: "3.4 KB", desc: "Стили админки в духе технического консоля" },
  { path: "assets/admin.js", kind: "js", size: "5.7 KB", desc: "AJAX-раннер батчей, автопрокрутка лога, прогресс-бар" },
  { path: "readme.txt", kind: "txt", size: "2.1 KB", desc: "Установка, запуск, типовые ошибки и их разбор" },
];

export const INSTALL_STEPS: { title: string; text: string }[] = [
  { title: "Загрузить плагин", text: "Папку wasee-importer — в /wp-content/plugins/ и активировать. Больше на faseen.com ничего ставить не нужно: тема Astra уже есть, этого достаточно." },
  { title: "Активация = регистрация", text: "При активации плагин сам создаёт CPT «product», таксономию product_category и мета-ключи. ACF не обязателен — с ним плагин дополнительно соберёт группу «Product Data»." },
  { title: "Проверить маппинг", text: "Инструменты → Wasee Import → «Маппинг»: селекторы OpenCart слева, мета/ACF-поля справа. Правки живут в wp_options и переживают обновления." },
  { title: "Тестовый импорт", text: "Один товар, product_id=281. Проверить миниатюру в медиатеке, сериализованные характеристики и термин 4in1-hybrid-modules." },
  { title: "Полный импорт", text: "Батчи по 5 товаров через admin-ajax, прогресс и лог в реальном времени. При обрыве — «Доимпортировать пропущенные»." },
  { title: "Фронтенд", text: "Шаблоны плагина отдают страницам товара уникальный B2B-дизайн внутри Astra — без клонирования старого сайта. Включить ЧПУ и 301-редиректы со старых URL." },
];

/* ---------- сценарий симуляции импорта ---------- */

export type Stage = "idle" | "scout" | "parse" | "media" | "map" | "import" | "done";
export type PStatus = "idle" | "queue" | "parse" | "media" | "map" | "done";
export type LogLevel = "sys" | "info" | "ok" | "warn" | "err";

export type Ev =
  | { t: number; kind: "stage"; stage: Stage }
  | { t: number; kind: "log"; level: LogLevel; msg: string }
  | { t: number; kind: "progress"; value: number }
  | { t: number; kind: "allqueue" }
  | { t: number; kind: "status"; pid: number; st: PStatus };

const fmtTime = (ms: number) => {
  const s = ms / 1000;
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}.${Math.floor((s % 1) * 10)}`;
};
export const stampOf = (ms: number) => fmtTime(ms);

export function buildImportScript(): Ev[] {
  const ev: Ev[] = [];
  let t = 0;
  const log = (level: LogLevel, msg: string, dt = 130) => { t += dt; ev.push({ t, kind: "log", level, msg }); };
  const stage = (s: Stage) => { t += 160; ev.push({ t, kind: "stage", stage: s }); };
  const progress = (v: number) => ev.push({ t, kind: "progress", value: v });
  const status = (pid: number, st: PStatus) => ev.push({ t, kind: "status", pid, st });

  // ── разведка ──
  stage("scout"); progress(3);
  log("sys", "wasee-importer v1.4.2 — запуск сессии импорта");
  log("info", "цель: faseen.com — голый WP 6.5 + Astra, плагинов 0", 300);
  log("ok", "setup: CPT «product» + product_category + мета-ключи зарегистрированы", 260);
  log("info", "ACF не обнаружен → режим: нативные мета-поля (совместимо с Free)", 220);
  log("info", "Подключение к waseegroup.com (OpenCart 3.0.3.8) …", 380);
  log("ok", "HTTP 200 · ответ 312 ms · TLS 1.3", 260);
  progress(6);
  for (const c of CATEGORIES) {
    log("info", `category path=${c.path} → ${c.name} · ${catCount(c.id)} тов.`, 140);
  }
  log("ok", `Разведка: 10 категорий, ${PRODUCTS.length} товаров, ${TOTAL_IMAGES} изображений`, 260);
  progress(10);

  // ── очередь ──
  t += 200; ev.push({ t, kind: "allqueue" });
  log("sys", `Очередь сформирована: ${PRODUCTS.length} записей`, 150);

  // ── парсинг ──
  stage("parse");
  PRODUCTS.forEach((p, i) => {
    status(p.pid, "parse"); t += 60;
    log("info", `parse product_id=${p.pid} «${p.name}» · ${p.specs.length} spec-строк`, 96);
    if (i % 8 === 7) progress(10 + Math.round((i / PRODUCTS.length) * 34));
  });
  progress(44);
  log("ok", `Парсинг завершён: ${PRODUCTS.length}/${PRODUCTS.length}, пропусков 0`, 200);

  // ── медиа ──
  stage("media");
  PRODUCTS.forEach((p, i) => {
    status(p.pid, "media"); t += 50;
    const kb = 24 + ((p.pid * 7) % 90);
    if (p.pid === 310) {
      log("warn", `media product_id=310: HTTP 404 на cache-thumb, повторная попытка (1/2) …`, 120);
      t += 160;
      log("ok", `media product_id=310: исходник найден, sideload OK (${kb + 12} KB)`, 140);
    } else {
      log("info", `media sideload: ${p.model.toLowerCase()}-main.jpg → /uploads/2025/11/ (${kb} KB)`, 84);
      if (p.image2) log("info", `media sideload: ${p.model.toLowerCase()}-alt.jpg → wasee_gallery`, 60);
    }
    if (i % 9 === 8) progress(44 + Math.round((i / PRODUCTS.length) * 24));
  });
  progress(68);
  log("ok", `Медиатека: +${TOTAL_IMAGES} файлов, дубликатов 0`, 180);

  // ── маппинг ──
  stage("map");
  PRODUCTS.forEach((p, i) => {
    status(p.pid, "map"); t += 40;
    if (i % 5 === 0) log("info", `map: ${p.model} → wasee_specifications [${p.specs.length} строк] · term ${CATEGORIES.find((c) => c.id === p.cat)?.slug}`, 110);
  });
  progress(82);
  log("ok", "Маппинг: 9 правил применено, конфликтов 0", 180);

  // ── импорт ──
  stage("import");
  PRODUCTS.forEach((p, i) => {
    status(p.pid, "done"); t += 70;
    log("ok", `wp_insert_post «${p.name}» → post_id=${4180 + i} ✓ · CPT «product»`, 104);
    progress(82 + Math.round(((i + 1) / PRODUCTS.length) * 17));
  });
  progress(100);
  stage("done");
  log("sys", `Миграция завершена: ${PRODUCTS.length} постов · ${TOTAL_IMAGES} медиа · ${TOTAL_SPEC_ROWS} spec-строк`, 260);
  log("warn", "1 медиаресурс импортирован после повтора (product_id=310)", 140);
  log("ok", "Финал: flush_rewrite_rules + 301-редиректы со старых URL готовы", 200);

  return ev;
}
