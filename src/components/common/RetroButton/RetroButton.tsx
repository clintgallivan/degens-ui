import styles from './RetroButton.module.scss';

type ButtonProps = {
  children: any;
  variant?: 'white' | 'orange';
};

export default function RetroButton({
  children,
  variant = 'orange',
}: ButtonProps) {
  return (
    <>
      {variant == 'white' ? (
        <button className={styles.container_white}>{children}</button>
      ) : (
        <button className={styles.container_orange}>{children}</button>
      )}
    </>
  );
}
