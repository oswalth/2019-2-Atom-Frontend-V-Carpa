import React from 'react';
import styles from '../styles/ChatForm.module.css'


export default function ChatForm() {

    return(
        <div className={styles.chatForm}>
            <span>Add members to your chat</span>
            <div className={styles.radioSelect}>
                <label class="radio">
                    <input type="radio" name="answer"/>
                    Group chat
                </label>
                <label class="radio">
                    <input type="radio" name="answer"/>
                    Private chat
                </label>
            </div>
            <div className='memberForm'>
                <span>Add member</span>
                <input/>
            </div>
        </div>
    )
}