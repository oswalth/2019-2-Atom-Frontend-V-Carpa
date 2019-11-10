/* eslint-disable react/jsx-no-bind */
import React from 'react'
import styles from '../styles/DialogueForm.module.css'
import { DialoguesHeader } from './DialoguesHeader'
import { DialogueItem } from './DialogueItem'
import { CreateDialogueButton } from './CreateDialogueButton'
import MyContext from './MyContext.Context'

export function DialogueForm(props) {
    const {chats} = props;

    let dialogues = []
    if (chats.length === 0) {
        dialogues = <div className={styles.empty}>No messages yet</div> 
    } else { 
        chats.forEach((chat) => {
            const dialogueItem = <DialogueItem chat={chat}/>
            dialogues.push(dialogueItem)
        })
    }   

    return (    
        <div className={styles.dialogues}>
            <DialoguesHeader />
            <div className={styles.dialogueList}>
                {dialogues}
            </div>
            <MyContext.Consumer>
                {(value) => (
                    <CreateDialogueButton createHandler={value.createHandler.bind(value)}/>
                )}
            
            </MyContext.Consumer>
        </div>
    )
}