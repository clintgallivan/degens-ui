import styles from './RetroButton.module.scss';

type ButtonProps = {
    children: any;
    variant?: 'purple' | 'dark_purple' | 'orange' | 'twitterBlue';
    onClick?: any;
    disabled?: boolean;
};

export default function RetroButton({
    children,
    variant = 'orange',
    onClick,
    disabled = false,
}: ButtonProps) {
    return (
        <div>
            {variant == 'purple' ? (
                <button
                    onClick={() => (disabled || !onClick ? null : onClick())}
                    className={
                        disabled ? styles.container_purple_disabled : styles.container_purple
                    }
                    disabled={disabled}
                >
                    {children}
                </button>
            ) : variant == 'dark_purple' ? (
                <button
                    onClick={() => (disabled || !onClick ? null : onClick())}
                    className={
                        disabled
                            ? styles.container_dark_purple_disabled
                            : styles.container_dark_purple
                    }
                    disabled={disabled}
                >
                    {children}
                </button>
            ) : variant == 'orange' ? (
                <button
                    onClick={() => (disabled || !onClick ? null : onClick())}
                    className={
                        disabled ? styles.container_orange_disabled : styles.container_orange
                    }
                    disabled={disabled}
                >
                    {children}
                </button>
            ) : variant == 'twitterBlue' ? (
                <button
                    onClick={() => (disabled || !onClick ? null : onClick())}
                    className={
                        disabled
                            ? styles.container_twitter_blue_disabled
                            : styles.container_twitter_blue
                    }
                    disabled={disabled}
                >
                    {children}
                </button>
            ) : (
                <></>
            )}
        </div>
    );
}
