const template = document.createElement('template');
template.innerHTML = `
    <style>

        *{
            margin: 0;
            padding: 0;
            --fontNormalSize: 1.1em;
            --fontMinSize: 0.95em;
            --fontMaxSize: 1.2em;
            --fontMinMinSize: 0.8em;
            box-sizing: border-box;
        }

        :host {
            width: 100%;
            height: 100%;
            font-family: sans-serif;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
           
        }
        
        .chat {
            width: 100%;
            display: flex;
            flex: auto;
            flex-wrap: wrap;
            flex-direction: column-reverse;
            align-content: flex-end;
            z-index: 0;
            overflow-y: auto;
        }

        .messagesList{
            display: block;
            width: 100%;
            color: #000;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-end;
        }

        .message-item{
            box-sizing: border-box;
            width: 100%;
            padding: 0 10px 20px 10px;
        }

        .inputFrom {
            width: 100%;
            position: fixed;
            bottom: 0px;
            border-color: #999;
            z-index: 1;
        }


        input[type=submit] {
            visibility: visible;
        }
    </style>
    
    <div class='header'>
        <chat-header>
        </chat-header>
    </div>
    <div class='chat'>
        <div class='messagesList'>
        </div>
    </div>
    <div class='inputForm'>
        <form>
            <div class="result"></div>
            <form-input name="message-text" placeholder="Введите сообщеине"></form-input>
        </form>
    </div>

`;

class MessageForm extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$form = this._shadowRoot.querySelector('form');

        this.$input = this._shadowRoot.querySelector('form-input');
        this.$messagesList = this._shadowRoot.querySelector('.messagesList')

        this.$form.addEventListener('submit', this._onSubmit.bind(this));
        this.$form.addEventListener('keypress', this._onKeyPress.bind(this));
        this.avatar = 'https://sun9-67.userapi.com/c854228/v854228593/11a0f9/ZxcsGQfVitg.jpg'
    }

    _onSubmit(event) {
        
        event.preventDefault();
        
        if (this.$input.value.length > 0) {
            let $message = this.generateMessage()
            

            this.$input.$input.value = '';
            //$message.innerText = this.$input.value;
            this.$messagesList.appendChild($message)
            var [msgobj, idf] = $message.toObject();
            console.log((msgobj))
            console.log((idf))


            localStorage.setItem(idf, JSON.stringify(msgobj))
        }
    }

    generateMessage(senderName='Vladimir Carpa', text=this.$input.value, timestamp=null){
        let message = document.createElement('message-item')
        if (timestamp){
            message.setAttribute('timestamp', timestamp)
        }
        message.setAttribute('text', text)
        message.setAttribute('name', senderName)
        return message;
    }
    
    connectedCallback(){
        this.storage = [];
        for (let i=0; i< localStorage.length; i++){
            let key = localStorage.key(i)
            if (!isNaN(key)){
                let msgObj = JSON.parse(localStorage.getItem(key))
                let $message = this.generateMessage(msgObj.name, msgObj.text, msgObj.timestamp)
                //this.storage.push(this.generateMessage())
                //this.$messagesList.appendChild()
                this.$messagesList.appendChild($message)
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
