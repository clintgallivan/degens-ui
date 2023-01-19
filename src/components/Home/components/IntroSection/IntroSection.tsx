import axios from 'axios';
import { useState } from 'react';

import Alert from '@components/common/Alert';
import RetroButton from '@components/common/RetroButton';
import SpinningCoin from '@components/common/SpinningCoin';
import EmailForm from '@components/Home/components/EmailForm';
import EmailFormButton from '@components/Home/components/EmailFormButton';
import styles from './IntroSection.module.scss';

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
                        <h1>Token Analytics</h1>
                        <h1>for Degens</h1>
                        <p className="fs-l fw-md">
                            The Shitcoin Analytics you&apos;ve always wanted
                        </p>
                    </div>
                    <div className={styles.coin_box}>
                        <SpinningCoin />
                    </div>
                </div>
                <div className={styles.email_container}>
                    <EmailForm onChange={(e: string) => setEmail(e)} />
                    <EmailFormButton onClick={() => handleEmailSubmit()}>Join</EmailFormButton>
                </div>
            </div>
        </>
    );
}
