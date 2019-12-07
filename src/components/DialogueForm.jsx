/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
import React from 'react';
import styles from '../styles/DialogueForm.module.css';
import { DialoguesHeader } from './DialoguesHeader';
import { DialogueItem } from './DialogueItem';
import { CreateDialogueButton } from './CreateDialogueButton';
import MyContext from './MyContext.Context';

// eslint-disable-next-line import/prefer-default-export
export function DialogueForm(props) {
  const { chats, user } = props;
  let chatImg = "https://image.flaticon.com/icons/svg/190/190588.svg";
  let dialogues = [];
  if (chats.length === 0) {
    dialogues = <div className={styles.empty}>No messages yet</div>;
  } else {
    chats.forEach((chat) => {
      let chatTitle = chat.title;
      if (chat.members.length === 2) {
        chat.members.forEach((member) => {
          if (user.username !== member.username) {
            chatTitle = "@" + member.username;
            chatImg = member.avatar || chatImg;
          }
        })
      }
      const dialogueItem = <DialogueItem 
                            chat={chat} 
                            chatTitle={chatTitle}
                            chatImg={chatImg}/>;
      dialogues.push(dialogueItem);
    });
  }

  return (
        <div className={styles.dialogues}>
            <MyContext.Consumer>
              {(value) => (
                <DialoguesHeader logout={value.logout.bind(value)}/>
              )}
            </MyContext.Consumer>
            <div className={styles.dialogueList}>
                {dialogues}
            </div>
            <MyContext.Consumer>
                {(value) => (
                    <CreateDialogueButton createHandler={value.createHandler.bind(value)}/>
                )}
            </MyContext.Consumer>
        </div>
  );
}
