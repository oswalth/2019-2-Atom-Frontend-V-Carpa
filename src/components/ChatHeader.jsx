/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/ChatHeader.module.css';


// eslint-disable-next-line import/prefer-default-export
export function ChatHeader(props) {
  const {
    details, clickBack, chatImg, chatTitle,
  } = props;
  return (
        <div className={styles.header}>
            <Link to={'/'}>
                <div onClick={clickBack} className={styles.backButton} />
            </Link>
            <div className={styles.chatInfo}>
                <Link to={`/profile/${details ? details.id : 1}`}>
                    <div
                        className={styles.avatar}
                        style={{ backgroundImage: `url(${chatImg})` }}/>
                </Link>
                    <div className={styles.senderInfo}>
                    <div>{chatTitle}</div>
                    <div>last seen at 12:00</div>
                </div>
            </div>
            <div className={styles.searchButton} />
            <div className={styles.settingsButton} />
        </div>
  );
}
