import { PiSealCheckDuotone, PiSealCheckFill } from 'react-icons/pi';
import styles from './RetroUserIcon.module.scss';
import Image, { ImageLoaderProps } from 'next/image';
import { FaCheck } from 'react-icons/fa';

export default function RetroUserIcon({ props }: any) {
    const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
        // return `${src}?w=${width}&q=${quality || 75}`;
        return src;
    };

    return (
        <div className={styles.container}>
            {props.user[0] ? (
                <>
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
                    {props.user[0]?.verified && (
                        <>
                            <div className={styles.checkmark_container}>
                                <PiSealCheckFill size={33} color="var(--orange-30)" />
                            </div>
                            <div className={styles.checkmark_container}>
                                <PiSealCheckDuotone size={33} color="var(--purple-30)" />
                            </div>
                        </>
                    )}
                </>
            ) : (
                <div className={styles.no_image}></div>
            )}
        </div>
    );
}
