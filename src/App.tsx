import { useDeferredValue, useState } from "react";
import ChatHeader from "./components/ChatHeader";
import ChatMessage from "./components/ChatMessage";
import FindBar from "./components/FindBar";
import items from "./assets/msgs.json";
import type { ChatMessageItem } from "./types/chat";
import { useFindBarVisibility } from "./hooks/useFindBarVisibility";
import { useMatchNavigation } from "./hooks/useMatchNavigation";
import { useScrollToActiveMatch } from "./hooks/useScrollToActiveMatch";
import { buildMatches } from "./utils/search";
import styles from "./App.module.css";

const messages = items as ChatMessageItem[];

function App() {
  const [isOpen, setIsOpen] = useFindBarVisibility();
  const [searchTerm, setSearchTerm] = useState("");

  // The input keeps the live term so keystrokes paint immediately. Everything
  // downstream reads the deferred one, which React renders at transition
  // priority and can throw away when the next key arrives mid-render.
  const deferredTerm = useDeferredValue(searchTerm);
  const isPending = searchTerm !== deferredTerm;

  const matches = buildMatches(messages, deferredTerm);
  const { activeIndex, next, prev, reset } = useMatchNavigation(matches.length);
  useScrollToActiveMatch(activeIndex);

  const activeMatch = matches[activeIndex] ?? null;

  // A new term rebuilds the array, so the old index no longer points anywhere.
  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
    reset();
  };

  return (
    <div className={styles.screen}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <ChatHeader />
        </div>
        <ul className={styles.messages}>
          {messages.map((item) => {
            // Narrowed to primitives so only the two affected bubbles re-render.
            const active =
              activeMatch?.messageId === item.id ? activeMatch : null;

            return (
              <ChatMessage
                key={item.id}
                item={item}
                searchTerm={deferredTerm}
                activeField={active?.field ?? null}
                activeOccurrence={active?.occurrence ?? null}
              />
            );
          })}
        </ul>
      </div>
      {isOpen && (
        <FindBar
          searchTerm={searchTerm}
          onSearchTermChange={handleSearchTermChange}
          isPending={isPending}
          matchCount={matches.length}
          activeIndex={activeIndex}
          onNext={next}
          onPrev={prev}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
