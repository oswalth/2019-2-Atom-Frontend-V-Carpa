import React from 'react'
import styles from '../styles/DialoguesHeader.module.css'



export function DialoguesHeader(props) {
    return (
        <div className={styles.header}>
            <div className={styles.menuBurger} />
            <div className={styles.messenger}>Messenger</div>
            <div className={styles.searchButton} />
        </div>
    )
}