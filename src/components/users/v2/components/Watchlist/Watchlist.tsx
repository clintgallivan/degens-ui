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
import styles from "./Watchlist.module.scss";
import { toFixedNumber } from "@utils/text";
import { Portfolio } from "@components/settings/portfolio/ProfileSection/PortfolioSection";
import RetroButton from "@components/common/RetroButton";
import RetroButtonRound from "@components/common/RetroButtonRound";
import { IoMdShare } from "react-icons/io";
import { BsInfoCircle } from "react-icons/bs";
import HourglassIcon from "@public/Hourglass.svg";
import Image from "next/image";

export default function Watchlist({ props }: { props: any }) {
    const { width = 0 } = useWindowSize();

    const WatchlistComingSoon = () => {
        return (
            <div>
                <div className={styles.hourglass_container}>
                    <Image src={HourglassIcon} alt="" width={width >= 480 ? 53 : 50} />
                </div>
                <div className={styles.text_line_1}>
                    Stay tuned! <div className={styles.text_line_1_bold}>Watchlists</div> are coming
                    soon
                </div>
            </div>
        );
    };
    return (
        <div className={styles.container}>
            <Card>
                <div className={styles.header_container}>
                    <div className={styles.header_text}>Watchlist</div>
                </div>
                <WatchlistComingSoon />
            </Card>
        </div>
    );
}
