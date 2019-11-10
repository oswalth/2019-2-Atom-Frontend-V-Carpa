/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import styles from '../styles/ChatHeader.module.css'



export function ChatHeader(props) {
    const {details, clickBack} = props

    return (
        <div className={styles.header}>
            <div onClick={clickBack} className={styles.backButton} />
            <div className={styles.chatInfo}>
                <div className={styles.avatar} />
                <div className={styles.senderInfo}>
                    <div>{details.title}</div>
                    <div>last seen at 12:00</div>
                </div>
            </div>
            <div className={styles.searchButton} />
            <div className={styles.settingsButton} />
        </div>
    )
}