import { useEffect } from "react";
import highlightStyles from "../components/HighlightedText.module.css";

const ACTIVE_MATCH_SELECTOR = `.${highlightStyles.active}`;

/**
 * Keyed on the search term as well as the index: a new term resets the index to
 * 0, which on its own would not re-run the effect when it was already 0.
 */
export function useScrollToActiveMatch(
  activeIndex: number,
  searchTerm: string,
) {
  useEffect(() => {
    document
      .querySelector(ACTIVE_MATCH_SELECTOR)
      ?.scrollIntoView({ block: "center" });
  }, [activeIndex, searchTerm]);
}
