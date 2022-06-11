import styles from './RetroToken.module.scss';
import LogoIcon from '../../../../public/LogoIcon.svg';
import Image, { ImageLoaderProps } from 'next/image';
import { FaXing } from 'react-icons/fa';

export default function RetroToken({ props }: any) {
  const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <div className={styles.container}>
      {/* <div className={styles.parent}> */}
      <Image
        className={styles.image}
        loader={imageLoader}
        src={props.tokenMetadata[0].image}
        alt=""
        width={100}
        height={100}
      />
    </div>
  );
}
