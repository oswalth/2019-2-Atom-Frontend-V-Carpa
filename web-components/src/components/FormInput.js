const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: inline-block;
            border: 1px solid rgba(174, 181, 159, 1);
            
        }

        input {
            border: 0;
            outline: none;
            width: 100%;
            height: 100%;
            border-color: #999;
        }
    </style>
    <input type="text">
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
