import type { ChatMessageItem } from "../types/chat";
import styles from "./ChatMessage.module.css";

type ChatMessageProps = {
  item: ChatMessageItem;
};

function getAvatarInitials(name: ChatMessageItem["from"]) {
  const parts = name.split(" ").map((part) => part[0]);
  return parts.join("");
}

export default function ChatMessage({ item }: ChatMessageProps) {
  const isIncoming = item.incoming;

  return (
    <li
      className={`${styles.message} ${isIncoming ? "" : styles.outgoing}`.trim()}
    >
      <div
        className={`${styles.avatar} ${
          isIncoming ? styles.avatarIncoming : styles.avatarOutgoing
        }`}
      >
        {getAvatarInitials(item.from)}
      </div>
      <div
        className={`${styles.bubble} ${
          isIncoming ? styles.bubbleIncoming : styles.bubbleOutgoing
        }`}
      >
        <div
          className={`${styles.meta} ${
            isIncoming ? "" : styles.metaOutgoing
          }`.trim()}
        >
          <span
            className={`${styles.from} ${
              isIncoming ? styles.fromIncoming : styles.fromOutgoing
            }`}
          >
            {item.from}
          </span>
        </div>
        <p className={styles.text}>{item.text}</p>
        <div
          className={`${styles.timestampRow} ${
            isIncoming ? styles.timestampRowIncoming : ""
          }`.trim()}
        >
          <span
            className={`${styles.timestamp} ${
              isIncoming ? styles.timestampIncoming : ""
            }`.trim()}
          >
            {item.created}
          </span>
        </div>
      </div>
    </li>
  );
}
