import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <section className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.message}>
          The page you are looking for does not exist.
        </p>
        <Link className={styles.link} to="/">
          Back to home
        </Link>
      </div>
    </section>
  )
}
