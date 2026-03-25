import VMLogo from "../icons/VMLogo";
import styles from "./SlideNav.module.css";

interface SlideNavProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function SlideNav({ current, total, onPrev, onNext }: SlideNavProps) {
  const isFirst = current === 0;
  const isLast = current === total - 1;

  return (
    <div className={styles.bar}>
      <button
        onClick={onPrev}
        disabled={isFirst}
        className={`${styles.button} ${isFirst ? styles.disabled : styles.enabled}`}
        aria-label="Previous slide"
      >
        &#8249;
      </button>
      <VMLogo size={14} opacity={0.25} />
      <span className={styles.counter}>
        {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <button
        onClick={onNext}
        disabled={isLast}
        className={`${styles.button} ${isLast ? styles.disabled : styles.enabled}`}
        aria-label="Next slide"
      >
        &#8250;
      </button>
    </div>
  );
}
