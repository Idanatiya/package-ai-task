import styles from './ChatHeader.module.css'

const info = {
  name: 'John Doe',
  initial: 'J',
  hub: 'NYC',
}

export default function ChatHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.info}>
        <div className={styles.avatar}>{info.initial}</div>
        <div className={styles.details}>
          <div className={styles.name}>{info.name}</div>
          <div className={styles.hub}>{info.hub}</div>
        </div>
      </div>
    </div>
  )
}
