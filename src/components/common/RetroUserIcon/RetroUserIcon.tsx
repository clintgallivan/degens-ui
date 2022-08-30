import styles from './RetroUserIcon.module.scss';
import Image, { ImageLoaderProps } from 'next/image';

export default function RetroUserIcon({ props }: any) {
  const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
    // return `${src}?w=${width}&q=${quality || 75}`;
    return src;
  };
  // console.log(props.user[0].image);
  return (
    <div className={styles.container}>
      <Image
        unoptimized
        className={styles.image}
        loader={imageLoader}
        src={props.user[0].image_hi_res}
        alt=""
        width={100}
        height={100}
      />
    </div>
  );
}
