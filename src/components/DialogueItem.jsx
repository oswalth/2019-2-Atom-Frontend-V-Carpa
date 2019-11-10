/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import styles from '../styles/DialogueItem.module.css';
import MyContext from './MyContext.Context';


export function DialogueItem(props) {
  const { chat } = props;
  const formattedTime = new Date(chat.lastMessage.time);
  return (
        <MyContext.Consumer>
            {(value) => (
                <div onClick={value.openDialogue.bind(value, chat.id)} className={styles.dialogue}>
                    <div className={styles.avatar} />
                    <div className={styles.wrapper}>
                        <div className={styles.text}>
                            <div className={styles.name}>{chat.title}</div>
                            <div className={styles.time}>{formattedTime.toLocaleString('ru', {
                              hour: 'numeric',
                              minute: 'numeric',
                            })}</div>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.message}>{chat.lastMessage.content}</div>
                            <div className={styles.status}>{chat.lastMessage.status}</div>
                        </div>
                    </div>
                </div>
            )}
        </MyContext.Consumer>
  );
}
