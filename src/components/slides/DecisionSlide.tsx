import { useState, useEffect } from "react";
import type { Section, DecisionContent } from "../../types/sections";
import SectionHeader from "./SectionHeader";
import styles from "./DecisionSlide.module.css";

interface DecisionSlideProps {
  section: Section;
}

export default function DecisionSlide({ section }: DecisionSlideProps) {
  const content = section.content as DecisionContent;
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.container}>
      <SectionHeader title={section.title} subtitle={section.subtitle} visible={vis} />
      <div className={styles.grid}>
        {content.questions.map((q, qi) => (
          <div
            key={qi}
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "translateY(0)" : "translateY(15px)",
              transition: `all 0.5s ease ${0.2 + qi * 0.15}s`,
            }}
          >
            <h3 className={styles.question}>{q.q}</h3>
            <div className={styles.answers}>
              {q.answers.map((a, ai) => (
                <div
                  key={ai}
                  className={styles.answer}
                  style={{
                    background: `${a.color}08`,
                    border: `1px solid ${a.color}18`,
                  }}
                >
                  <span className={styles.answerText}>{a.a}</span>
                  <span className={styles.arrow}>&rarr;</span>
                  <code className={styles.result} style={{ color: a.color }}>{a.result}</code>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
