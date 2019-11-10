import React from 'react'
import styles from '../styles/FormInput.module.css'


export function FormInput(props) {
    const input = React.useRef(null)
    const {messageHandler} = props
    
    const onKeyPress = (event) => {
        if (event.charCode  === 13) {
          onSubmit()
        }
      }

    const onSubmit = () => {
        const value = input.current.value.trim()
        if (value !== ''){
            input.current.value = ''
            messageHandler(value)
        }
    }
    
    return (
        <div className={styles.formInput}>
            <div className={styles.attachButton} />
            <input onKeyPress={onKeyPress} ref={input} placeholder='Enter message...' />
            <button onClick={onSubmit} className={styles.sendButton} />
        </div>
    )
}