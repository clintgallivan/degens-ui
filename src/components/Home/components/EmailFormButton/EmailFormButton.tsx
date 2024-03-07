import { useState } from 'react';
import styles from './EmailFormButton.module.scss';

type ButtonProps = {
    children: any;
    variant?: 'white' | 'orange';
    onClick: any;
};

export default function EmailFormButton({ children, onClick }: ButtonProps) {
    return (
        <button onClick={onClick} className={styles.container}>
            {children}
        </button>
    );
}
