import React from 'react'
import styles from '../styles/ChatHeader.module.css'



export function ChatHeader(props) {
    return (
        <div className={styles.header}>
            <div className={styles.backButton}>
            </div>
            <div className={styles.chatInfo}>
                <div className={styles.avatar}></div>
                <div className={styles.senderInfo}>
                    <div>name</div>
                    <div>time</div>
                </div>
            </div>
            <div className={styles.searchButton}></div>
            <div className={styles.settingsButton}></div>
        </div>
    )
}