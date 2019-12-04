/* eslint-disable no-unused-vars */
import React from 'react';
import styles from '../styles/DialoguesHeader.module.css';
import { OmitProps } from 'antd/lib/transfer/renderListBody';
import { Link } from 'react-router-dom'


// eslint-disable-next-line import/prefer-default-export
export function DialoguesHeader(props) {
  if (props.isAuthenticated) {
    return (
      <div className={styles.header}>
          <div className={styles.menuBurger} />
          <div className={styles.messenger}>Messenger</div>
          <div className={styles.searchButton} />
          <div className={styles.logOutButton} onClick={() => {
            props.logout()
            props.history.push('/')
          }}/>
      </div>
    )
  }
  return (
        <div className={styles.header}>
            <div className={styles.messenger}>Messenger</div>
        </div>
  );
}
