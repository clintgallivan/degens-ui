import styles from './RetroToken.module.scss';
import Image, { ImageLoaderProps } from 'next/image';

export default function RetroToken({ props }: any) {
  const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <div className={styles.container}>
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
