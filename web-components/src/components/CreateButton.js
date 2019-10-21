/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
const template = document.createElement('template');
template.innerHTML = `
<style>
    
    .createDialogueButton {
        display: block;
        border: none;
        cursor: pointer;
        opacity: 0.8;
        position: fixed;
        bottom: 0;
        right: 0;
        height: 40px;
        width: 40px;
        background: url(https://image.flaticon.com/icons/svg/4/4378.svg);
        margin: 0px 30px 20px 0px;
    }

</style>

<button class='createDialogueButton'></button>

`;

class CreateButton extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$button = this.shadowRoot.querySelector('button');
    // this.$identifier = this._shadowRoot.getElementById('identifier')
  }

  static openForm() {
    const person = prompt('Enter nickname of a person you would like to conversate with');
    return person;
  }
}

customElements.define('create-button', CreateButton);
