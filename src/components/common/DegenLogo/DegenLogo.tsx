import styles from './DegenLogo.module.scss';
import LogoIcon from '../../../../public/DegensLogo.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function DegenLogo() {
  return (
    <div className={styles.total_container}>
      <Link className={styles.a_tag} href="/">
        <div className={styles.container}>
          <Image src={LogoIcon} alt="" />
        </div>
      </Link>
    </div>
  );
}
