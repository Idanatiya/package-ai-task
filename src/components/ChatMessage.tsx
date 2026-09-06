import clsx from "clsx";
import { Headset, LifeBuoy, UserRound, type LucideIcon } from "lucide-react";
import type { ChatMessageItem, SearchMatch } from "../types/chat";
import HighlightedText from "./HighlightedText";
import styles from "./ChatMessage.module.css";

type ChatMessageProps = {
  item: ChatMessageItem;
  searchTerm: string;
  activeMatch: SearchMatch | null;
};

const SENDER_ICONS: Record<string, LucideIcon> = {
  "Customer Service": Headset,
  Support: LifeBuoy,
  Agent: UserRound,
};

function getAvatarInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

function renderAvatar(from: string) {
  const Icon = SENDER_ICONS[from];
  if (Icon) return <Icon size={18} aria-hidden />;

  return getAvatarInitials(from);
}

export default function ChatMessage({
  item,
  searchTerm,
  activeMatch,
}: ChatMessageProps) {
  const isIncoming = item.incoming;

  return (
    <li className={clsx(styles.message, !isIncoming && styles.outgoing)}>
      <div
        className={clsx(
          styles.avatar,
          isIncoming ? styles.avatarIncoming : styles.avatarOutgoing,
        )}
      >
        {renderAvatar(item.from)}
      </div>
      <div
        className={clsx(
          styles.bubble,
          isIncoming ? styles.bubbleIncoming : styles.bubbleOutgoing,
        )}
      >
        <div className={clsx(styles.meta, !isIncoming && styles.metaOutgoing)}>
          <span
            className={clsx(
              styles.from,
              isIncoming ? styles.fromIncoming : styles.fromOutgoing,
            )}
          >
            <HighlightedText
              text={item.from}
              searchTerm={searchTerm}
              activeOccurrence={
                activeMatch?.field === "from" ? activeMatch.occurrence : null
              }
            />
          </span>
        </div>
        <p className={styles.text}>
          <HighlightedText
            text={item.text}
            searchTerm={searchTerm}
            activeOccurrence={
              activeMatch?.field === "text" ? activeMatch.occurrence : null
            }
          />
        </p>
        <div
          className={clsx(
            styles.timestampRow,
            isIncoming && styles.timestampRowIncoming,
          )}
        >
          <span
            className={clsx(
              styles.timestamp,
              isIncoming && styles.timestampIncoming,
            )}
          >
            {item.created}
          </span>
        </div>
      </div>
    </li>
  );
}