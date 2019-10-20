/* eslint-disable no-underscore-dangle */
const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        font-family: sans-serif;
        padding: 8px;
        color: #000;
    }

    
    .dialogue {
        width: 100%;
        display: flex;
        flex-flow: row;
        margin-right: 10px;           
        padding: 10px;
        align-items: center;
    }

    .dialogue .avatar{
        height: 30px;
        width: 30px;
        margin: 5px 15px;
        background: url(https://image.flaticon.com/icons/svg/156/156887.svg)
    }


    .dialogue .text {
        display: flex;
        width: 100%;
        flex-flow: column wrap;
        flex-grow: 1;
        align-self: stretch;
        height: 100%;
    }

    .dialogue .message{
        color: #4f4f4f;
   }

    .dialogue .info{
        display: flex;
        flex-flow: column wrap;
    }

    .dialogue .status{
        align-self: end;
    } 


    .dialogue .time{
        font-size: 10px;
        padding-top: 4px;
        color: #000;
        
        align-items: center;
    }


    

</style>
<div class="dialogue">
    <div class='avatar'>
    </div>
    <div class='text'>
        <div class='name'></div>
        <div class='message'></div>
    </div>
    <div class='info'>
        <div class='time'></div>
        <div class='status'>ok</div>
    </div>
</div>
`;

class DialogueItem extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$dialogue = this._shadowRoot.querySelector('.dialogue');

    this.$name = this._shadowRoot.querySelector('.name');
    this.$message = this._shadowRoot.querySelector('.message');
    this.$timestamp = this._shadowRoot.querySelector('.time');

    console.log(this.$name);
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
    console.log('rendering in atr dialogue-item');
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
    console.log('rendering dialogue-item');
    this.$name.innerHTML = this._name;
    this.$message.innerHTML = this._message;
    const time = new Date();
    if (this._timestamp) {
      this.$timestamp = this._timestamp;
    } else {
      this.$timestamp.innerHTML = time.toLocaleString('ru', {
        hour: 'numeric',
        minute: 'numeric',
      });
    }
    this.identifier = Date.parse(time) + (Math.random() * 1000);
  }
}

customElements.define('dialogue-item', DialogueItem);
