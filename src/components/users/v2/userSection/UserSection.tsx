import styles from "./UserSection.module.scss";
import { useState } from "react";
import { Portfolio } from "@components/settings/portfolio/ProfileSection/PortfolioSection";
import RetroButton from "@components/common/RetroButton";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import SignInButton from "@components/Home/components/SignInButton";
import { useSessionContext } from "@context/SessionContext";
import { Placeholder } from "react-bootstrap";
import { IoMdShare } from "react-icons/io";
import { useToast } from "@context/toastContext";
import UserGeneral from "@components/users/v2/components/UserGeneral";
import WalletStats from "../components/WalletStats";
import RetroButtonRound from "@components/common/RetroButtonRound";
import Watchlist from "../components/Watchlist";

export default function UserSection({ props }: any) {
    console.log(props);
    // const [portfolio, setPortfolio] = useState<Portfolio>("season_1");
    // const [selectedTimestamp, setselectedTimestamp] = useState(
    //     props.user[0].last_updated_snapshot.portfolios?.[portfolio]?.[0]?.timestamp || undefined
    // );

    const { showSuccessToast } = useToast();
    type PlaceholderTextProps = {
        xs: number;
    };
    const { session, isLoading, login, logout } = useSessionContext();

    const ButtonTextPlaceholder = ({ xs }: PlaceholderTextProps) => {
        return (
            <Placeholder animation="glow">
                <div className={styles.button_text_placeholder}></div>
                <Placeholder xs={xs} />
            </Placeholder>
        );
    };

    const handleClick = async () => {
        try {
            await navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_BASE_URL}/users/${props.user._id}`
            );
            showSuccessToast("Profile link copied to clipboard!");
        } catch (err) {
            // do nothing
        }
    };

    return props?.user ? (
        <div className={styles.content_area} style={{ backgroundColor: "blue" }}>
            <div className={styles.first_row} style={{ backgroundColor: "red" }}>
                <UserGeneral props={props} />
                <RetroButtonRound variant="orange" onClick={handleClick}>
                    <div className={styles.sign_in_text_container}>
                        <>
                            <IoMdShare size={20} className={styles.icon} />
                            <div className={styles.sign_in_button_text}>Share Profile</div>
                        </>
                    </div>
                </RetroButtonRound>
            </div>
            <div className={styles.second_row}>
                <WalletStats props={props} />
                {/* <WalletStats props={props} /> */}
            </div>
            <div className={styles.second_row}>
                <Watchlist props={props} />
                {/* <WalletStats props={props} /> */}
            </div>
        </div>
    ) : (
        <div className={styles.content_area}>
            {/* <div className={styles.top_row}>
                <UserGeneral props={props} />
            </div> */}
        </div>
    );
}
