import RetroButton from '../../../RetroButton';
import styles from './NavButton.module.scss';

export default function NavButton({ text, icon, isExpanded }) {
  const child = () => {
    return (
      <>
        <div className={styles.button_subcontainer}>
          {isExpanded ? (
            <>
              {icon}
              <div className={styles.button_text}>{text}</div>
            </>
          ) : (
            <>{icon}</>
          )}
        </div>
      </>
    );
  };

  return <RetroButton children={child()} variant="white" />;
}
