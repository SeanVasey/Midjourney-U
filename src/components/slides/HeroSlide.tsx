import { useState, useEffect } from "react";
import VMLogo from "../icons/VMLogo";
import MJIcon from "../icons/MJIcon";
import RefIcon from "../icons/RefIcon";
import styles from "./HeroSlide.module.css";

const REF_ICONS = [
  { type: "image", color: "#FF6B6B", label: "Image" },
  { type: "style", color: "#4ECDC4", label: "Style" },
  { type: "character", color: "#A78BFA", label: "Char" },
  { type: "omni", color: "#F59E0B", label: "Omni" },
] as const;

const STATS = [
  { label: "V7 CURRENT", sub: "Default model" },
  { label: "4 REF TYPES", sub: "Image \u00B7 Style \u00B7 Char \u00B7 Omni" },
  { label: "COMBINABLE", sub: "Layer for precision" },
] as const;

export default function HeroSlide() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const vis = loaded ? styles.fadein : styles.fadeout;

  return (
    <div className={styles.container}>
      <div className={styles.bgGradient} />
      <div className={styles.orbTeal} />
      <div className={styles.orbPurple} />

      <div className={`${styles.content} ${loaded ? styles.loaded : styles.loading}`}>
        {/* VM Logo stamp */}
        <div className={vis} style={{ marginBottom: 16, display: "flex", justifyContent: "center", transition: "opacity 0.6s ease 0.1s" }}>
          <VMLogo size={28} opacity={0.35} />
        </div>

        <p className={`${styles.presents} ${vis}`}>VASEY MULTIMEDIA PRESENTS</p>

        {/* Main title */}
        <div className={styles.titleRow} style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(15px)" }}>
          <div className={styles.mjIcon}>
            <MJIcon size={30} />
          </div>
          <h1 style={{ margin: 0, display: "flex", alignItems: "flex-end", gap: 0, lineHeight: 1 }}>
            <span className={styles.titleText}>Midjourney</span>
            <span className={styles.titleU}>U</span>
          </h1>
        </div>

        <p className={`${styles.unofficial} ${vis}`}>THE UNOFFICIAL UNIVERSITY</p>

        {/* Reference type icons */}
        <div className={`${styles.iconRow} ${vis}`}>
          {REF_ICONS.map((ic, i) => (
            <div
              key={i}
              className={styles.iconItem}
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(10px)",
                transition: `all 0.5s ease ${0.55 + i * 0.08}s`,
              }}
            >
              <RefIcon type={ic.type} size={16} color={ic.color} />
              <span className={styles.iconLabel} style={{ color: `${ic.color}88` }}>{ic.label}</span>
            </div>
          ))}
        </div>

        <h2 className={`${styles.refTitle} ${vis}`}>The Reference System</h2>

        <div className={`${styles.refTypes} ${vis}`}>
          <span className={styles.refTypesText}>
            Mastering{" "}
            <span style={{ color: "#FF6B6B", whiteSpace: "nowrap" }}>Image Prompts</span>,{" "}
            <span style={{ color: "#4ECDC4", whiteSpace: "nowrap" }}>Style References</span>,{" "}
            <span style={{ color: "#A78BFA", whiteSpace: "nowrap" }}>Character References</span>{" "}
            <span style={{ color: "rgba(255,255,255,0.35)" }}>&amp;</span>{" "}
            <span style={{ color: "#F59E0B", whiteSpace: "nowrap" }}>Omni References</span>
          </span>
        </div>

        <div className={`${styles.statsGrid} ${vis}`}>
          {STATS.map((b, i) => (
            <div key={i} className={styles.statCard}>
              <div className={styles.statLabel}>{b.label}</div>
              <div className={styles.statSub}>{b.sub}</div>
            </div>
          ))}
        </div>

        <p className={`${styles.cta} ${vis}`}>SWIPE OR TAP TO BEGIN</p>
      </div>
    </div>
  );
}
