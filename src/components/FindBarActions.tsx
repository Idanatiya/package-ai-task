import { ChevronDown, ChevronUp, X } from "lucide-react";
import styles from "./FindBar.module.css";

type FindBarActionsProps = {
  hasMatches: boolean;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
};

export default function FindBarActions({
  hasMatches,
  onPrev,
  onNext,
  onClose,
}: FindBarActionsProps) {
  return (
    <>
      <button
        type="button"
        className={styles.button}
        onClick={onPrev}
        disabled={!hasMatches}
        aria-label="Previous match"
      >
        <ChevronUp size={16} />
      </button>
      <button
        type="button"
        className={styles.button}
        onClick={onNext}
        disabled={!hasMatches}
        aria-label="Next match"
      >
        <ChevronDown size={16} />
      </button>
      <button
        type="button"
        className={styles.button}
        onClick={onClose}
        aria-label="Close find bar"
      >
        <X size={16} />
      </button>
    </>
  );
}
