/* eslint-disable import/prefer-default-export */
import React from 'react';
import styles from '../styles/FormInput.module.css';


export function FormInput(props) {
  const input = React.useRef(null);
  const { messageHandler } = props;

  const [dropOutStyle, setDropOutStyle] = React.useState(null);

  const onSubmit = () => {
    const value = input.current.value.trim();
    if (value !== '') {
      input.current.value = '';
      messageHandler(value);
    }
  };

  const onKeyPress = (event) => {
    if (event.charCode === 13) {
      onSubmit();
    }
  };

  return (
        <div className={styles.formInput}>
            <div
              onClick={() => {
                !dropOutStyle && setDropOutStyle({
                  height: '120px',
                });
                dropOutStyle && setDropOutStyle(null);
              }}
              className={styles.attachButton} />
            <input onKeyPress={onKeyPress} ref={input} placeholder='Enter message...' />
            <button onClick={onSubmit} className={styles.sendButton} />
            <div className={styles.dropOut} style={dropOutStyle}>
              <div className={styles.dropOutContainer}>
                <div className={`${styles.attachItem} ${styles.attachImage}`}></div>
                <div className={`${styles.attachItem} ${styles.attachGeo}`}></div>
              </div>
            </div>
        </div>
  );
}
