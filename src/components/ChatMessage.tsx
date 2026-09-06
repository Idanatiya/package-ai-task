import type { ChatMessageItem, SearchableField } from "../types/chat";
import HighlightedText from "./HighlightedText";
import styles from "./ChatMessage.module.css";

type ChatMessageProps = {
  item: ChatMessageItem;
  searchTerm: string;
  /** Set only on the message holding the active match, null on every other. */
  activeField: SearchableField | null;
  activeOccurrence: number | null;
};

function getAvatarInitials(name: ChatMessageItem["from"]) {
  const parts = name.split(" ").map((part) => part[0]);
  return parts.join("");
}

export default function ChatMessage({
  item,
  searchTerm,
  activeField,
  activeOccurrence,
}: ChatMessageProps) {
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
            <HighlightedText
              text={item.from}
              searchTerm={searchTerm}
              activeOccurrence={activeField === "from" ? activeOccurrence : null}
            />
          </span>
        </div>
        <p className={styles.text}>
          <HighlightedText
            text={item.text}
            searchTerm={searchTerm}
            activeOccurrence={activeField === "text" ? activeOccurrence : null}
          />
        </p>
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
