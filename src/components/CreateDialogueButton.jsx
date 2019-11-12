import React from 'react';
import styles from '../styles/CreateDialogueButton.module.css';


export function CreateDialogueButton(props) {
  const { createHandler } = props;
  return (
        <button
            onClick={createHandler} className={styles.createDialogueButton}
        />
  );
}
