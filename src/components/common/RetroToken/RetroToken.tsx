import styles from './RetroToken.module.scss';
import LogoIcon from '../../../../public/LogoIcon.svg';
import Image from 'next/image';
import { FaXing } from 'react-icons/fa';

export default function RetroToken({ props }) {
  return (
    <div className={styles.container}>
      {/* <div className={styles.parent}> */}
      <Image
        className={styles.image}
        loader={() => props.tokenMetadata[0].image}
        src={props.tokenMetadata[0].image}
        width={100}
        height={100}
      />
    </div>
  );
}
