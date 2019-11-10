import React from "react"
import { DialogueForm } from './DialogueForm'
import { MessageForm } from './MessageForm'
import styles from '../styles/MainForm.module.css'
import MyContext from './MyContext.Context'


export class MainForm extends React.Component{
    constructor(props) {
        super(props)
        const storage = this.parseStorage();
        this.state = {
            chats: storage.chats,
            messages: storage.messages,
            chatCounter: storage.chatCounter,
            currentDialogue: null,
            // MessageFormAppearance: null,
            frameStyles: {
				MessageFormAppearance: null,
				DialoguesFormAppearance: null,
			},
        }
    }

    // eslint-disable-next-line class-methods-use-this
    parseStorage() {
        const storage = {
            chats: JSON.parse(localStorage.getItem('chats')),
            messages: JSON.parse(localStorage.getItem('messages')),
            chatCounter: JSON.parse(localStorage.getItem('chatCounter')),
        }
        if (!storage.chats) { 
            storage.chats = []
            storage.messages = {}
            storage.chatCounter = 0
        }
        return storage
    }
    
    openDialogue(chatId) {
        const { state } = this;
        state.frameStyles.MessageFormAppearance = {
            animationName: styles.chatAppearance,
        }
        state.currentDialogue = chatId
        this.setState(state);
    }

    closeDialogue() {
        const { state } = this;
        state.frameStyles.MessageFormAppearance = {
            animationName: styles.chatDisappear,
        }
        this.setState(state);
    }

    messageHandler(value, chatTimestamp=null, chatId=null) {
        let {currentDialogue, messages} = this.state
        if (!messages){
            messages = {}
        }
        if (chatId) {
            currentDialogue = chatId
            messages[currentDialogue - 1] = []
        }
        
        
        messages[currentDialogue - 1].push({
            id: 'test',
            content: value,
            amISender: true,
            time: chatTimestamp || new Date(),
            status: 'sent'
        })
        this.setState(messages)
        localStorage.setItem('messages', JSON.stringify(messages))
    }

    createHandler() {
        let {chats, chatCounter} = this.state
        const name = prompt("Enter person's name")
        const text = prompt('Write a message')
        chatCounter += 1
      
        this.messageHandler(text, new Date(), chatCounter)
        const chatMsgs = this.state.messages[chatCounter - 1]
        chats.push({
            id: chatCounter,
            title: name,
            is_group: false,
            host: 'Vladimir Carpa',
            lastMessage: chatMsgs[chatMsgs.length - 1],
            
        })
        
        this.setState({'chats':chats, 'chatCounter':chatCounter})
        localStorage.setItem('chats', JSON.stringify(chats))
        localStorage.setItem('chatCounter', JSON.stringify(chatCounter))
    }

    render() {
        const {state } = this;
        return (
            <MyContext.Provider value={this}>
                <div className={styles.container}>
                    <DialogueForm 
                    style={state.frameStyles.DialoguesFormAppearance} 
                    chats={state.chats}
                    />
                    <MessageForm 
                        style={state.frameStyles.MessageFormAppearance}
                        details={state.currentDialogue && state.chats[state.currentDialogue - 1]} 
                        messages={state.currentDialogue && state.messages[state.currentDialogue - 1]}
                    />
                </div>
            </MyContext.Provider>
        )
    }
}
