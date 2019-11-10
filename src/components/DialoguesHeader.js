/* eslint-disable no-unused-vars */
import React from 'react';
import styles from '../styles/DialoguesHeader.module.css';


// eslint-disable-next-line import/prefer-default-export
export function DialoguesHeader() {
  return (
        <div className={styles.header}>
            <div className={styles.menuBurger} />
            <div className={styles.messenger}>Messenger</div>
            <div className={styles.searchButton} />
        </div>
  );
}
