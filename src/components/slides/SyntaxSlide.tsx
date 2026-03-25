import { useState, useEffect, useCallback } from "react";
import type { Section, SyntaxContent } from "../../types/sections";
import SectionHeader from "./SectionHeader";
import styles from "./SyntaxSlide.module.css";

interface SyntaxSlideProps {
  section: Section;
}

export default function SyntaxSlide({ section }: SyntaxSlideProps) {
  const content = section.content as SyntaxContent;
  const [vis, setVis] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 100);
    return () => clearTimeout(t);
  }, []);

  const copy = useCallback((code: string, i: number) => {
    navigator.clipboard?.writeText(code);
    setCopied(i);
    setTimeout(() => setCopied(null), 1500);
  }, []);

  return (
    <div className={styles.container}>
      <SectionHeader title={section.title} subtitle={section.subtitle} visible={vis} />
      <div className={styles.grid}>
        {content.templates.map((t, i) => (
          <div
            key={i}
            className={styles.card}
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "translateY(0)" : "translateY(12px)",
              transition: `all 0.4s ease ${0.2 + i * 0.06}s`,
            }}
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>{t.label}</span>
              <button
                onClick={() => copy(t.code, i)}
                className={`${styles.copyBtn} ${copied === i ? styles.copied : styles.idle}`}
              >
                {copied === i ? "\u2713 copied" : "copy"}
              </button>
            </div>
            <code className={styles.code}>{t.code}</code>
            <p className={styles.note}>{t.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
