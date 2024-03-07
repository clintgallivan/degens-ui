import styles from './BioInputCard.module.scss';

interface BioInputCardProps {
    bio: string;
    setBio: (bio: string) => void;
}

export default function BioInputCard({ bio, setBio }: BioInputCardProps) {
    return (
        <div className={styles.bio_input_container}>
            <textarea
                className={styles.input}
                placeholder="Enter bio here"
                name="name"
                maxLength={160}
                value={bio}
                onChange={e => setBio(e.target.value)}
            />
        </div>
    );
}
