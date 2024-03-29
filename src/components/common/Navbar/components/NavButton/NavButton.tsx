import React from 'react';
import Link from 'next/link';
import RetroButton from '@components/common/RetroButton';
import styles from './NavButton.module.scss';

type NavButtonProps = {
    text: string;
    icon: any;
    isExpanded: boolean;
    route?: string;
    onClick?: any;
};

export default function NavButton({ text, icon, isExpanded, route = '', onClick }: NavButtonProps) {
    const child = () => {
        return (
            <>
                <div className={styles.button_subcontainer}>
                    {isExpanded ? (
                        <>
                            {icon}
                            <div className={styles.button_text}>{text}</div>
                        </>
                    ) : (
                        <>{icon}</>
                    )}
                </div>
            </>
        );
    };

    return (
        (<Link href={route} className={isExpanded ? styles.a_tag : styles.a_tag_sm}>

            <RetroButton onClick={onClick} variant="purple">
                {child()}
            </RetroButton>

        </Link>)
    );
}
