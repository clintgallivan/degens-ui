import React from "react";
import styles from "./UserGeneral.module.scss";

export default function UserGeneral({ props }: any) {
    return (
        <div className={styles.container}>
            <div className={styles.text_column}>
                <p className="fs-xl fw-b">{props.user?.name || "Anon"}</p>
            </div>
        </div>
    );
}
