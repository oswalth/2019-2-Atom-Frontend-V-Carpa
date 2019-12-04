/* eslint-disable no-console */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/named */
/* eslint-disable no-alert */
import React from 'react';
import { DialogueForm } from './DialogueForm';
import { MessageForm } from './MessageForm';
import { Profile } from './Profile';
import { Login } from './LoginForm';
import MyContext from './MyContext.Context';
import { recordStream } from '../lib/recordStream';
import styles from '../styles/MainForm.module.css';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth'


export class MainForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      messages: new Object(),
      lastMessages: {},
      chatCounter: null,
      currentDialogue: null,
      mediaRecorder: null,
      frameStyles: {
        MessageForm: null,
        Profile: null,
      },
  }
  }
    

  componentDidMount() {
    this.parseStorage();
    console.log(this.props);
  }

  // eslint-disable-next-line class-methods-use-this
  async parseStorage() {
    const { state } = this;
    await axios.get('http://localhost:8000/api/chats/')
            .then((res) => {
                this.setState({
                    chats: res.data
                });
            })
    const messages = {}
    this.state.chats.forEach(async (chat) => {
      await axios.get(`http://localhost:8000/api/chats/${chat.id}/`)
            .then((res) => {
             
                messages[chat.id] = res.data.messages
              
            })
    })
    this.setState({messages: messages})
  }

  async requireRecorder() {
    if (this.state.mediaRecorder) {
      return this.state.mediaRecorder;
    }

    return recordStream().then((value) => {
      this.setState({ mediaRecorder: value });
      return value;
    }).catch((err) => {
      throw new Error(err);
    });
  }

  async loadChatMessages(chatId) {
    const { state } = this;
    await axios.get(`http://localhost:8000/api/chats/${chatId}/`)
      .then((res) => {
        state.messages[chatId] = res.data.messages
      })
    if (state !== this.state) {
      this.setState({messages: state.messages});
    }
    console.log(this.state.messages[this.state.currentDialogue])
  }

  openDialogue(chatId) {
    const { state } = this;
    state.frameStyles.MessageForm = {
      animationName: styles.chatAppearance,
    };
    state.currentDialogue = chatId;
    if (state !== this.state) {
      this.setState(state);
    }
  }

  closeDialogue(frame = null) {
    const { state } = this;
    if (!frame) {
      Object.keys(state.frameStyles).forEach((index) => {
        state.frameStyles[index] = {
          animationName: styles.chatDisappear,
        };
      });
    } else {
      state.frameStyles[frame] = {
        animationName: styles.chatDisappear,
      };
    }
    if (state !== this.state) {
      this.setState(state);
    }
  }

  messageHandler(value, chatTimestamp = null, chatId = null, attachments = null) {
    
    let { currentDialogue, messages } = this.state;
    let isAttached = false;
    if (!messages) {
      messages = {};
    }
    if (chatId) {
      currentDialogue = chatId;
      messages[currentDialogue] = [];
    }
    const message = {
      content: value,
      chat: currentDialogue,
    };
    if (attachments) {
      message.attachments = attachments;
      isAttached = true;

      const data = new FormData();
      data.append(Attr.type, attachments.file);

      fetch('https://tt-front.now.sh/upload', {
        method: 'POST',
        body: data,
      }).then(() => {
        // pass
      }).catch(console.log);
    }
    messages[currentDialogue].push(message);
    this.setState(messages);
    if (!chatId) {
      this.setLastMessage();
    }
  }

  createHandler() {
    // eslint-disable-next-line prefer-const
    let { chats, chatCounter } = this.state;
    const name = prompt("Enter person's name");
    const text = prompt('Write a message');
    chatCounter += 1;
    this.messageHandler(text, new Date(), chatCounter);
    const chatMsgs = this.state.messages[chatCounter - 1];
    chats.push({
      id: chatCounter,
      title: name,
      is_group: false,
      host: 'Vladimir Carpa',
      lastMessage: chatMsgs[chatMsgs.length - 1],
    });
    this.setState({ chats, chatCounter });
    this.setLastMessage(chatCounter);
  }

  setLastMessage(chatId = null) {
    debugger;
    const { messages, chats } = this.state;
    let { currentDialogue } = this.state;
    if (chatId) {
      currentDialogue = chatId;
    }
    const chatMessages = messages[currentDialogue];
    chats[currentDialogue - 1].last_message = chatMessages[chatMessages.length - 1];
    this.setState(chats);
  }

  openProfile() {
    const { state } = this;
    state.frameStyles.Profile = {
      animationName: styles.chatAppearance,
    };
    if (state !== this.state) {
      this.setState(state);
    }
  }

  pageRouter() {
    console.log(this.props)
    const path = this.props.location.pathname;
    switch (true) {
      case /chat\/\d\/?$/.test(path):
        const chatId = parseInt(path.match(/\d+/), 10);
        this.openDialogue(chatId);
        break;
      case /profile\/\d\/?$/.test(path):
        this.openProfile();
        break;
      default:
        this.closeDialogue();
        break;
    }
  }

  render() {
    this.pageRouter();
    const { state } = this;
    return (
      <MyContext.Provider value={this}>
          <div className={styles.container}>
            <DialogueForm chats={state.chats}/>
            <MessageForm
                style={state.frameStyles.MessageForm}
                details={state.currentDialogue && state.chats[state.currentDialogue - 1]}
                messages={state.currentDialogue 
                    && state.messages[state.currentDialogue]}
            />
            <Profile style={state.frameStyles.Profile}/>
          </div>
      </MyContext.Provider>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(MainForm);
