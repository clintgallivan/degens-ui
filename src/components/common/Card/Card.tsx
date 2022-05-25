import styles from './Card.module.scss';
import { Table } from 'react-bootstrap';
import RetroButton from '../RetroButton';

export default function Card({ children, header }) {
  return (
    <div className={styles.container}>
      <p className="fs-xl fw-b">{header}</p>
      {children}
    </div>
  );
}
