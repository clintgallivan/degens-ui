import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { BsTwitter, BsTwitterX } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import useWindowSize from "@hooks/useWindowSize";
import styles from "./HeaderSignIn.module.scss";
import { usePrivy } from "@privy-io/react-auth";
import { clientApi } from "@utils/api";
import { useSystemInfoContext } from "@context/SystemInfoContext";
import { useToast } from "@context/toastContext";
import { useSessionContext } from "@context/SessionContext";

export default function HeaderSignIn({ props }: any) {
    const { info } = useSystemInfoContext();
    const { login } = useSessionContext();
    const { showSuccessToast, showErrorToast } = useToast();
    const { width = 0 } = useWindowSize();

    const handleLogin = () => {
        if (info.login_enabled) {
            login();
        } else {
            showErrorToast("Login disabled", "Login is currently disabled");
        }
    };
    const renderTooltip = (props: any) => {
        return width < 768 ? (
            <Tooltip id="button-tooltip" className={styles.tooltip} {...props}>
                Login / Sign up
            </Tooltip>
        ) : (
            <></>
        );
    };
    return (
        <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
            <div className={styles.container} onClick={handleLogin}>
                <>
                    <div className={width >= 768 ? styles.text : styles.hide_text}>
                        Login / Sign up
                    </div>
                    {width < 768 && <FiLogIn className={styles.twitter_icon} />}
                </>
            </div>
        </OverlayTrigger>
    );
}
