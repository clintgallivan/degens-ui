import styles from "./Header.module.scss";
import useWindowSize from "../../../hooks/useWindowSize";
import { BiLogIn } from "react-icons/bi";
import RetroButton from "../RetroButton";
import DegenLogo from "../DegenLogo";
import HeaderSearchBar from "../HeaderSearchBar";
import HeaderProfile from "../HeaderProfile";
import HeaderSignInWithX from "../HeaderSignInWithX";
import HeaderSignIn from "../HeaderSignIn";
import { usePrivy } from "@privy-io/react-auth";

export default function Header({ props }: any) {
    const { width = 0 } = useWindowSize();

    const { ready, authenticated, login } = usePrivy();

    const disableLogin = !ready || (ready && authenticated);

    return (
        <>
            <div className="header">
                <DegenLogo />
                <div
                    className={
                        props.session
                            ? width >= 480
                                ? styles.search_bar_authed_wide
                                : styles.search_bar_authed_narrow
                            : width >= 768
                            ? styles.search_bar_wide
                            : styles.search_bar_narrow
                    }
                >
                    <HeaderSearchBar props={props} />
                </div>
                <div className={styles.profile}>
                    {/* {authenticated ? (
                        <HeaderProfile props={props} />
                    ) : (
                        <HeaderSignIn props={props} />
                    )} */}
                    {authenticated && ready ? (
                        <HeaderProfile props={props} />
                    ) : (
                        <HeaderSignIn props={props} />
                    )}
                </div>
            </div>
        </>
    );
}
