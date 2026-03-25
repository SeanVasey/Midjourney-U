import { useState, useEffect } from "react";
import type { Section, GlossaryContent } from "../../types/sections";
import SectionHeader from "./SectionHeader";
import BrandedFooter from "../layout/BrandedFooter";
import styles from "./GlossarySlide.module.css";

interface GlossarySlideProps {
  section: Section;
}

export default function GlossarySlide({ section }: GlossarySlideProps) {
  const content = section.content as GlossaryContent;
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.container}>
      <SectionHeader title={section.title} subtitle={section.subtitle} visible={vis} />
      <div
        className={styles.termsList}
        style={{ opacity: vis ? 1 : 0, transition: "opacity 0.5s ease 0.2s" }}
      >
        {content.terms.map((t, i) => (
          <div key={i} className={`${styles.termRow} ${i % 2 === 0 ? styles.termRowEven : ""}`}>
            <code className={styles.term}>{t.term}</code>
            <span className={styles.def}>{t.def}</span>
          </div>
        ))}
      </div>
      <div
        className={styles.resourcesBox}
        style={{ opacity: vis ? 1 : 0, transition: "opacity 0.5s ease 0.35s" }}
      >
        <h4 className={styles.resourcesTitle}>Resources</h4>
        {content.resources.map((r, i) => (
          <div key={i} className={styles.resource}>
            <span className={styles.resourceName}>{r.name}</span>
            <span className={styles.resourceUrl}> &rarr; {r.url}</span>
          </div>
        ))}
      </div>
      <BrandedFooter visible={vis} />
    </div>
  );
}
