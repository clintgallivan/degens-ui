import axios from 'axios';
import { useState } from 'react';

import Alert from '@components/common/Alert';
import RetroButton from '@components/common/RetroButton';
import SpinningCoin from '@components/common/SpinningCoin';
import EmailForm from '@components/Home/components/EmailForm';
import SignInButton from '@components/Home/components/SignInButton';
import styles from './IntroSection.module.scss';
import { BsArrowRight, BsTwitterX } from 'react-icons/bs';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function IntroSection({ props }: any) {
    const router = useRouter();

    return (
        <>
            <div className={styles.total_container}>
                <div className={styles.container}>
                    <div>
                        <div style={{ height: 24 }} />

                        <h1 className={styles.h1}>Flex your crypto calls</h1>
                        <div style={{ height: 24 }} />
                        <p className="fs-md fw-t">Rise to the top in the degen community</p>
                        <div style={{ height: 40 }} />
                    </div>
                    <div className={styles.coin_box}>
                        <SpinningCoin />
                    </div>
                </div>
                <div className={styles.email_container}>
                    {props?.session?.user ? (
                        <SignInButton
                            variant="orange"
                            onClick={() => router.push(`/users/${props.session.user.uid}`)}
                        >
                            <div className={styles.sign_in_text_container}>
                                <div className={styles.sign_in_button_text}>View my profile</div>
                                <BsArrowRight size={20} className={styles.icon} />
                            </div>
                        </SignInButton>
                    ) : (
                        <SignInButton variant="orange" onClick={() => signIn('twitter')}>
                            <div className={styles.sign_in_text_container}>
                                <div className={styles.sign_in_button_text}>Sign in with</div>
                                <BsTwitterX size={20} className={styles.icon} />
                            </div>
                        </SignInButton>
                    )}
                </div>
            </div>
        </>
    );
}
