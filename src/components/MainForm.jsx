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


export class MainForm extends React.Component {
  constructor(props) {
    super(props);
    // const storage = this.parseStorage();
    this.state = {
      chats: [],
      messages: {},
      chatCounter: null,
      user: null,
      currentDialogue: null,
      mediaRecorder: null,
      frameStyles: {
        MessageForm: null,
        Profile: null,
      },
    };
  }

  componentDidMount() {
    this.trySignIn()
    this.loadChats()
    setInterval(() => {
      axios.get('http://127.0.0.1:8000/api/events/')
      .then(async (res) => {
        const events = res.data
        await axios.get('http://127.0.0.1:8000/api/events/delievered/')
        events.forEach((event) => {
          const newMessage = event.message;
          this.messageHandler(
            newMessage.content,
            newMessage.added_at,
            newMessage.chat,
            newMessage.sender,
          )
        })
      })
    }, 500)
  }

  trySignIn() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({user: JSON.parse(localStorage.getItem('user'))});
      axios.defaults.headers = {
        "Content-type": "application/json",
        "Authorization": token
      }
    }
  }

  login(username, password){
    axios.post('http://127.0.0.1:8000/rest-auth/login/', {
            username: username,
            password: password,
    })
    .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate);
        this.getUserInfo(username);
    })
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('user');
    this.setState({user: null});
  }

  getUserInfo(username) {
    axios.get(`http://127.0.0.1:8000/api/users/${username}`)
    .then(res => {
      localStorage.setItem('user', JSON.stringify(res.data))
      this.setState({user: res.data})
    })
  }

  // eslint-disable-next-line class-methods-use-this
  loadChats() {
    axios.get('http://127.0.0.1:8000/api/chats/')
    .then(res => {
      this.setState({chats: res.data})
      this.state.chats.forEach((chat) => {
        this.loadMessages(chat.id)
      })
    })
  }

  loadMessages(chatId) {
    axios.get(`http://127.0.0.1:8000/api/chats/${chatId}`)
    .then(res => {
      const messages = this.state.messages;
      messages[chatId] = res.data.messages;
      this.setState({messages: messages})
    })
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

  messageHandler(
    value, 
    chatTimestamp = null, 
    chatId = null, 
    sender=null,
    attachments = null, 
    ) {
    let { currentDialogue, messages, user } = this.state;
    let isAttached = false;
    if (!messages) {
      messages = {};
    }
    if (chatId) {
      currentDialogue = chatId;
      messages[currentDialogue - 1] = [];
    }
    const message = {
      content: value,
      added_at: chatTimestamp || new Date(),
      sender: sender || user.id
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
    messages[currentDialogue].splice(0,0, message);
    this.setState(messages);
    if (!sender){
      axios.post(`http://127.0.0.1:8000/api/messages/`, {
        content: value,
        chat: {
          id: currentDialogue
        }
      })
    }
    
    if (!chatId) {
      this.setLastMessage();
    }
  }

  createHandler() {
    // eslint-disable-next-line prefer-const
    let { chats, chatCounter } = this.state;
    const name = prompt("Enter person's name");
    // const text = prompt('Write a message');
    // chatCounter += 1;
    // this.messageHandler(text, new Date(), chatCounter);
    // const chatMsgs = this.state.messages[chatCounter - 1];
    // chats.push({
    //   id: chatCounter,
    //   title: name,
    //   is_group: false,
    //   host: 'Vladimir Carpa',
    //   lastMessage: chatMsgs[chatMsgs.length - 1],

    // });
    this.setState({ chats, chatCounter });
    this.setLastMessage(chatCounter);
    localStorage.setItem('chats', JSON.stringify(chats));
    localStorage.setItem('chatCounter', JSON.stringify(chatCounter));
  }

  setLastMessage(chatId = null) {
    const { messages, chats } = this.state;
    let { currentDialogue } = this.state;
    if (chatId) {
      currentDialogue = chatId;
    }
    const chatMessages = messages[currentDialogue];
    chats[currentDialogue - 1].lastMessage = chatMessages[chatMessages.length - 1];
    this.setState(chats);
    localStorage.setItem('chats', JSON.stringify(chats));
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
    const path = this.props.location.pathname;

    switch (true) {
      case /chats\/\d+\/?$/.test(path):
        const chatId = parseInt(path.match(/\d+/));
        this.openDialogue(chatId);
        break;
      case /profile\/\d+\/?$/.test(path):
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
        { state.user ?
          <div className={styles.container}>
            <DialogueForm
              chats={state.chats}
              user={state.user}
            />
            <MessageForm
                redirect={this.props.history}
                style={state.frameStyles.MessageForm}
                user={state.user}
                chatId={state.currentDialogue}
                details={state.currentDialogue && state.chats[state.currentDialogue - 1]}
                messages={state.currentDialogue
                    && state.messages[state.currentDialogue]}
            />
            <Profile style={state.frameStyles.Profile}/>
          </div> :
        <Login login={this.login.bind(this)}></Login>
      }
      </MyContext.Provider>
    );
  }
}
