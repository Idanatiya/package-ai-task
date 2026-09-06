import { useCallback } from "react";
import { useMatchNavigation } from "./useMatchNavigation";
import { useScrollToActiveMatch } from "./useScrollToActiveMatch";

/** Only scroll to active match on explicit next/prev. */
export function useFindNavigation(matchCount: number) {
  const { activeIndex, next, prev, reset } = useMatchNavigation(matchCount);
  const scrollToActiveMatch = useScrollToActiveMatch();

  const goNext = useCallback(() => {
    next();
    scrollToActiveMatch();
  }, [next, scrollToActiveMatch]);

  const goPrev = useCallback(() => {
    prev();
    scrollToActiveMatch();
  }, [prev, scrollToActiveMatch]);

  return { activeIndex, next: goNext, prev: goPrev, reset };
}
