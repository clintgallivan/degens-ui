import styles from './RetroButton.module.scss';

type ButtonProps = {
  children: any;
  variant?: 'purple' | 'dark_purple' | 'orange' | 'twitterBlue';
  onClick?: any;
};

export default function RetroButton({
  children,
  variant = 'orange',
  onClick,
}: ButtonProps) {
  return (
    <>
      {variant == 'purple' ? (
        <button onClick={onClick} className={styles.container_purple}>
          {children}
        </button>
      ) : variant == 'dark_purple' ? (
        <button onClick={onClick} className={styles.container_dark_purple}>
          {children}
        </button>
      ) : variant == 'orange' ? (
        <button onClick={onClick} className={styles.container_orange}>
          {children}
        </button>
      ) : variant == 'twitterBlue' ? (
        <button onClick={onClick} className={styles.container_twitter_blue}>
          {children}
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
