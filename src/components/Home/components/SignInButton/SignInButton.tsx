import { useState } from 'react';
import styles from './SignInButton.module.scss';

type ButtonProps = {
    children: any;
    variant?: 'white' | 'orange';
    onClick: any;
};

export default function SignInButton({ children, onClick }: ButtonProps) {
    return (
        <button onClick={onClick} className={styles.container}>
            {children}
        </button>
    );
}
