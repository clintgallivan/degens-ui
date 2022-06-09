import styles from './Card.module.scss';
import { Table } from 'react-bootstrap';
import RetroButton from '../RetroButton';

type CardPropTypes = {
  children?: any;
  header?: any;
};

export default function Card({ children, header }: CardPropTypes) {
  return (
    <div className={styles.container}>
      <div className="fs-xl fw-b">{header}</div>
      {children}
    </div>
  );
}
