import React from 'react'
import styles from '../styles/DialoguesHeader.module.css'



export function DialoguesHeader(props) {
    return (
        <div className={styles.header}>
            <div class={styles.menuBurger}></div>
            <div class={styles.messenger}>Messenger</div>
            <div class={styles.searchButton}></div>
        </div>
    )
}