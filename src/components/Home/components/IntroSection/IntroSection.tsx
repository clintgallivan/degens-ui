import axios from 'axios';
import { useState } from 'react';

import Alert from '@components/common/Alert';
import RetroButton from '@components/common/RetroButton';
import SpinningCoin from '@components/common/SpinningCoin';
import EmailForm from '@components/Home/components/EmailForm';
import EmailFormButton from '@components/Home/components/EmailFormButton';
import styles from './IntroSection.module.scss';
import { BsTwitterX } from 'react-icons/bs';
import { signIn } from 'next-auth/react';

export default function IntroSection() {
    const [email, setEmail] = useState('');
    const [emailAlert, setEmailAlert] = useState(false);
    const [emailSuccessAlert, setEmailSuccessAlert] = useState(false);

    const handleEmailSubmit = async () => {
        const validateEmail = () =>
            String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                );
        if (validateEmail() != null) {
            try {
                const res = await axios.post(
                    '/api/email',
                    { email },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                );
                res.status === 201 ? setEmailSuccessAlert(true) : null;
            } catch (e) {
                setEmailAlert(true);
            }
        } else {
            setEmailAlert(true);
        }
    };

    return (
        <>
            <Alert
                variant="warning"
                header="Invalid Email!"
                text="Please Enter a valid email address."
                show={emailAlert}
                setShow={() => setEmailAlert(false)}
            />
            <Alert
                variant="success"
                header="Email was submitted!"
                // text={''}
                show={emailSuccessAlert}
                setShow={() => setEmailSuccessAlert(false)}
            />
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
                    <EmailFormButton variant="orange" onClick={() => signIn('twitter')}>
                        <div className={styles.sign_in_text_container}>
                            <div className={styles.sign_in_button_text}>Sign in with</div>
                            <BsTwitterX size={20} className={styles.icon} />
                        </div>
                    </EmailFormButton>
                    {/* <EmailForm onChange={(e: string) => setEmail(e)} />
                    <EmailFormButton onClick={() => handleEmailSubmit()}>Join</EmailFormButton> */}
                </div>
            </div>
        </>
    );
}
