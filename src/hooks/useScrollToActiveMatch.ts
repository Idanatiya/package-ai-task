import { useCallback } from "react";
import highlightStyles from "../components/HighlightedText.module.css";

const ACTIVE_MATCH_SELECTOR = `.${highlightStyles.active}`;

/** Returns a scroll fn to call after next/prev — not on search term changes. */
export function useScrollToActiveMatch() {
  return useCallback(() => {
    requestAnimationFrame(() => {
      document
        .querySelector(ACTIVE_MATCH_SELECTOR)
        ?.scrollIntoView({ block: "center" });
    });
  }, []);
}
