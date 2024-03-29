import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { BsTwitter, BsTwitterX } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import useWindowSize from "@hooks/useWindowSize";
import styles from "./HeaderSignIn.module.scss";
import { usePrivy } from "@privy-io/react-auth";
import { clientApi } from "@utils/api";

export default function HeaderSignIn({ props }: any) {
    const { width = 0 } = useWindowSize();
    const { ready, authenticated, login } = usePrivy();

    // TODO: utilize this disableLogin variable
    const disableLogin = !ready || (ready && authenticated);

    const renderTooltip = (props: any) => {
        return width < 768 ? (
            <Tooltip id="button-tooltip" className={styles.tooltip} {...props}>
                Sign in
            </Tooltip>
        ) : (
            <></>
        );
    };
    return (
        <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
            <div className={styles.container} onClick={login}>
                <>
                    <div className={width >= 768 ? styles.text : styles.hide_text}>Sign in</div>
                    {width < 768 && <FiLogIn className={styles.twitter_icon} />}
                </>
            </div>
        </OverlayTrigger>
    );
}
