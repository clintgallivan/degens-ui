import { useState } from "react";
import Alert from "@components/common/Alert";
import RetroButton from "@components/common/RetroButton";
import SpinningCoin from "@components/common/SpinningCoin";
import EmailForm from "@components/Home/components/EmailForm";
import SignInButton from "@components/Home/components/SignInButton";
import styles from "./IntroSection.module.scss";
import { BsArrowRight, BsTwitterX } from "react-icons/bs";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useSessionContext } from "@context/SessionContext";
import cookie from "cookie";
import { clientApi } from "@utils/api";
import { Placeholder } from "react-bootstrap";

type PlaceholderTextProps = {
    xs: number;
};

export default function IntroSection({ props }: any) {
    const { session, isLoading, login, logout } = useSessionContext();
    const router = useRouter();

    const handleClick = () => {
        if (isLoading) {
            return;
        }
        if (session) {
            router.push(`/users/${props.session.user._id}`);
        } else {
            login();
        }
    };

    const ButtonTextPlaceholder = ({ xs }: PlaceholderTextProps) => {
        return (
            <Placeholder animation="glow">
                <div className={styles.button_text_placeholder}></div>
                <Placeholder xs={xs} />
            </Placeholder>
        );
    };

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
                    <SignInButton variant="orange" onClick={handleClick}>
                        <div className={styles.sign_in_text_container}>
                            {/* Conditionally render button text or nothing based on isLoading */}
                            {!isLoading ? (
                                session ? (
                                    <>
                                        <div className={styles.sign_in_button_text}>
                                            View my profile
                                        </div>
                                        <BsArrowRight size={20} className={styles.icon} />
                                    </>
                                ) : (
                                    <div className={styles.sign_in_button_text}>Sign in</div>
                                )
                            ) : (
                                <ButtonTextPlaceholder xs={12} />
                            )}
                        </div>
                    </SignInButton>
                </div>
            </div>
        </>
    );
}
