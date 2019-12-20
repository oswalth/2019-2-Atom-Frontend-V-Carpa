/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
import React, { useEffect, useState } from 'react';
import styles from '../styles/DialogueForm.module.css';
import { DialoguesHeader } from './DialoguesHeader';
import { DialogueItem } from './DialogueItem';
import MyContext from './MyContext.Context';

// eslint-disable-next-line import/prefer-default-export
export function DialogueForm(props) {
  const {
    chats, user, chatFormStyle, createHandler,
  } = props;
  const usernameInput = React.useRef(null);
  const titleInput = React.useRef(null);
  let chatImg = 'https://image.flaticon.com/icons/svg/190/190588.svg';
  let dialogues = [];
  const membersNames = [];
  let isGroupChat = false;
  if (chats.length === 0) {
    dialogues = <div className={styles.empty}>No messages yet</div>;
  } else {
    const keys = Object.keys(chats);
    keys.forEach((key) => {
      let chatTitle = chats[key].title;
      if (chats[key].members.length === 2) {
        chats[key].members.forEach((member) => {
          if (user.username !== member.username) {
            chatTitle = `@${member.username}`;
            chatImg = member.avatar || chatImg;
          }
        });
      } else {
        chatImg = 'https://image.flaticon.com/icons/svg/476/476761.svg';
      }
      const dialogueItem = <DialogueItem
                            chat={chats[key]}
                            chatTitle={chatTitle}
                            chatImg={chatImg}/>;
      dialogues.push(dialogueItem);
    });
  }
  const addMember = () => {
    membersNames.push(usernameInput.current.value);
    if (membersNames.length !== 1) {
      isGroupChat = true;
      usernameInput.current.required = true;
    }
    usernameInput.current.value = '';
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (usernameInput.current.value !== '') {
      membersNames.push(usernameInput.current.value);
    }
    createHandler(membersNames, titleInput.current.value);
  };

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
                  <button
                    onClick={value.openPopUp.bind(value)}
                    className={styles.createDialogueButton}
                  />
                )}
            </MyContext.Consumer>
            <MyContext.Consumer>
              {(value) => (
                <div className={styles.formPopUp} id="myForm" style={chatFormStyle}>
                <form
                    onSubmit={(event) => {
                      handleSubmit(event);
                    }}
                    className={styles.formContainer}>
                    <h1>Create Chat</h1>
                    <input ref={titleInput} type="text" placeholder="Chat Title" name="email"/>
                    <label for="email"><b>Add Member</b></label>
                    <input ref={usernameInput} type="text" placeholder="Enter username" name="email" required />
                    <label><b>Click "+" to add more users</b></label>
                    <button type="button" onClick={() => { addMember(); }} className={styles.btn}>+</button>
                    <button type="submit" className={styles.btn}>Create</button>
                </form>
              </div>
              )}
            </MyContext.Consumer>
        </div>
  );
}
