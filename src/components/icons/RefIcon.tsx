import type { CSSProperties } from "react";

interface RefIconProps {
  type: string;
  size?: number;
  color?: string;
}

export default function RefIcon({ type, size = 24, color = "#ffffff" }: RefIconProps) {
  const s: CSSProperties = { width: size, height: size, flexShrink: 0 };
  const stroke = { fill: "none", stroke: color, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  switch (type) {
    case "image":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      );
    case "style":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      );
    case "character":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "omni":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
          <path d="M2 12h20" />
        </svg>
      );
    case "target":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case "layers":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      );
    case "refresh":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <path d="M23 4v6h-6" />
          <path d="M1 20v-6h6" />
          <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
        </svg>
      );
    case "alert":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case "zap":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "mask":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <path d="M12 3c-4.97 0-9 3.13-9 7s4.03 7 9 7 9-3.13 9-7-4.03-7-9-7z" />
          <circle cx="8.5" cy="9" r="1" />
          <circle cx="15.5" cy="9" r="1" />
          <path d="M9 13s1.5 2 3 2 3-2 3-2" />
        </svg>
      );
    case "camera":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      );
    case "wand":
      return (
        <svg viewBox="0 0 24 24" style={s} {...stroke}>
          <path d="M15 4l-1 1 4 4 1-1a2.83 2.83 0 00-4-4z" />
          <path d="M14 5L3 16l4 4 11-11z" />
          <line x1="9" y1="2" x2="9" y2="5" />
          <line x1="2" y1="9" x2="5" y2="9" />
          <line x1="15" y1="19" x2="15" y2="22" />
          <line x1="19" y1="15" x2="22" y2="15" />
        </svg>
      );
    default:
      return (
        <div
          style={{
            ...s,
            borderRadius: "50%",
            background: `${color}22`,
            border: `1px solid ${color}44`,
          }}
        />
      );
  }
}
