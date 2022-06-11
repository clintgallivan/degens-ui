import { useState } from 'react';
import styles from './EmailForm.module.scss';

type EmailFormProps = {
  onChange: (arg: string) => void;
};

export default function EmailForm({ onChange }: EmailFormProps) {
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
