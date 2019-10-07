const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            left: 5%;
            top: 50px;
            height: 90%;
            font-family: sans-serif;
            position: fixed;
            width: 90%;
            margin: 0 auto;
            overflow-y: auto;
           
        }
        
        
        .messagesList{
            display: flex;
            color: #000;
        }

        form-input {
            height: 2%;
            width: 60%;
            position: fixed;
            bottom: 0px;
            left: 20%;
            border-color: #999;
    
        }

        .result {
            color: red;
        }

        input[type=submit] {
            visibility: visible;
        }
    </style>
    
    <form>
        <div class="result"></div>
        <form-input name="message-text" placeholder="Message"></form-input>
    </form>
    <div id='messagesList'></div>
`;

class MessageForm extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$form = this._shadowRoot.querySelector('form');
        this.$input = this._shadowRoot.querySelector('form-input');
        //this.$message = this._shadowRoot.querySelector('.result');
        this.$messagesList = this._shadowRoot.getElementById('messagesList')

        this.$form.addEventListener('submit', this._onSubmit.bind(this));
        this.$form.addEventListener('keypress', this._onKeyPress.bind(this));
    }

    _onSubmit(event) {
        event.preventDefault();
        if (this.$input.value.length > 0) {
            let $message = document.createElement('message-item')
            $message.setAttribute('avatar', 'https://sun9-67.userapi.com/c854228/v854228593/11a0f9/ZxcsGQfVitg.jpg')
            $message.setAttribute('text', this.$input.value)
            $message.setAttribute('name', 'Vladimir Carpa')
            this.$input.$input.value = '';
            //$message.innerText = this.$input.value;
            this.$messagesList.appendChild($message)
            console.log(($message))
            localStorage.setItem($message.$identifier, JSON.stringify($message))
        }
    }

    connectedCallback(){
        let storage = [];
        for (let i=0; i< localStorage.length; i++){
            let key = localStorage.key(i)
            if (!isNaN(key)){
                this.$messagesList.appendChild(JSON.parse(localStorage.getItem(key)))
            }
        }


    }

    _onKeyPress(event) {
        if (event.keyCode == 13) {
            this.$form.dispatchEvent(new Event('submit'));
            
        }
    }

    renderList() {

    }
}

customElements.define('message-form', MessageForm);
