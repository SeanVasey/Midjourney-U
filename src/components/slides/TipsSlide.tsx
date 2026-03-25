import { useState, useEffect } from "react";
import type { Section, TipsContent } from "../../types/sections";
import RefIcon from "../icons/RefIcon";
import SectionHeader from "./SectionHeader";
import styles from "./TipsSlide.module.css";

interface TipsSlideProps {
  section: Section;
}

export default function TipsSlide({ section }: TipsSlideProps) {
  const content = section.content as TipsContent;
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.container}>
      <SectionHeader title={section.title} subtitle={section.subtitle} visible={vis} />
      <div className={styles.grid}>
        {content.tips.map((tip, i) => (
          <div
            key={i}
            className={styles.card}
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "translateX(0)" : "translateX(-15px)",
              transition: `all 0.5s var(--ease-out) ${0.2 + i * 0.07}s`,
            }}
          >
            <div className={styles.iconWrap}>
              <RefIcon type={tip.icon} size={16} color="#4ECDC4" />
            </div>
            <div>
              <h4 className={styles.title}>{tip.title}</h4>
              <p className={styles.body}>{tip.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
