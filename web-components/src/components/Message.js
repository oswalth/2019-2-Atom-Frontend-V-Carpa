/* eslint-disable no-underscore-dangle */
const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        font-family: sans-serif;
        padding: 8px;
    }


    
    .messageItem{
        display: flex;
        flex-flow: column nowrap;
        margin-right: 10px;
        float: right;
        border-radius: 15px;
        padding: 10px;
        max-width: 80%;
        word-break: break-word;
    }

   .messageItem .message{
        padding: 4px 8px;
        background-color: #29384B;
        border-radius: .4em;
        color: #fff;
   }


    .messageItem .timestamp{
        font-size: 10px;
        padding: 4px 8px;
        color: #999;
        align-self: flex-end;
    }

    .messageItem .name{
        display: none;
    }

    

</style>
<div class="messageItem">
    <div class='name'></div>
    <div class='message'></div>
    <div class='timestamp'></div>
</div>
`;

class MessageItem extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$messageItem = this._shadowRoot.querySelector('.message');

    this.$name = this._shadowRoot.querySelector('.name');
    this.$message = this._shadowRoot.querySelector('.message');
    this.$timestamp = this._shadowRoot.querySelector('.timestamp');
    // this.$identifier = this._shadowRoot.getElementById('identifier')
  }

  static get observedAttributes() {
    return ['name', 'message', 'timestamp'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // eslint-disable-next-line default-case
    switch (name) {
      case 'message':
        this._message = newValue;
        break;
      case 'name':
        this._name = newValue;
        break;
      case 'timestamp':
        this._timestamp = newValue;
        break;
    }
    this._renderMessage();
  }

  connectedCallback() {
    this._renderMessage();
  }

  toObject() {
    this.messageObject = {
      name: this.$name.innerHTML,
      message: this.$message.innerHTML,
      timestamp: this.$timestamp.innerHTML,
    };
    return this.messageObject;
  }

  _renderMessage() {
    this.$name.innerHTML = this._name;
    this.$message.innerHTML = this._message;
    const time = new Date();
    if (this._timestamp) {
      this.$timestamp.innerHTML = this._timestamp;
    } else {
      this.$timestamp.innerHTML = time.toLocaleString('ru', {
        hour: 'numeric',
        minute: 'numeric',
      });
    }
  }
}

customElements.define('message-item', MessageItem);
