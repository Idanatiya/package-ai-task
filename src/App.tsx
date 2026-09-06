import { useState } from "react";
import ChatHeader from "./components/ChatHeader";
import ChatMessage from "./components/ChatMessage";
import FindBar from "./components/FindBar";
import items from "./assets/msgs.json";
import type { ChatMessageItem } from "./types/chat";
import { useFindBarVisibility } from "./hooks/useFindBarVisibility";
import { buildMatches } from "./utils/search";
import styles from "./App.module.css";

const messages = items as ChatMessageItem[];

function App() {
  const [isOpen, setIsOpen] = useFindBarVisibility();
  const [searchTerm, setSearchTerm] = useState("");

  const matches = buildMatches(messages, searchTerm);

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
              searchTerm={searchTerm}
              activeField={null}
              activeOccurrence={null}
            />
          ))}
        </ul>
      </div>
      {isOpen && (
        <FindBar
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          matchCount={matches.length}
          activeIndex={0}
          onNext={() => {}}
          onPrev={() => {}}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
