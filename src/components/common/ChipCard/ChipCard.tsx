import Link from 'next/link';
import styles from './ChipCard.module.scss';

type ChipCardProps = {
    children: any;
    button: boolean;
};

export default function ChipCard({ children, button }: ChipCardProps) {
    if (button) {
        return (
            <Link
                href={{
                    pathname: '/token-leaderboards',
                    query: { category: children.slice(1) },
                }}
                className={styles.container_button}
            >
                {children}
            </Link>
        );
    } else {
    }
    return <div className={styles.container}>{children}</div>;
}
