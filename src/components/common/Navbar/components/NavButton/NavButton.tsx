import React from 'react';
import Link from 'next/link';
import RetroButton from '@components/common/RetroButton';
import styles from './NavButton.module.scss';

type NavButtonProps = {
  text: string;
  icon: any;
  isExpanded: boolean;
};

export default function NavButton({ text, icon, isExpanded }: NavButtonProps) {
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

  return (
    <Link href="/token-leaderboards">
      <a className={styles.a_tag}>
        <RetroButton variant="white">{child()}</RetroButton>
      </a>
    </Link>
  );
}
