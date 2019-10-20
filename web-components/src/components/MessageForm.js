/* eslint-disable no-underscore-dangle */
const template = document.createElement('template');
template.innerHTML = `
    <style>

        

        :host {
            width: 100%;
            height: 100%;
            font-family: sans-serif;
            background-color: #CFD0D1 ;
            display: flex;
            flex-direction: column;
        }

        .header{
            width: 100%;
            background-color: #29384B;
            z-index: 1;
        }
        
        .chat {
            width: 100%;
            display: flex;
            flex: auto;
            flex-direction: column-reverse;
            align-content: flex-end;
            z-index: 0;
            overflow-y: auto;
        }

        .messagesList{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-end;
            flex-direction: column;

        }

        .message-item{
            box-sizing: border-box;
            width: 100%;
            padding: 0 10px 20px 10px;
        }

        .inputFrom {
            width: 100%;
            background-color: #F7F8FA;
            
            z-index: 1;
        }

        ::-webkit-scrollbar{
            width: 0px;
        }

        

        input[type=submit] {
            visibility: visible;
        }
    </style>
    
    <div class='header'>
        <chat-header>
        </chat-header>
    </div>
    <div class='chat'>
        <div class='messagesList'>
        </div>
    </div>
    <div class='inputForm'>
        <form>
            <div class="result"></div>
            <form-input name="message-text" placeholder="Message..."></form-input>
        </form>
    </div>

`;

class MessageForm extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$form = this._shadowRoot.querySelector('form');

    this.$input = this._shadowRoot.querySelector('form-input');
    this.$messagesList = this._shadowRoot.querySelector('.messagesList');

    this.$form.addEventListener('submit', this._onSubmit.bind(this));
    this.$form.addEventListener('keypress', this._onKeyPress.bind(this));
    this.avatar = 'https://sun9-67.userapi.com/c854228/v854228593/11a0f9/ZxcsGQfVitg.jpg';
    this.$dialogueID = 0;
  }

  _onSubmit(event) {
    event.preventDefault();
    if (this.$input.value.length > 0) {
      const $message = this.generateMessage();
      this.$input.$input.value = '';
      // $message.innerText = this.$input.value;
      this.$messagesList.appendChild($message);
      const msgobj = $message.toObject();
      this.messages.push(msgobj);
      localStorage.setItem(`dialogue#${this.$dialogueID}`, JSON.stringify(this.messages));
    }
  }

  generateMessage(senderName = 'Vladimir Carpa', text = this.$input.value, timestamp = null) {
    const message = document.createElement('message-item');
    if (timestamp) {
      message.setAttribute('time', timestamp);
    }
    message.setAttribute('text', text);
    message.setAttribute('name', senderName);

    return message;
  }

  connectedCallback() {
    if (`dialogue#${this.$dialogueID}` in localStorage) {
      this.messages = JSON.parse(localStorage.getItem(`dialogue#${this.$dialogueID}`));
    } else {
      this.messages = [];
    }
    this.messages.forEach((msg) => {
      const $message = this.generateMessage(msg.name, msg.text, msg.timestamp);
      this.$messagesList.appendChild($message);
    });
  }


  _onKeyPress(event) {
    if (event.keyCode === 13) {
      this.$form.dispatchEvent(new Event('submit'));
    }
  }
}

customElements.define('message-form', MessageForm);
