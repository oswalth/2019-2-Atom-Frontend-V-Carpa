/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/named */
import React from 'react';
import styles from '../styles/MessageForm.module.css';
import { ChatHeader } from './ChatHeader';
import { FormInput } from './FormInput';
import { MessageItem } from './MessageItem';
import MyContext from './MyContext.Context';


export function MessageForm(props) {
  const { messages, details, style } = props;

  if (details === null) {
    return '';
  }
  const messagesToRender = [];
  messages.forEach((element) => {
    const messageItem = <MessageItem inner={element} />;
    messagesToRender.push(messageItem);
  });
  return (
        <div style={style} className={styles.messageForm}>
            <MyContext.Consumer>
                {(value) => (
                    <ChatHeader
                        details={details}
                        clickBack={value.closeDialogue.bind(value)}
                    />
                )}
            </MyContext.Consumer>
            <div className={styles.chat}>
                <div className={styles.messagesList}>
                    {messagesToRender}
                </div>
            </div>

            <div className={styles.inputForm}>
                <MyContext.Consumer>
                    {(value) => (
                        <FormInput
                            messageHandler={value.messageHandler.bind(value)}
                        />
                    )}
                </MyContext.Consumer>
            </div>
        </div>
  );
}
