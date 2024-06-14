import React, { useState, useEffect } from "react";
import moment from "moment";
import useWindowSize from "@hooks/useWindowSize";

import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import Card from "@components/common/Card";
import ButtonRow from "@components/common/ButtonRow";
import Dropdown from "@components/common/Dropdown";
// import useKeySwitch from './helpers/useKeySwitch';
import styles from "./WalletStats.module.scss";
import { toFixedNumber } from "@utils/text";
import { Portfolio } from "@components/settings/portfolio/ProfileSection/PortfolioSection";
import RetroButton from "@components/common/RetroButton";
import RetroButtonRound from "@components/common/RetroButtonRound";
import { IoMdShare } from "react-icons/io";
import { BsInfoCircle } from "react-icons/bs";
import RocketIcon from "@public/Rocket.svg";
import Image from "next/image";

export default function WalletStats({ props }: { props: any }) {
    const handleAddWallet = () => {
        console.log("opening modal...");
    };
    const { width = 0 } = useWindowSize();

    const EmptyWalletStats = () => {
        return (
            <div>
                <div className={styles.empty_rocket_container}>
                    <Image src={RocketIcon} alt="" width={width >= 480 ? 75 : 50} />
                </div>
                <div className={styles.empty_text_line_1}>Join the competition!</div>
                <div className={styles.empty_text_line_2}>
                    Compete in seasons and win airdrops by entering your wallet(s) into the
                    leaderboard!
                </div>
                <div className={styles.empty_button_container}>
                    <RetroButtonRound variant="orange" onClick={handleAddWallet}>
                        <div className={styles.enterWalletButtonText}>Enter Wallet</div>
                    </RetroButtonRound>
                </div>
                <div className={styles.empty_text_line_3_container}>
                    <div className={styles.info_circle_container}>
                        <BsInfoCircle size={20} />
                    </div>
                    <div className={styles.empty_text_line_3}>
                        We use Privy to handle wallet authentication. We only store the wallet
                        public address to keep track of the wallet performance & we don’t store data
                        to keep your crypto secure. We’ll only display percentage breakdowns of your
                        assets.
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div className={styles.container}>
            <Card>
                <div className={styles.header_container}>
                    <div className={styles.header_text}>Leaderboard Stats</div>
                    {/* <div style={{ backgroundColor: "green" }}>DropdownPlaceholder</div> */}
                </div>
                <EmptyWalletStats />
                {/* <RetroButtonRound variant="orange" onClick={handleAddWallet}>
                    <div className={styles.enterWalletButtonText}>Enter Wallet</div>
                </RetroButtonRound> */}
            </Card>
        </div>
    );
}
