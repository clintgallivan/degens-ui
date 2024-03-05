import { signIn } from 'next-auth/react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { BsTwitter, BsTwitterX } from 'react-icons/bs';
import { FiLogIn } from 'react-icons/fi';
import useWindowSize from '@hooks/useWindowSize';
import styles from './HeaderSignIn.module.scss';

export default function HeaderSignIn({ props }: any) {
    const { width = 0 } = useWindowSize();

    const renderTooltip = (props: any) => {
        return width < 768 ? (
            <Tooltip id="button-tooltip" className={styles.tooltip} {...props}>
                Sign in with Twitter
            </Tooltip>
        ) : (
            <></>
        );
    };
    return (
        <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
            <div className={styles.container} onClick={() => signIn('twitter')}>
                <>
                    <div className={width >= 768 ? styles.text : styles.hide_text}>
                        Sign in with
                    </div>
                    {width >= 768 ? (
                        <BsTwitterX className={styles.twitter_icon} />
                    ) : (
                        <FiLogIn className={styles.twitter_icon} />
                    )}
                </>
            </div>
        </OverlayTrigger>
    );
}
