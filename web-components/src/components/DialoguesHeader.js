/* eslint-disable no-underscore-dangle */
const template = document.createElement('template');
template.innerHTML = `
<style>
    *{
        box-sizing: border-box;
    }

    :host {
        display: flex;
        flex-direction: row;
        font-family: sans-serif;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .menuBurger{
        height: 30px;
        width: 30px;
        margin: 5px 15px;
        background: url(https://image.flaticon.com/icons/svg/130/130918.svg) no-repeat center center;
    }

    .messenger{
        flex: auto;
        height: 100%;
        padding-left: 20px;
    }
    
    .searchButton{
        height: 20px;
        width: 20px;
        margin: 5px 15px;
        padding-right: 40px;
        background: url(https://image.flaticon.com/icons/svg/149/149309.svg) no-repeat center center;
    }  
</style>

<div class='menuBurger'></div>
<div class='messenger'>Messenger</div>
<div class='searchButton'></div>
`;


class DialoguesHeader extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('dialogues-header', DialoguesHeader);
