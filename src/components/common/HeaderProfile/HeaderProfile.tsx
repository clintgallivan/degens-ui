import React from "react";
import Image, { ImageLoaderProps } from "next/image";
import { signOut } from "next-auth/react";
import Dropdown from "react-bootstrap/Dropdown";

import { FiSettings } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { AiOutlinePieChart } from "react-icons/ai";
import styles from "./HeaderProfile.module.scss";
import useWindowSize from "@hooks/useWindowSize";
import { usePrivy } from "@privy-io/react-auth";

type ToggleProps = {
    children: any;
    onClick: any;
};

export default function HeaderProfile({ props }: any) {
    const { logout } = usePrivy();
    const { width = 0 } = useWindowSize();
    const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
        return src;
    };

    const CustomToggle = React.forwardRef<HTMLDivElement, ToggleProps>(
        ({ children, onClick }, ref) => (
            <div
                className={styles.container}
                onClick={(e) => {
                    e.preventDefault();
                    onClick(e);
                }}
                ref={ref} // You should pass ref to the DOM element to properly forward refs
            >
                <Image
                    unoptimized
                    className={styles.image}
                    loader={imageLoader}
                    src={props?.session?.user?.image || "/LogoIcon.svg"}
                    alt="User profile picture"
                    width={width >= 480 ? 50 : 30}
                    height={width >= 480 ? 50 : 30}
                />
            </div>
        )
    );

    // Setting the display name for CustomToggle to fix the ESLint error (this is for debugging purposes when identifying the component)
    CustomToggle.displayName = "CustomToggle";

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    Custom toggle
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.menu}>
                    <Dropdown.Item
                        className={styles.item}
                        eventKey="1"
                        href={`/users/${props?.session?.user?._id || ""}`}
                    >
                        <BsPerson size={14} className={styles.icon} />
                        My Profile
                    </Dropdown.Item>
                    <div className={styles.line_break} />
                    <Dropdown.Item className={styles.item} eventKey="2" href="/settings/account">
                        <FiSettings size={14} className={styles.icon} />
                        Account
                    </Dropdown.Item>
                    <Dropdown.Item className={styles.item} eventKey="3" href="/settings/portfolio">
                        <AiOutlinePieChart size={14} className={styles.icon} />
                        Portfolio
                    </Dropdown.Item>
                    <Dropdown.Item className={styles.item} eventKey="4" onClick={logout}>
                        <MdLogout size={14} className={styles.icon} />
                        Logout
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
}
