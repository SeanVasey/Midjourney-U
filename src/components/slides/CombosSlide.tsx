import { useState, useEffect } from "react";
import type { Section, CombosContent } from "../../types/sections";
import SectionHeader from "./SectionHeader";
import styles from "./CombosSlide.module.css";

interface CombosSlideProps {
  section: Section;
}

const SIGNAL_CLASS: Record<string, string> = {
  green: styles.signalGreen,
  yellow: styles.signalYellow,
  orange: styles.signalOrange,
};

export default function CombosSlide({ section }: CombosSlideProps) {
  const content = section.content as CombosContent;
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
        {content.combos.map((c, i) => (
          <div
            key={i}
            className={styles.card}
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "translateY(0)" : "translateY(15px)",
              transition: `all 0.5s var(--ease-out) ${0.3 + i * 0.08}s`,
            }}
          >
            <div className={styles.cardHeader}>
              <div className={`${styles.signal} ${SIGNAL_CLASS[c.signal]}`} />
              <h3 className={styles.cardTitle}>{c.name}</h3>
            </div>
            <code className={styles.formula}>{c.formula}</code>
            <p className={styles.desc}>{c.desc}</p>
            <p className={styles.useCase}>
              <span className={styles.useCaseLabel}>Use case: </span>{c.useCase}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
