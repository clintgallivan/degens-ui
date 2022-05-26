import { useState } from 'react';
import Alert from '../../../common/Alert';

import RetroButton from '../../../common/RetroButton';
import SpinningCoin from '../../../common/SpinningCoin';
import EmailForm from '../EmailForm';
import EmailFormButton from '../EmailFormButton';
import styles from './IntroSection.module.scss';

export default function IntroSection() {
  const [email, setEmail] = useState('');
  const [emailAlert, setEmailAlert] = useState(false);

  const handleEmailSubmit = () => {
    const validateEmail = () => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    if (validateEmail() != null) {
      // postToDB()
      console.log('true');
    } else {
      setEmailAlert(true);
      console.log('false');
    }
  };

  return (
    <>
      <Alert
        variant="warning"
        header={'Invalid Email!'}
        text={'Please Enter a valid email address.'}
        show={emailAlert}
        setShow={() => setEmailAlert(false)}
      />
      <div className={styles.total_container}>
        <div className={styles.container}>
          <div>
            <h1>Token Analytics</h1>
            <h1>for Degens</h1>
            <p className="fs-l fw-md">
              The Shitcoin Analytics you've always wanted
            </p>
          </div>
          <div className={styles.coin_box}>
            <SpinningCoin />
          </div>
        </div>
        <div className={styles.email_container}>
          <EmailForm onChange={(e: string) => setEmail(e)} />
          <EmailFormButton
            onClick={() => handleEmailSubmit()}
            children={'Join'}
          />
        </div>
      </div>
    </>
  );
}
