import { Alert as A } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from './Alert.module.scss';

type AlertProps = {
    variant?:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'danger'
        | 'warning'
        | 'info'
        | 'light'
        | 'dark';
    header?: string;
    text?: string;
    show: boolean;
    setShow: (arg: boolean) => void;
};

export default function Alert({ variant, header, text, show, setShow }: AlertProps) {
    const [animation, setAnimation] = useState(show ? styles.slideIn : styles.slideOut);

    useEffect(() => {
        setAnimation(show ? styles.slideIn : styles.slideOut);
    }, [show]);

    const handlers = useSwipeable({
        onSwipedUp: () => setShow(false),
        // preventDefaultTouchmoveEvent: true,
        trackMouse: false,
    });

    return (
        <div className={`${styles.container} ${animation}`} {...handlers}>
            <A variant={variant} onClose={() => setShow(false)} dismissible>
                <A.Heading>{header}</A.Heading>
                <p>{text}</p>
            </A>
        </div>
    );
}
