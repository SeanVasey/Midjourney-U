import styles from "./NavDots.module.css";

interface NavDotsProps {
  current: number;
  total: number;
  onNav: (index: number) => void;
}

export default function NavDots({ current, total, onNav }: NavDotsProps) {
  return (
    <nav className={styles.container} aria-label="Slide navigation">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onNav(i)}
          className={`${styles.dot} ${i === current ? styles.active : styles.inactive}`}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === current ? "step" : undefined}
        />
      ))}
    </nav>
  );
}
