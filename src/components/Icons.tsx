type P = { className?: string };

const base = (props: P) => ({
  className: props.className ?? "h-4 w-4",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
});

export const IconLens = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2" />
  </svg>
);

export const IconChip = (p: P) => (
  <svg {...base(p)}>
    <rect x="7" y="7" width="10" height="10" />
    <rect x="10" y="10" width="4" height="4" />
    <path d="M9 7V4M12 7V4M15 7V4M9 20v-3M12 20v-3M15 20v-3M7 9H4M7 12H4M7 15H4M20 9h-3M20 12h-3M20 15h-3" />
  </svg>
);

export const IconBoard = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="5" width="17" height="14" />
    <rect x="6.5" y="8" width="5" height="4" />
    <path d="M14 8h4M14 10.5h4M14 13h2.5M6.5 15.5h5M18.5 15v1.5M16 19v2M8 19v2" />
  </svg>
);

export const IconGlobe = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c-2.8 2.3-4.2 5.1-4.2 8.5s1.4 6.2 4.2 8.5c2.8-2.3 4.2-5.1 4.2-8.5S14.8 5.8 12 3.5Z" />
  </svg>
);

export const IconBox = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" />
    <path d="M4 7l8 4 8-4M12 11v9" />
  </svg>
);

export const IconArrowR = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 12h15M14 6.5 19.5 12 14 17.5" />
  </svg>
);

export const IconTerminal = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="4.5" width="17" height="15" />
    <path d="M7 9l3.5 3L7 15M13 15h4.5" />
  </svg>
);

export const IconSearch = (p: P) => (
  <svg {...base(p)}>
    <circle cx="10.5" cy="10.5" r="6" />
    <path d="M15.2 15.2 20 20" />
  </svg>
);

export const IconX = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconCopy = (p: P) => (
  <svg {...base(p)}>
    <rect x="8.5" y="8.5" width="11" height="11" />
    <path d="M15.5 5.5v-1h-11v11h1" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg {...base(p)}>
    <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
  </svg>
);

export const IconWarn = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3.5 2.5 20h19L12 3.5Z" />
    <path d="M12 10v4.5M12 17.2v.6" />
  </svg>
);

export const IconPlay = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 4.5v15l12-7.5L7 4.5Z" />
  </svg>
);

export const IconReset = (p: P) => (
  <svg {...base(p)}>
    <path d="M4.5 12a7.5 7.5 0 1 1 2.2 5.3M4.5 12V6.5M4.5 12H10" />
  </svg>
);

export const IconFolder = (p: P) => (
  <svg {...base(p)}>
    <path d="M3.5 6.5h6l2 2.5h9v9.5h-17v-12Z" />
  </svg>
);

export const IconFile = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 3.5h8l4 4v13H6v-17Z" />
    <path d="M14 3.5v4h4" />
  </svg>
);

export const IconWrench = (p: P) => (
  <svg {...base(p)}>
    <path d="M14.5 6.5a4 4 0 0 1 5-1l-3 3 .5 2.5 2.5.5 3-3a4 4 0 0 1-5.5 4.5L8 22l-2.5-2.5 9-8.5a4 4 0 0 1 0-4.5Z" transform="scale(0.82) translate(1.5 1.5)" />
  </svg>
);

export const IconSignal = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 18.5c0-6.9 5.6-12.5 12.5-12.5M4 18.5C4 13.8 7.8 10 12.5 10M4 18.5c0-2.5 2-4.5 4.5-4.5" />
    <circle cx="4.8" cy="18" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const IconCable = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 3.5v5a3 3 0 0 0 3 3h4a3 3 0 0 1 3 3v6" />
    <path d="M5 3.5h4M15 20.5h4M7 6h4M13 18h4" />
  </svg>
);

export const IconDoc = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 3.5h8l4 4v13H6v-17Z" />
    <path d="M14 3.5v4h4M9 12h6M9 15h6M9 9h2" />
  </svg>
);
