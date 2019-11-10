/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import styles from '../styles/MessageItem.module.css';


export function MessageItem(props) {
  const { content, time } = props.inner;
  const formattedTime = new Date(time);
  return (
        <div className={styles.messageWrap}>
            <div className={styles.messageItem}>
                <div className={styles.message}>{content}</div>
                <div className={styles.timestamp}>{formattedTime.toLocaleString('ru', {
                  hour: 'numeric',
                  minute: 'numeric',
                })}</div>
            </div>
        </div>
  );
}
