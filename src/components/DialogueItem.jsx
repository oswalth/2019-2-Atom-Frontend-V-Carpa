/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/DialogueItem.module.css';
import MyContext from './MyContext.Context';


export function DialogueItem(props) {
  const { chat } = props;
  let formattedTime = new Date();
  const content = 'No messages yet';
  if (chat.last_message !== null){
    formattedTime = new Date(chat.last_message.added_at); 
  }  
  return (
        <MyContext.Consumer>
            {(value) => (
                <div className={styles.dialogue}>
                    <Link to={`/profile/${chat.id}`} style={{ textDecoration: 'none' }}>
                        <div className={styles.avatar} />
                    </Link>
                    <div className={styles.wrapper}>
                        <Link to={`/chats/${chat.id}`} style={{ textDecoration: 'none', color: 'unset' }}>
                            <div className={styles.text}>
                                <div className={styles.name}>{chat.title}</div>
                                <div className={styles.time}>{formattedTime.toLocaleString('ru', {
                                  hour: 'numeric',
                                  minute: 'numeric',
                                })}</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.message}>{
                                chat.last_message ? 
                                chat.last_message.content || 'Attachment' :
                                content}
                            </div>
                                <div className={styles.status}>OK</div>
                            </div>
                        </Link>
                    </div>
                </div>
            )}
        </MyContext.Consumer>
  );
}
