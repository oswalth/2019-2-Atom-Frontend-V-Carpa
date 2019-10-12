/* eslint-disable no-underscore-dangle */
const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: flex;
            flex-direction: row;
           
            height: 50px;
            box-sizing: border-box;
            background-color: #F7F8FA;
        }

        input {
            border: 0;
            outline: 0;
            width: 100%;
            height: 100%;
            
            background-color: transparent;
        }

        .clip {
            height: 32px;
            width: 40px;
            margin: 5px 15px;
            background: url(https://image.flaticon.com/icons/svg/116/116312.svg)
        }

        .send {
            height: 32px;
            width: 40px;
            margin: 5px 15px;
            background: url(https://image.flaticon.com/icons/svg/309/309395.svg)
        }
    </style>

    <div class='clip'></div>
    <input type="text">
    <div class='send'></div>
`;

class FormInput extends HTMLElement {
  constructor() {
    super();
    // eslint-disable-next-line no-underscore-dangle
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$input = this.shadowRoot.querySelector('input');
  }

  static get observedAttributes() {
    return ['name', 'value', 'placeholder', 'disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.$input.setAttribute(name, newValue);
  }

  get value() {
    return this.$input.value;
  }
}

window.customElements.define('form-input', FormInput);
