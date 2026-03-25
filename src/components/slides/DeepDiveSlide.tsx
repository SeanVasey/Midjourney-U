import { useState, useEffect } from "react";
import type { Section, DeepDiveContent } from "../../types/sections";
import RefIcon from "../icons/RefIcon";
import SectionHeader from "./SectionHeader";
import styles from "./DeepDiveSlide.module.css";

interface DeepDiveSlideProps {
  section: Section;
}

export default function DeepDiveSlide({ section }: DeepDiveSlideProps) {
  const content = section.content as DeepDiveContent;
  const accent = section.accent || "#4ECDC4";
  const icon = section.icon || "style";
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.headerIcon} style={{ background: `${accent}10` }}>
          <RefIcon type={icon} size={16} color={accent} />
        </div>
        <div style={{ flex: 1 }}>
          <SectionHeader title={section.title} subtitle={section.subtitle} visible={vis} accent={accent} />
        </div>
      </div>

      {/* What is it? */}
      <div
        className={styles.whatBox}
        style={{
          background: `${accent}08`,
          border: `1px solid ${accent}18`,
          opacity: vis ? 1 : 0,
          transition: "opacity 0.5s ease 0.2s",
        }}
      >
        <h4 className={styles.whatLabel} style={{ color: accent }}>What is it?</h4>
        <p className={styles.whatText}>{content.what}</p>
      </div>

      {/* Syntax */}
      <div className={styles.syntaxBox} style={{ opacity: vis ? 1 : 0, transition: "opacity 0.5s ease 0.3s" }}>
        <h4 className={styles.syntaxLabel}>Syntax</h4>
        <code className={styles.syntaxCode} style={{ color: accent }}>
          /imagine {content.syntax}
        </code>
      </div>

      {/* Key Points */}
      <div className={styles.keyPoints} style={{ opacity: vis ? 1 : 0, transition: "opacity 0.5s ease 0.35s" }}>
        {content.keyPoints.map((kp, i) => (
          <div key={i} className={styles.keyPoint}>
            <span className={styles.keyPointLabel} style={{ color: accent }}>{kp.label}</span>
            <span className={styles.keyPointValue}>{kp.value}</span>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className={styles.tipsSection} style={{ opacity: vis ? 1 : 0, transition: "opacity 0.5s ease 0.4s" }}>
        <h4 className={styles.tipsLabel}>Tips &amp; Best Practices</h4>
        {content.tips.map((tip, i) => (
          <div key={i} className={styles.tipItem}>
            <span className={styles.tipBullet} style={{ color: accent }}>&rsaquo;</span>
            <span className={styles.tipText}>{tip}</span>
          </div>
        ))}
      </div>

      {/* Style Versions */}
      {content.versions && (
        <div className={styles.versionsSection} style={{ opacity: vis ? 1 : 0, transition: "opacity 0.5s ease 0.45s" }}>
          <h4 className={styles.versionsLabel}>Style Versions (--sv)</h4>
          <div className={styles.versionsGrid}>
            {content.versions.map((v, i) => (
              <div key={i} className={styles.versionRow}>
                <code className={styles.versionCode} style={{ color: accent }}>{v.v}</code>
                <span className={styles.versionDesc}>{v.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analogy */}
      <div
        className={styles.analogyBox}
        style={{
          background: `linear-gradient(135deg, ${accent}10, ${accent}05)`,
          border: `1px solid ${accent}15`,
          opacity: vis ? 1 : 0,
          transition: "opacity 0.5s ease 0.5s",
        }}
      >
        <p className={styles.analogyText}>
          <span className={styles.analogyLabel} style={{ color: accent }}>Audio Analogy: </span>
          {content.analogy}
        </p>
      </div>

      {/* Important note */}
      {content.important && (
        <div className={styles.importantBox} style={{ opacity: vis ? 1 : 0, transition: "opacity 0.5s ease 0.55s" }}>
          <p className={styles.importantText}>
            <span className={styles.importantLabel}>{"\u26A0"} Note: </span>
            {content.important}
          </p>
        </div>
      )}
    </div>
  );
}
