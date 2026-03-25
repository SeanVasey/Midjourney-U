import { useState, useEffect } from "react";
import type { Section, WeightsContent } from "../../types/sections";
import SectionHeader from "./SectionHeader";
import styles from "./WeightsSlide.module.css";

interface WeightsSlideProps {
  section: Section;
}

export default function WeightsSlide({ section }: WeightsSlideProps) {
  const content = section.content as WeightsContent;
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.container}>
      <SectionHeader title={section.title} subtitle={section.subtitle} visible={vis} />
      <p className={styles.intro} style={{ opacity: vis ? 1 : 0, transition: "opacity 0.5s ease 0.25s" }}>
        {content.intro}
      </p>
      <div className={styles.grid}>
        {content.weights.map((w, i) => (
          <div
            key={i}
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "translateY(0)" : "translateY(15px)",
              transition: `all 0.5s var(--ease-out) ${0.3 + i * 0.1}s`,
            }}
          >
            <div className={styles.weightHeader}>
              <code className={styles.weightParam} style={{ color: w.color }}>{w.param}</code>
              <span className={styles.weightName}>{w.name}</span>
              <span className={styles.weightRange}>{w.range} (def: {w.default})</span>
            </div>
            <div className={styles.bar}>
              <div
                className={styles.barFill}
                style={{ background: `linear-gradient(90deg, ${w.color}08, ${w.color}25, ${w.color}40)` }}
              />
              <div className={styles.barSegments}>
                {[w.low, w.mid, w.high].map((label, j) => (
                  <div
                    key={j}
                    className={styles.barSegment}
                    style={{ borderRight: j < 2 ? `1px solid ${w.color}20` : "none" }}
                  >
                    <span className={styles.barSegmentText}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.barLabels}>
              <span className={styles.barLabel}>LOW</span>
              <span className={styles.barLabel}>MID</span>
              <span className={styles.barLabel}>HIGH</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
