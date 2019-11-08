import React from "react"
import ReactDOM from 'react-dom'
import { DialogueForm } from './DialogueForm'
import { MessageForm } from './MessageForm'
import styles from '../styles/MainForm.module.css'


export class MainForm extends React.Component{
    render() {
        const { state } = this;
        return (
            <div className={styles.container}>
                <MessageForm>
                </MessageForm>
            </div>
        )
    }
}
