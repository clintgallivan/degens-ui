import styles from './DegenLogo.module.scss';
import LogoIcon from '../../../../public/DegensLogo.svg';
import Image from 'next/image';

export default function DegenLogo() {
  return (
    <div className={styles.container}>
      <Image src={LogoIcon} />
      {/* // </div> */}
    </div>
  );
}
