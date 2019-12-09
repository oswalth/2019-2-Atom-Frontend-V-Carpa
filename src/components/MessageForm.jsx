/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/named */
import React from 'react';
import axios from 'axios';
import styles from '../styles/MessageForm.module.css';
import { ChatHeader } from './ChatHeader';
import { FormInput } from './FormInput';
import { MessageItem } from './MessageItem';
import MyContext from './MyContext.Context';


export function MessageForm(props) {
  const {
    details, style, user, messages,
  } = props;
  const [dragActive, setDragActive] = React.useState(false);
  const [dragFiles, setDragFiles] = React.useState(null);
  const messagesToRender = [];
  if (details === null) {
    return 'Empty';
  }
  let chatImg = 'https://image.flaticon.com/icons/svg/190/190588.svg';
  let chatTitle = details.title;
  if (details.members.length === 2) {
    details.members.forEach((member) => {
      if (user.username !== member.username) {
        chatTitle = member.username;
        chatImg = member.avatar || chatImg;
      }
    });
  }


  const dragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  const dragLeave = () => {
    setDragActive(false);
  };

  const drop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    setDragFiles(event.dataTransfer.files[0]);
  };


  messages.forEach((element) => {
    const messageItem = <MessageItem inner={element} user={user}/>;
    messagesToRender.push(messageItem);
  });


  return (
        <div
            onDrop={drop}
            onDragOver={dragOver}
            onDragLeave={dragLeave}
            style={style}
            className={styles.messageForm}>
            <div className={`${styles.dragNDropArea} ${dragActive && styles.activeZone}`}>
                <div className={styles.dragNDropImage} />
            </div>
            <MyContext.Consumer>
                {(value) => (
                    <ChatHeader
                        details={details}
                        clickBack={value.closeDialogue.bind(value, 'MessageForm')}
                        chatTitle={chatTitle}
                        chatImg={chatImg}
                    />
                )}
            </MyContext.Consumer>
            <div className={styles.chat}>
                <div className={styles.messagesList}>
                    {messagesToRender.reverse()}
                </div>
            </div>

            <div className={styles.inputForm}>
                <MyContext.Consumer>
                    {(value) => (
                        <FormInput
                            requireRecorder={value.requireRecorder.bind(value)}
                            mediaRecorder={value.state.mediaRecorder}
                            messageHandler={value.messageHandler.bind(value)}
                            dragFiles={[dragFiles, setDragFiles]}
                        />
                    )}
                </MyContext.Consumer>
            </div>
        </div>
  );
}
