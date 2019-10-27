/* eslint-disable no-underscore-dangle */
const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        font-family: sans-serif;
        
        color: #000;
        box-sizing: border-box;
    }

    
    .dialogue {
        width: 100%;
        display: flex;
        cursor: pointer;
        transition-duration: 0.4s;
    }

    .dialogue:hover{
        background-color: #c4c4c4;
    }


    .dialogue .avatar{
        height: 60px;
        width: 60px;
        margin: auto;
        border-radius: 50%; 
        flex-shrink: 0;
        flex-grow: 0;
        background: url(https://image.flaticon.com/icons/svg/190/190588.svg)
    }

    .dialogue .wrapper{
        flex: auto;
        padding: 10px;
        border-bottom: 0.5px solid #4f4f4f;
        height:100%;
        
    }

    .dialogue .text {
        display: flex;
        flex-flow: row wrap;
        align-self: flex-end;
        justify-content: space-between;
        height: 100%;
    }

    .dialogue .name{
        padding-bottom: 5px;
    }

    .dialogue .time{
        font-size: 12px;
        color: #4f4f4f;
        float: right;
        padding-right: 20px;
    }

    .dialogue .info{
        display: flex;
        flex-flow: row wrap;
        align-items: flex-end;
        justify-content: space-between;
        height: 100%;
        padding-bottom: 10px;
    }

    .dialogue .message{
      flex: auto;
      color: #4f4f4f;
      margin-right: 20px;
      text-overflow: ellipsis;
  }

    .dialogue .status{
        color: #4f4f4f;
        padding-right: 20px;
    } 
    

</style>
<div class="dialogue">
    <div class='avatar'></div>
    <div class='wrapper'>
      <div class='text'>
          <div class='name'></div>
          <div class='time'></div>
      </div>
      <div class='info'>
          <div class='message'></div>
          <div class='status'>ok</div>
      </div>
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
  }

  static get observedAttributes() {
    return ['personname', 'dialogueid'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // eslint-disable-next-line default-case
    switch (name) {
      case 'personname':
        this.personName = newValue;
        this.$name.innerHTML = this.personName;
        break;
      case 'dialogueid':
        this.dialogueID = newValue;
        break;
    }
  }

  toObject() {
    this.dialogueObject = {
      name: this.$name.innerHTML,
      message: this.$message.innerHTML,
      timestamp: this.$timestamp.innerHTML,
    };
    return this.dialogueObject;
  }

  _renderMessage() {
    const msgs = JSON.parse(localStorage.getItem(`dialogue#${this.dialogueID}-${this.personName}`));
    if (msgs === null) {
      this.$timestamp.innerHTML = new Date().toLocaleString('ru', {
        hour: 'numeric',
        minute: 'numeric',
      });
    } else {
      this.dialogue = msgs[msgs.length - 1];
      this.$message.innerHTML = this.dialogue.message;
      this.$timestamp.innerHTML = this.dialogue.timestamp;
    }
  }
}

customElements.define('dialogue-item', DialogueItem);
