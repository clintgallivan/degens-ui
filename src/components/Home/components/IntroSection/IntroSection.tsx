import styles from './IntroSection.module.scss';

export default function IntroSection() {
  return (
    <div className={styles.container}>
      <h1>Token Analytics</h1>
      <h1>for Degens</h1>
      <p className="fs-l fw-md">The Shitcoin Analytics you've always wanted</p>
    </div>
  );
}
