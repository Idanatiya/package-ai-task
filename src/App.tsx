import { useDeferredValue, useEffect, useMemo, useState } from "react";
import ChatHeader from "./components/ChatHeader";
import ChatMessage from "./components/ChatMessage";
import FindBar from "./components/FindBar";
import items from "./assets/msgs.json";
import type { ChatMessageItem } from "./types/chat";
import { useFindBarVisibility } from "./hooks/useFindBarVisibility";
import { useMatchNavigation } from "./hooks/useMatchNavigation";
import { buildMatches } from "./utils/search";
import styles from "./App.module.css";

const messages = items as ChatMessageItem[];

function App() {
  const [isOpen, setIsOpen] = useFindBarVisibility();
  const [searchTerm, setSearchTerm] = useState("");

  const deferredTerm = useDeferredValue(searchTerm);
  const isPending = searchTerm !== deferredTerm;

  const matches = useMemo(
    () => buildMatches(messages, deferredTerm),
    [deferredTerm],
  );
  const { activeIndex, next, prev, reset } = useMatchNavigation(matches.length);

  useEffect(() => {
    reset();
  }, [deferredTerm, reset]);

  const highlightTerm = isOpen ? deferredTerm : "";
  const highlightMatch = isOpen ? (matches[activeIndex] ?? null) : null;

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className={styles.screen}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <ChatHeader />
        </div>
        <ul className={styles.messages}>
          {messages.map((item) => (
            <ChatMessage
              key={item.id}
              item={item}
              searchTerm={highlightTerm}
              activeMatch={
                highlightMatch?.messageId === item.id ? highlightMatch : null
              }
            />
          ))}
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
