import { Alert as A } from 'react-bootstrap';
import { useState } from 'react';
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

export default function Alert({
  variant,
  header,
  text,
  show,
  setShow,
}: AlertProps) {
  // const [show, setShow] = useState(true);

  if (show) {
    return (
      <div className={styles.container}>
        <A variant={variant} onClose={() => setShow(false)} dismissible>
          <A.Heading>{header}</A.Heading>
          <p>{text}</p>
        </A>
      </div>
    );
  }
  return <></>;
}
