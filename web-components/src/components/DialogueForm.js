/* eslint-disable no-underscore-dangle */
const template = document.createElement('template');
template.innerHTML = `
    <style>
        * {
            box-sizing: border-box;
        }
        

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
        
        .dialogues {
            width: 100%;
            display: flex;
            flex: auto;
            flex-direction: column-reverse;
            align-content: flex-end;
            overflow-y: auto;
        }

        .dialoguesList{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            flex-direction: column;

        }

        .dialogue-item{
            box-sizing: border-box;
            width: 100%;
            padding: 0 10px 20px 10px;
        }

        .dialogues .createDialougeButton {
            display: block;
            position: fixed;
            bottom: 0;
            right: 0;
            height: 40px;
            width: 40px;
            background: url(https://image.flaticon.com/icons/svg/4/4378.svg);
            margin: 0px 30px 20px 0px;
        }

        ::-webkit-scrollbar{
            width: 0px;
        }
        }
    </style>
    
    <div class='header'>
        <dialogues-header>
        </dialouges-header>
    </div>
    <div class='dialogues'>
        <div class='dialoguesList'>
        </div>
        
    </div>


`;

class DialogueForm extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$dialoguesList = this._shadowRoot.querySelector('.dialoguesList');
    this.dialoguesCounter = 0;
  }

  generateDialogue(senderName, text, timestamp) {
    const dialogue = document.createElement('dialogue-item');
    if (timestamp) {
      dialogue.setAttribute('time', timestamp);
    }
    dialogue.setAttribute('message', text);
    dialogue.setAttribute('name', senderName);
    return dialogue;
  }

  connectedCallback() {
    this.dialogues = [];
    if (localStorage.length === 0) {
      console.log('empty');
    } else {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes('dialogue')) {
          this.dialogues.push(JSON.parse(localStorage.getItem(key)));
        }
      }
    }
    this.dialogues.forEach((dlg) => {
      const lastMsg = dlg[dlg.length - 1];
      const $dialogue = this.generateDialogue(lastMsg.name, lastMsg.text, lastMsg.timestamp);
      this.$dialoguesList.appendChild($dialogue);
    });
  }
}

customElements.define('dialogue-form', DialogueForm);
