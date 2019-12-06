import React from 'react';
import axios from 'axios';
import { DialogueItem } from '../components/DialogueItem';
import styles from '../styles/ChatListView.module.css';
import { CreateDialogueButton } from '../components/CreateDialogueButton';
import ChatForm from './ChatForm';

export default class ChatList extends React.Component {
    state = {
      chats: [],
      chatsToRender: [],
      chatFormStyle: null,
    }

    componentDidMount() {
      axios.get('http://127.0.0.1:8000/api/chats/')
        .then((res) => {
          this.setState({
            chats: res.data,
          });
          const chatsToRender = [];
          this.state.chats.forEach((chat) => {
            const chatItem = <DialogueItem chat={chat} />;
            chatsToRender.push(chatItem);
          });
          this.setState({
            chatsToRender,
          });
        });
    }

    handleSubmit(event) {
      event.preventDefault();
      const { chats } = this.state;
      console.log(chats);
    }

    render() {
      return (
            <div className={styles.dialogues}>
                <div className={styles.dialogueList}>
                    {this.state.chatsToRender.length === 0 ? (
                        <div>Loading...</div>
                    ) : this.state.chatsToRender}
                </div>
                <button
                    onClick={() => {
                      !this.state.chatFormStyle
                      && this.setState({ chatFormStyle: { display: 'block' } });
                      this.state.chatFormStyle && this.setState({ chatFormStyle: null });
                    }}
                    className={styles.createDialogueButton}
                />
                <div className={styles.formPopUp} id="myForm" style={this.state.chatFormStyle}>
                    <form
                        onSubmit={(event) => {
                          this.handleSubmit(event);
                        }}
                        className={styles.formContainer}>
                        <h1>Create Chat</h1>
                        <label for="email"><b>Add Member</b></label>
                        <input type="text" placeholder="Enter username" name="email" required />

                        <label for="psw"><b>Message</b></label>
                        <input type="text" placeholder="Type message" name="psw" />

                        <button type="submit" className={styles.btn}>Create</button>
                    </form>
                </div>
            </div>
      );
    }
}
