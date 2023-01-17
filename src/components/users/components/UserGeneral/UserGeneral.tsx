import React from 'react';
import RetroUserIcon from '@components/common/RetroUserIcon';
import Badge from '@components/common/Badge';
import LinkIconRow from './LinkIconRow';
import styles from './UserGeneral.module.scss';

export default function UserGeneral({ props }: any) {
    return (
        <div className={styles.container}>
            <div className={styles.icon_container}>
                <RetroUserIcon props={props} />
            </div>
            <div className={styles.text_column}>
                <p className="fs-xxl fw-xxb">
                    {props.user[0]?.name || "This account doesn't exist"}
                </p>
                <p className="fs-xsm fw-b">{props.user[0]?.description}</p>
                <div className={styles.title_and_link_row}>
                    <Badge
                        score={props.user[0]?.last_updated_snapshot.portfolios.season_1[0].score}
                    />
                    <LinkIconRow props={props} />
                </div>
            </div>
        </div>
    );
}
