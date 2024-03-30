import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { BsGlobe, BsAward, BsPerson, BsTwitter, BsTelegram } from "react-icons/bs";
import { FaBars, FaDiscord, FaUsers } from "react-icons/fa";
import { GrCubes } from "react-icons/gr";
import { HiOutlineTrophy } from "react-icons/hi2";

import { PiCoinsDuotone } from "react-icons/pi";
import { FiSettings } from "react-icons/fi";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { RiPulseLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";

import { useLayoutContext } from "@context/layoutContext";
import useWindowSize from "@hooks/useWindowSize";
import NavButton from "./components/NavButton";
import styles from "./Navbar.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";
import { Session } from "src/types/session";
import { motion } from "framer-motion";
import { usePrivy } from "@privy-io/react-auth";

type LinkItemPropTypes = {
    href: string;
    logo: any;
};

export default function Navbar() {
    const { data: session }: { data: Session | any } = useSession();
    const { width = 1024 } = useWindowSize();
    const { navIsExpanded, setNavIsExpanded } = useLayoutContext();
    const { ready, authenticated, login, logout } = usePrivy();

    const disableLogin = !ready || (ready && authenticated);

    const [expandedCSS, setExpandedCSS] = useState("");

    useEffect(() => {
        navIsExpanded ? setExpandedCSS("navBar_expanded") : setExpandedCSS("navBar");
    }, [navIsExpanded]);

    function LinkItem({ href, logo }: LinkItemPropTypes) {
        return (
            <motion.div
                whileHover={{
                    scale: 1.4,
                }}
            >
                <a className={styles.a_tag} href={href} target="_blank" rel="noreferrer">
                    {logo}
                </a>
            </motion.div>
        );
    }

    const SocialIcons = () => {
        return (
            <div className={styles.socials}>
                {navIsExpanded && (
                    <>
                        <LinkItem
                            key={"twitter"}
                            href={"https://twitter.com/DegensApp"}
                            logo={<BsTwitter size={36} color="var(--twitter-blue)" />}
                        />
                        <LinkItem
                            key={"discord"}
                            href={"/404"}
                            logo={<FaDiscord size={36} color="var(--purple-30)" />}
                        />
                        <LinkItem
                            key={"telegram"}
                            href={"/404"}
                            logo={<BsTelegram size={36} color="var(--telegram-blue)" />}
                        />
                    </>
                )}
            </div>
        );
    };

    return (
        <>
            <div className={expandedCSS}>
                <br />
                <Button
                    className={styles.x_container}
                    variant="transparent"
                    onClick={() =>
                        navIsExpanded ? setNavIsExpanded(false) : setNavIsExpanded(true)
                    }
                >
                    {navIsExpanded ? (
                        <IoClose size={40} fill="white" />
                    ) : (
                        <FaBars size={40} fill="white" />
                    )}
                </Button>
                <br />
                <div className={styles.break} />
                <div className={styles.break} />
                <NavButton
                    isExpanded={navIsExpanded}
                    text="Home"
                    icon={<AiOutlineHome size={24} />}
                    route="/"
                />
                <div className={styles.break} />
                <NavButton
                    isExpanded={navIsExpanded}
                    text="Shitcoins"
                    icon={<PiCoinsDuotone size={24} />}
                    route="/token-leaderboards"
                />
                <div className={styles.break} />
                <NavButton
                    isExpanded={navIsExpanded}
                    text="Leaderboards"
                    icon={<HiOutlineTrophy size={24} />}
                    route="/user-leaderboards"
                />
                <div className={styles.break} />
                {session && (
                    <NavButton
                        isExpanded={navIsExpanded}
                        text="Profile"
                        icon={<BsPerson size={24} />}
                        route={`/users/${session?.user?._id || ""}`}
                    />
                )}
                <div className={styles.break} />
                <div className={styles.break} />
                <div className={styles.break} />
                <div className={styles.break} />
                {session && (
                    <>
                        <NavButton
                            isExpanded={navIsExpanded}
                            text="Settings"
                            icon={<FiSettings size={24} />}
                            route="/settings/account"
                        />

                        <div className={styles.break} />
                    </>
                )}
                <NavButton
                    isExpanded={navIsExpanded}
                    text={authenticated ? "Logout" : "Login"}
                    icon={authenticated ? <BiLogOut size={24} /> : <BiLogIn size={24} />}
                    onClick={authenticated ? logout : login}
                />
                {/* <div className={styles.break} /> */}
                {/* <div className={styles.break} /> */}
                {/* <div className={styles.break} /> */}
                {/* <NavButton
                    isExpanded={navIsExpanded}
                    text="About"
                    icon={<RiPulseLine size={24} />}
                /> */}
                {/* <br /> */}
                <SocialIcons />
            </div>
        </>
    );
}
