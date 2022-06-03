import styles from './RetroLogo.module.scss';
import LogoIcon from '@public/LogoIcon.svg';
import Image from 'next/image';

export default function RetroLogo() {
  return (
    <div className={styles.container}>
      <Image src={LogoIcon} />
    </div>
  );
}
