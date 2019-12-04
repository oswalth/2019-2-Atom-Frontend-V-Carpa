/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
import React, { useEffect, useState } from 'react';
import styles from '../styles/DialogueForm.module.css';
import { DialoguesHeader } from './DialoguesHeader';
import { DialogueItem } from './DialogueItem';
import { CreateDialogueButton } from './CreateDialogueButton';
import MyContext from './MyContext.Context';
import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export function DialogueForm(props) {
  const { chats } = props
  const lastMessages = []

  let dialogues = [];
  if (chats.length === 0) {
    dialogues = <div className={styles.empty}>No messages yet</div>;
  } else {
    chats.forEach((chat) => {
      const dialogueItem = <DialogueItem chat={chat}/>;
      dialogues.push(dialogueItem);
    });
  }
  
  // useEffect(() => {
  //   console.log('forming dialogues')
  //   console.log(chats);
  //   let dialogues = [];
  //   if (chats.length === 0) {
  //     console.log('empty');
  //     dialogues = <div className={styles.empty}>No messages yet</div>;
  //   } else {
  //     chats.forEach((chat) => {
  //       axios.get(`http://localhost:8000/api/messages/${chat.last_message}`)
  //       .then(({data}) => {
  //         const last_message = data
  //         console.log(last_message);
  //         const dialogueItem = <DialogueItem chat={chat} last_message={last_message}/>;
  //         dialogues.push(dialogueItem);
  //       })
  //     });
  //   }
  // })



  // let dialogues = [];
  // if (chats.length === 0) {
  //   dialogues = <div className={styles.empty}>No messages yet</div>;
  // } else {
  //   chats.forEach((chat) => {
  //     const dialogueItem = <DialogueItem chat={chat}/>;
  //     dialogues.push(dialogueItem);
  //   });
  // }
  
    return (
      <div className={styles.dialogues}>
          <DialoguesHeader />
          <div className={styles.dialogueList}>
              { dialogues }
          </div>
          <MyContext.Consumer>
              {(value) => (
                  <CreateDialogueButton createHandler={value.createHandler.bind(value)}/>
              )}
          </MyContext.Consumer>
      </div>
  );
  
}
