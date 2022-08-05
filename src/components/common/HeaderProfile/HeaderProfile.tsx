import Image, { ImageLoaderProps } from 'next/image';
import RetroButton from '../RetroButton';
import styles from './HeaderProfile.module.scss';

export default function HeaderProfile({ props }: any) {
  const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
    // return `${src}?w=${width}&q=${quality || 75}`;
    return src;
  };

  console.log(props);
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        loader={imageLoader}
        src={props?.session?.user?.image}
        alt=""
        width={50}
        height={50}
      />
    </div>
  );
}
