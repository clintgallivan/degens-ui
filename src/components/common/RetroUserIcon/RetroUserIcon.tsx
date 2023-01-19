import styles from './RetroUserIcon.module.scss';
import Image, { ImageLoaderProps } from 'next/image';

export default function RetroUserIcon({ props }: any) {
    const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
        console.log('yo');
        // return `${src}?w=${width}&q=${quality || 75}`;
        return src;
    };

    return (
        <div className={styles.container}>
            {props.user[0] ? (
                <Image
                    unoptimized
                    className={styles.image}
                    loader={imageLoader}
                    src={
                        props.user[0]?.image_hi_res ||
                        'https://pbs.twimg.com/profile_images/1536616627298480128/pd9pc9LD.png'
                    }
                    alt=""
                    width={95}
                    height={95}
                />
            ) : (
                <div className={styles.no_image}></div>
            )}
        </div>
    );
}
