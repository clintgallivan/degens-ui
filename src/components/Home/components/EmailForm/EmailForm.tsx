import { useState } from 'react';
import styles from './EmailForm.module.scss';

export default function EmailForm({ onChange }) {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder="Enter Email"
        type="email"
        name="name"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
