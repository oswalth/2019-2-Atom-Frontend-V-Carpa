import React from 'react';
import styles from '../styles/CreateDialogueButton.module.css';


export function CreateDialogueButton(props) {
  const { createChat } = props;
  return (
        <button
          onClick={createChat}
          className={styles.createDialogueButton}
        />
  );
}
