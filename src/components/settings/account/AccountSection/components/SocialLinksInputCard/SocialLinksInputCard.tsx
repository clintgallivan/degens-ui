import styles from './SocialLinksInputCard.module.scss';

interface SocialLinksInputCardProps {
    link: string;
    setLink: (link: string) => void;
}

export default function SocialLinksInputCard({ link, setLink }: SocialLinksInputCardProps) {
    return (
        <div className={styles.container}>
            <input
                className={styles.input}
                placeholder="Paste link here"
                type="url"
                name="name"
                value={link}
                onChange={e => setLink(e.target.value)}
            />
        </div>
    );
}
