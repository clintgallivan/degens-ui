import styles from './RetroButton.module.scss';

type ButtonProps = {
  children: any;
  variant?: 'white' | 'orange';
  onClick: any;
};

export default function RetroButton({
  children,
  variant = 'orange',
  onClick,
}: ButtonProps) {
  return (
    <>
      {variant == 'white' ? (
        <button onClick={onClick} className={styles.container_white}>
          {children}
        </button>
      ) : (
        <button onClick={onClick} className={styles.container_orange}>
          {children}
        </button>
      )}
    </>
  );
}
