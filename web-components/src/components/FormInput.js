const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: flex;
            flex-direction: row;
            border: 1px solid rgba(174, 181, 159, 1);
            height: 50px;
            box-sizing: border-box;
            background-color: #689CD2;
        }

        input {
            border: 0;
            outline: 0;
            width: 100%;
            height: 100%;
            border-color: #689CD2;
            background-color: transparent;
        }

        .clip {
            height: 100%;
            width: 40px;
            margin: 5px 15px;
            background: url(https://image.flaticon.com/icons/svg/116/116312.svg)
        }

        .send {
            height: 100%;
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
    constructor () {
        super();
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
