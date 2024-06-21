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
import SkullIcon from "@public/skull.svg";
import Image from "next/image";
import { useSessionContext } from "@context/SessionContext";
import { User, useLinkAccount, usePrivy } from "@privy-io/react-auth";
import { addWalletRequest, deleteWalletRequest } from "src/api/wallets";
import { toAxiosError } from "@utils/api";
import { useToast } from "@context/toastContext";
import { useLayoutContext } from "@context/layoutContext";

export default function WalletStats({ props }: { props: any }) {
    const { width = 0 } = useWindowSize();
    const { showSuccessToast, showErrorToast } = useToast();
    const { login, session } = useSessionContext();
    const { appIsLoading, setAppIsLoading } = useLayoutContext();
    const isEmpty = true;
    const { unlinkWallet } = usePrivy();
    // console.log(props);
    // console.log(session);

    // * TESTING WHILE SOLANA UNSUPPORTED
    const linkWalletSuccessCallback = async (user: User, linkedAccountType: string) => {
        setAppIsLoading(true);
        const walletAddress = "5vysY9Jes27TxN2VDkkGwU8hntDH2gX4N4Z7C4E1cVfT";
        const userId = JSON.parse(JSON.stringify(session?.user?._id));
        try {
            await addWalletRequest({ userId, walletAddress });
            showSuccessToast("Success", "Wallet linked successfully!");
        } catch (error: any) {
            const axiosError = toAxiosError(error);
            showErrorToast("Failure", axiosError?.data?.message || error?.message || "");
        } finally {
            if (walletAddress) {
                unlinkWallet(user?.wallet?.address || "");
            }
            setAppIsLoading(false);
        }
    };

    // // * WHEN PRIVY SUPPORTS SOLANA
    // // TODO: Once privy has support for solana, use the walletAddress
    // const linkWalletSuccessCallback = async (user: User, linkedAccountType: string) => {
    //     const walletAddress = user?.wallet?.address;
    //     if (!walletAddress) return;
    //     const userId = JSON.parse(JSON.stringify(session?.user?._id));
    //     try {
    //         await addWalletRequest({ userId, walletAddress });
    //         showSuccessToast("Success", "Wallet linked successfully!");
    //     } catch (error: any) {
    //         if (error?.response?.status === 429) {
    //             unlinkWallet(walletAddress);
    //         }
    //         const axiosError = toAxiosError(error);
    //         showErrorToast("Failure", axiosError?.data?.message || error?.message || "");
    //     }
    // };

    const { linkWallet } = useLinkAccount({
        onSuccess: linkWalletSuccessCallback,
    });
    const handleAddWallet = () => {
        try {
            linkWallet();
        } catch (e) {
            // do nothing
        }
    };

    const handleDeleteWallet = async (userId: string, walletAddress: string) => {
        setAppIsLoading(true);
        userId = "665dc1dbe24e2c85d6a2f00c";
        walletAddress = "5vysY9Jes27TxN2VDkkGwU8hntDH2gX4N4Z7C4E1cVfT";
        try {
            const deleteWalletRes = await deleteWalletRequest({ userId, walletAddress });
            showSuccessToast(
                "Success",
                deleteWalletRes?.data?.message || "Wallet deleted successfully!"
            );
        } catch (error) {
            const axiosError = toAxiosError(error);
            showErrorToast("Failure", axiosError?.data?.message || error?.message || "");
        } finally {
            setAppIsLoading(false);
            // unlinkWallet(walletAddress);
        }
    };

    const EmptyWalletStats = () => {
        {
            return session ? (
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
                            <div className={styles.enterWalletButtonText}>Enter Solana wallet</div>
                        </RetroButtonRound>
                        <RetroButtonRound variant="orange" onClick={handleDeleteWallet}>
                            <div className={styles.enterWalletButtonText}>DELETE Wallet</div>
                        </RetroButtonRound>
                    </div>
                    <div className={styles.empty_text_line_3_container}>
                        <div className={styles.info_circle_container}>
                            <BsInfoCircle size={20} />
                        </div>
                        <div className={styles.empty_text_line_3}>
                            We use Privy to handle wallet authentication. We only store the wallet
                            public address to keep track of the wallet performance & we don’t store
                            data to keep your crypto secure. We’ll only display percentage
                            breakdowns of your assets.
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className={styles.empty_rocket_container}>
                        <Image src={SkullIcon} alt="" width={width >= 480 ? 75 : 50} />
                    </div>
                    <div className={styles.empty_text_line_1}>No wallets in competition</div>
                </div>
            );
        }
    };
    const Stats = () => {
        return (
            <div>
                <div className={styles.empty_rocket_container}>
                    <Image src={SkullIcon} alt="" width={width >= 480 ? 75 : 50} />
                </div>
                <div className={styles.empty_text_line_1}>1 wallet in competition</div>
            </div>
        );
    };
    return (
        <div className={styles.container}>
            <Card>
                <div className={styles.header_container}>
                    <div className="text-2xl leading-10 font-medium">Leaderboard Stats</div>
                    {/* <div style={{ backgroundColor: "green" }}>DropdownPlaceholder</div> */}
                </div>
                {isEmpty ? <EmptyWalletStats /> : <Stats />}
                {/* <EmptyWalletStats /> */}
                {/* <RetroButtonRound variant="orange" onClick={handleAddWallet}>
                    <div className={styles.enterWalletButtonText}>Enter Wallet</div>
                </RetroButtonRound> */}
            </Card>
        </div>
    );
}
