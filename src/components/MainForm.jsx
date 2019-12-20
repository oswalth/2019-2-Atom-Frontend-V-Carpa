/* eslint-disable import/no-unresolved */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/named */
/* eslint-disable no-alert */
import React from 'react';
import axios from 'axios';
import { DialogueForm } from './DialogueForm';
import { MessageForm } from './MessageForm';
import { Profile } from './Profile';
import { Login } from './LoginForm';
import MyContext from './MyContext.Context';
import { recordStream } from '../lib/recordStream';
import styles from '../styles/MainForm.module.css';


export class MainForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      messages: {},
      attachments: {},
      chatCounter: null,
      user: null,
      currentDialogue: null,
      mediaRecorder: null,
      ChatFormStyle: null,
      frameStyles: {
        MessageForm: null,
        Profile: null,
      },
    };
  }

  componentDidMount() {
    this.trySignIn();
    this.loadChats();
    setInterval(() => {
      axios.get('http://127.0.0.1:8000/api/events/')
        .then(async (res) => {
          const events = res.data;
          await axios.get('http://127.0.0.1:8000/api/events/delievered/');
          events.forEach((event) => {
            const newMessage = event.message;
            console.log(newMessage);
            this.messageHandler(
              newMessage.content,
              newMessage.added_at,
              newMessage.chat,
              newMessage.sender,
              (newMessage.has_attachment && newMessage.attachments),
            );
          });
        });
    }, 500);
  }

  trySignIn() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({ user: JSON.parse(localStorage.getItem('user')) });
      axios.defaults.headers = {
        'Content-type': 'application/json',
        Authorization: token,
      };
    }
  }

  login(username, password) {
    axios.post('http://127.0.0.1:8000/rest-auth/login/', {
      username,
      password,
    })
      .then((res) => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate);
        this.getUserInfo(username);
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('user');
    this.setState({ user: null });
  }

  getUserInfo(username) {
    axios.get(`http://127.0.0.1:8000/api/users/${username}`)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data));
        this.setState({ user: res.data });
      });
  }

  // eslint-disable-next-line class-methods-use-this
  loadChats() {
    axios.get('http://127.0.0.1:8000/api/chats/')
      .then((res) => {
        const chats = {};
        res.data.forEach((chat) => {
          chats[chat.id] = chat;
        });
        this.setState({ chats });
        const keys = Object.keys(chats);
        keys.forEach((key) => {
          this.loadMessages(chats[key].id);
        });
      });
  }

  loadMessages(chatId) {
    axios.get(`http://127.0.0.1:8000/api/chats/${chatId}`)
      .then((res) => {
        const { messages } = this.state;
        messages[chatId] = res.data.messages;
        this.setState({ messages });
        console.log(this.state.messages);
      });
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
        state.messages[chatId] = res.data.messages;
      });
    if (state !== this.state) {
      this.setState({ messages: state.messages });
    }
    console.log(this.state.messages[this.state.currentDialogue]);
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
    sender = null,
    attachments = null,
  ) {
    console.log(attachments);
    let { currentDialogue, messages } = this.state;
    const { user } = this.state;
    let isAttached = false;
    if (!messages) {
      messages = {};
    }
    if (chatId) {
      currentDialogue = chatId;
    }
    const message = {
      content: value,
      added_at: chatTimestamp || new Date(),
      sender: sender || user.id,
    };

    if (attachments) {
      message.attachments = attachments;
      isAttached = true;
    }

    messages[currentDialogue].splice(0, 0, message);
    this.setState(messages);

    if (!sender) {
      axios.post('http://127.0.0.1:8000/api/messages/', {
        content: value || 'Attachment',
        has_attachment: isAttached,
        chat: {
          id: currentDialogue,
        },
      })
        .then((res) => {
          if (isAttached) {
            attachments.list.forEach((attachment) => {
              const postBody = new FormData();
              let file;
              postBody.append('content', attachment.file);
              postBody.append('chat', currentDialogue);
              postBody.append('message', res.data.id);
              axios.post('http://127.0.0.1:8000/api/attachments/', postBody);
            });
          }
        });
    }

    if (!chatId) {
      this.setLastMessage();
    }
  }

  openPopUp() {
    if (!this.state.ChatFormStyle) {
      this.setState({ ChatFormStyle: { display: 'block' } });
    } else {
      this.setState({ ChatFormStyle: null });
    }
  }

  createHandler(membersNames, title = null) {
    // eslint-disable-next-line prefer-const
    let { chats } = this.state;
    const members = [];
    let isGroup = false;
    if (membersNames.length !== 1) {
      isGroup = true;
    }
    membersNames.forEach((member) => {
      axios.get(`http://127.0.0.1:8000/api/users/${member}/`)
        .then((res) => {
          members.push({
            username: res.data.username,
            avatar: res.data.avatar,
            last_read_message: null,
          });
        });
    });
    chats.tmp = {
      id: 'tmp',
      title,
      members,
      last_message: null,
      topic: 'no topic',
    };
    const postMembers = [{ username: this.state.user.username }];
    membersNames.forEach((member) => {
      postMembers.push({ username: member });
    });
    axios.post('http://127.0.0.1:8000/api/chats/create/', {
      title: title || 'Private chat',
      is_group_chat: isGroup,
      topic: 'no topic',
      members: postMembers,
    })
      .then(() => {
        this.setState({ chats });
      });
  }

  setLastMessage(chatId = null) {
    const { messages, chats } = this.state;
    let { currentDialogue } = this.state;
    if (chatId) {
      currentDialogue = chatId;
    }
    const chatMessages = messages[currentDialogue];
    chats[currentDialogue].last_message = chatMessages[0];
    this.setState({ chats });
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
    console.log(this.props);
    const path = this.props.location.pathname;

    switch (true) {
      case /chats\/\d+\/?$/.test(path):
        const chatId = parseInt(path.match(/\d+/), 10);
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
        { state.user
          ? <div className={styles.container}>
            <DialogueForm
              chats={state.chats}
              user={state.user}
              chatFormStyle={state.ChatFormStyle}
              createHandler={this.createHandler.bind(this)}
            />
            <MessageForm
                redirect={this.props.history}
                style={state.frameStyles.MessageForm}
                user={state.user}
                chatId={state.currentDialogue}
                details={state.currentDialogue && state.chats[state.currentDialogue]}
                messages={state.currentDialogue
                    && state.messages[state.currentDialogue]}
            />
            <Profile style={state.frameStyles.Profile}/>
          </div>
          : <Login login={this.login.bind(this)}></Login>
      }
      </MyContext.Provider>
    );
  }
}
