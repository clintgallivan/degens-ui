import { useState } from "react";
import styles from "./RetroButtonRound.module.scss";

type ButtonProps = {
    children: any;
    variant?: "white" | "orange";
    onClick: any;
};

export default function RetroButtonRound({ children, onClick }: ButtonProps) {
    return (
        <div>
            <button onClick={onClick} className={styles.container}>
                {children}
            </button>
        </div>
    );
}
