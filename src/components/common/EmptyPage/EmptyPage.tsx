import React from 'react';
import Link from 'next/link';
import RetroButton from '@components/common/RetroButton';
import styles from './EmptyPage.module.scss';

const EmptyPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <h2>Something went wrong... :(</h2>
            <Link href="/">
                <a className={styles.a_tag}>
                    <RetroButton variant="orange">Go to Home</RetroButton>
                </a>
            </Link>
        </div>
    );
};

export default EmptyPage;
