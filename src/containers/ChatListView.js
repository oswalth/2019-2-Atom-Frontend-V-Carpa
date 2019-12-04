import React from 'react';
import axios from 'axios';
import { DialogueItem } from '../components/DialogueItem'
import styles from '../styles/DialogueForm.module.css'

export default class ChatList extends React.Component{
    state = {
        chats: [],
        chatsToRender: [],
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/chats/')
            .then(res => {
                this.setState({
                    chats: res.data
                });
                const chatsToRender = []
                this.state.chats.forEach((chat) => {
                    const chatItem = <DialogueItem chat={chat} />
                    chatsToRender.push(chatItem)
                })
                this.setState({
                    chatsToRender: chatsToRender
                })
            })
    }

    render () {
        return (
            <div className={styles.dialogues}>
                <div className={styles.dialogueList}>
                    {this.state.chatsToRender.length === 0 ? (
                        <div>Loading...</div>
                    ) : this.state.chatsToRender}
                </div>
            </div>
        )
    }
}



