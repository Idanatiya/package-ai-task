import ChatHeader from "./components/ChatHeader";
import ChatMessage from "./components/ChatMessage";
import items from "./assets/msgs.json";
import type { ChatMessageItem } from "./types/chat";
import styles from "./App.module.css";
import { useEffect, useState } from "react";

const messages = items as ChatMessageItem[];

const useOpenFloatingPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      const isCtrlOrCmd = event.metaKey || event.ctrlKey;
      // Create util for it
      if (key.toLowerCase() === "f" && isCtrlOrCmd) {
        event.preventDefault();
        setIsOpen(true);
      }

      if (key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return [isOpen, setIsOpen] as const;
};

function App() {
  const [isOpen, setIsOpen] = useOpenFloatingPanel();
  return (
    <div className={styles.screen}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <ChatHeader />
          {isOpen && <button>Close</button>}
        </div>
        <ul className={styles.messages}>
          {messages.map((item) => (
            <ChatMessage key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
