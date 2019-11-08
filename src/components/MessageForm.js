import React from 'react'
import styles from '../styles/MessageForm.module.css'
import { ChatHeader } from './ChatHeader'
import { FormInput } from './FormInput'
import { MessageItem } from './MessageItem'




export function MessageForm(props) {
    return (
        <div className={styles.messageForm}>
            <ChatHeader>header</ChatHeader>
            <div className={styles.chat}>
            </div>
            <FormInput></FormInput>
        </div>
    )
}