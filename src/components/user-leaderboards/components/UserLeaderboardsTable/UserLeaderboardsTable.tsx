import { useState } from "react";
import Image, { ImageLoaderProps } from "next/image";
import { Placeholder, Table } from "react-bootstrap";
import { BsAward } from "react-icons/bs";

import RetroButton from "@components/common/RetroButton";
import styles from "./UserLeaderboardsTable.module.scss";
import Link from "next/link";
import { ImArrowDown2 } from "react-icons/im";
import Card from "@components/common/Card";
import Badge from "@components/common/Badge";

type PlaceholderTextProps = {
    xs: number;
};

export default function UserLeaderboardsTable({
    props,
    queryData,
    queryIsLoading,
    count = 100,
}: {
    props: any;
    queryData?: any;
    queryIsLoading?: boolean;
    count?: number;
}) {
    const [isLoading, setIsLoading] = useState(true);
    console.log(props);
    const topUserData = !queryData ? props.topUsersSnapshot : queryData.data;

    const PlaceholderText = ({ xs }: PlaceholderTextProps) => {
        return (
            <Placeholder className={styles.text_placeholder} animation="glow">
                <Placeholder className={styles.text_placeholder} xs={6} />
            </Placeholder>
        );
    };
    const PlaceholderNumber = ({ xs }: PlaceholderTextProps) => {
        return (
            <Placeholder className={styles.number_placeholder} animation="glow">
                <Placeholder className={styles.number_placeholder} xs={6} />
            </Placeholder>
        );
    };
    const PlaceholderBadge = ({ xs }: PlaceholderTextProps) => {
        return (
            <Placeholder className={styles.badge_placeholder} animation="glow">
                <Placeholder className={styles.badge_placeholder} xs={12} />
            </Placeholder>
        );
    };
    const PlaceholderIcon = ({ xs }: PlaceholderTextProps) => {
        return (
            <Placeholder className={styles.icon_placeholder} animation="glow">
                <Placeholder className={styles.icon_placeholder} xs={12} />
            </Placeholder>
        );
    };

    const RowHandler = () => {
        return topUserData.slice(0, count).map((item: any, index: number) => {
            return (
                <tr key={item.name} className={styles.rows_container}>
                    <td className={styles.row_container}>
                        <div className={styles.grid_point_container}>
                            {item.rank > 0 ? item.rank : index + 1}
                        </div>
                    </td>
                    <td>
                        <div className={styles.grid_point_container}>
                            <>
                                <div className={styles.icon_container}>
                                    {queryIsLoading ? (
                                        <PlaceholderIcon xs={4} />
                                    ) : (
                                        <Link
                                            href={`/users/${item._id}`}
                                            className={styles.a_tag_image}
                                        >
                                            <Image
                                                src={item?.image || "LogoIcon.svg"}
                                                alt=""
                                                height={32}
                                                width={32}
                                                style={{ borderRadius: 34 / 2 }}
                                            />
                                        </Link>
                                    )}
                                </div>
                                <div>
                                    {queryIsLoading ? (
                                        <PlaceholderText xs={4} />
                                    ) : (
                                        <Link className={styles.a_tag} href={`/users/${item._id}`}>
                                            {item.name}
                                        </Link>
                                    )}
                                </div>
                            </>
                        </div>
                    </td>
                    <td>
                        <div className={styles.grid_point_container}>
                            {queryIsLoading ? (
                                <PlaceholderNumber xs={4} />
                            ) : (
                                item?.score.toFixed(1) || "--"
                            )}
                        </div>
                    </td>
                    <td>
                        <div className={styles.grid_point_container_badge}>
                            {queryIsLoading ? (
                                <PlaceholderBadge xs={4} />
                            ) : (
                                <Badge score={item.score} />
                            )}
                        </div>
                    </td>
                    <td>
                        <div className={styles.grid_point_container}>
                            {queryIsLoading ? (
                                <PlaceholderNumber xs={4} />
                            ) : (
                                item?.average_mcap_rank.toFixed(1) || "--"
                            )}
                        </div>
                    </td>
                </tr>
            );
        });
    };

    return (
        <div className={styles.container}>
            <Table>
                <thead className={styles.head}>
                    <tr className={styles.head_row}>
                        <th>
                            <div className={styles.head_container}>Rank</div>
                        </th>
                        <th>
                            <div className={styles.head_container}>Name</div>
                        </th>

                        <th>
                            <div className={styles.head_container}>Degen score</div>
                        </th>
                        <th>
                            <div className={styles.head_container}>Title</div>
                        </th>
                        <th>
                            <div className={styles.head_container}>Risk score</div>
                        </th>
                    </tr>
                </thead>
                <tbody className={styles.body}>{RowHandler()}</tbody>
            </Table>
        </div>
    );
}
