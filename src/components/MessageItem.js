import React from 'react'
import styles from '../styles/MessageItem.module.css'



export function MessageItem(props) {
    return (
        <div className={styles.messageItem}>
            <div className={styles.message}></div>
            <div className={styles.timestamp}></div>
        </div>
    )
}