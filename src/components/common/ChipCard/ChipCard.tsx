import Link from 'next/link';
import styles from './ChipCard.module.scss';

export default function ChipCard({ children, button }) {
  if (button) {
    return (
      <Link href="/">
        <a className={styles.container_button}>{children}</a>
      </Link>
    );
  } else {
  }
  return <div className={styles.container}>{children}</div>;
}
