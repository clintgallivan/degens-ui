import styles from './SocialLinksInputCard.module.scss';

export default function SocialLinksInputCard({ props }: any) {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder="Paste link here"
        type="url"
        name="name"
        // onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
