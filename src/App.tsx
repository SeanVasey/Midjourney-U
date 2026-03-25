import { SECTIONS } from "./data/sections";
import useSlideNavigation from "./hooks/useSlideNavigation";
import GrainOverlay from "./components/chrome/GrainOverlay";
import ProgressBar from "./components/chrome/ProgressBar";
import NavDots from "./components/chrome/NavDots";
import SlideNav from "./components/chrome/SlideNav";
import HeaderBar from "./components/chrome/HeaderBar";
import SlideRenderer from "./components/slides/SlideRenderer";
import styles from "./App.module.css";

export default function App() {
  const {
    currentSlide,
    transitioning,
    direction,
    containerRef,
    goTo,
    next,
    prev,
    handleTouchStart,
    handleTouchEnd,
  } = useSlideNavigation({ totalSlides: SECTIONS.length });

  const slideClass = transitioning
    ? direction > 0
      ? styles.exitLeft
      : styles.exitRight
    : styles.visible;

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={styles.app}
    >
      <GrainOverlay />
      <ProgressBar current={currentSlide} total={SECTIONS.length} />
      <NavDots current={currentSlide} total={SECTIONS.length} onNav={goTo} />

      {currentSlide > 0 && (
        <HeaderBar sectionTitle={SECTIONS[currentSlide]?.title || ""} />
      )}

      <div className={`${styles.slideWrapper} ${slideClass}`}>
        <SlideRenderer section={SECTIONS[currentSlide]} />
      </div>

      <SlideNav
        current={currentSlide}
        total={SECTIONS.length}
        onPrev={prev}
        onNext={next}
      />
    </div>
  );
}
