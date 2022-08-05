import Image, { ImageLoaderProps } from 'next/image';
import { signIn } from 'next-auth/react';
import RetroButton from '../RetroButton';
import { BsTwitter } from 'react-icons/bs';
import { FiTwitter, FiLogIn } from 'react-icons/fi';
import styles from './HeaderSignIn.module.scss';

export default function HeaderSignIn({ props }: any) {
  return (
    <div className={styles.container} onClick={() => signIn('twitter')}>
      <BsTwitter className={styles.twitter_icon} />
      <div className={styles.text}>Sign in with Twitter</div>
    </div>
  );
}
