import React from 'react';
import axios from 'axios';
import { MessageItem } from '../components/MessageItem';
import { FormInput } from '../components/FormInput';
import styles from '../styles/MessageForm.module.css';
import { recordStream } from '../lib/recordStream';
import { connect } from 'react-redux';


class ChatDetail extends React.Component{
    state = {
        chat: {},
        messagesToRender: [],
        chatMembers: [],
        dragActive: false,
        dragFiles: null,
    }

    dragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({dragActive: true});
    };
    
    dragLeave() {
        this.setState({dragActive: false});
    };
    
     drop(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({dragActive: false});
        this.setState({dragFiles: event.dataTransfer.files[0]})
    };

    componentDidMount() {
        const chatID = this.props.match.params.chatID;
        console.log(this.props.token)
        axios.defaults.headers = {
            "Content-Type": "application/json",
            "Authorization": this.props.token
        }
        axios.get(`http://localhost:8000/api/chats/${chatID}/`)
            .then(res => {
                this.setState({
                    chat: res.data
                });
                const messagesToRender = [];
                this.state.chat.messages.reverse().forEach((message) => {
                    const messageItem = <MessageItem inner={message} />;
                    messagesToRender.push(messageItem);
                })
                this.setState({
                    messagesToRender: messagesToRender
                })
            })
    }

    handleDelete = (event) => {
        const chatID = this.props.match.params.chatID;
        axios.delete(`http://localhost:8000/api/chats/${chatID}/`);
        this.props.history.push('/');
    }

    messageHandler(value, chatID, attachments = null) {
        axios.post('http://localhost:8000/api/messages/', {
            content: value,
            chat: {
                id: chatID
            },
        },
        {
            headers: {'Authorization': localStorage.getItem('token')}
        }
        )
        .then((res) => {
            console.log(res)
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
    

    mediaRecorder() {

    }

    render () {
        return (
            <div 
                onDrop={this.drop}
                onDragOver={this.dragOver}
                onDragLeave={this.dragLeave}

                className={styles.messageForm}>
                <div className={styles.chat}>
                    <div className={styles.messagesList}>
                        {this.state.messagesToRender.length === 0 ? (
                            <div>Loading...</div>
                        ) : this.state.messagesToRender}
                    </div>
                </div>
                <div className={styles.inputForm}>
                    <FormInput
                        chatID={this.props.match.params.chatID}
                        requireRecorder={this.requireRecorder}
                        mediaRecorder={this.mediaRecorder}
                        messageHandler={this.messageHandler}
                        dragFiles={this.dragFiles}
                    />
                </div>
            </div>
            
        )
    }
}


const mapStateToProps = state => {
    return {
      token: state.token
    }
  }

export default connect(mapStateToProps)(ChatDetail);

