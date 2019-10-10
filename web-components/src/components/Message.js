const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        font-family: sans-serif;
        padding: 8px;
    }


    
    .message{
        display: flex;
        flex-flow: column nowrap;
        margin-right: 10px;
        float: right;
        border-radius: 15px;
        padding: 10px;
        max-width: 80%;
        word-break: break-word;
    }

   .message .text{
        padding: 4px 8px;
        background-color: #689CD2;
        border-radius: .4em;
        color: #fff;
   }


    .message .time{
        font-size: 10px;
        padding: 4px 8px;
        color: #999;
        align-self: flex-end;
    }

    .message .name{
        display: none;
    }

    

</style>
<div class="message">
    <div class='name'></div>
    <div class='text'></div>
    <div class='time'></div>
</div>
`;

class MessageItem extends HTMLElement {
    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$message = this._shadowRoot.querySelector('.message')

        this.$name = this._shadowRoot.querySelector('.name')
        this.$text = this._shadowRoot.querySelector('.text')
        this.$timestamp = this._shadowRoot.querySelector('.time')
        //this.$identifier = this._shadowRoot.getElementById('identifier')

    
    }

    static get observedAttributes() {
        return ['name', 'text', 'timestamp'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name){
            case 'text':
                this._text = newValue;
                break;
            case 'name':
                this._name = newValue;
                break;
            case 'timestamp':
                this._timestamp = newValue;
                break;
            
        }
        this._renderMessage();
    }

    connectedCallback() {
        if(!this.hasAttribute('text')) {
            this.setAttribute('text', 'placeholder');
        }

        this._renderMessage();
    }

    toObject(){
        this.messageObject = {
            'name': this.$name.innerHTML,
            'text': this.$text.innerHTML,
            'timestamp': this.$timestamp.innerHTML,
        }
        return [this.messageObject, this.identifier];
    }

    _renderMessage(){
        this.$name.innerHTML = this._name
        this.$text.innerHTML = this._text
        let time = new Date()
        if (this._timestamp){
            this.$timestamp = this._timestamp
        } else {
            this.$timestamp.innerHTML = time.toLocaleString('ru', {
                hour: 'numeric',
                minute: 'numeric',
              });
        }
       
        this.identifier = Date.parse(time) + (Math.random() * 1000)
    }

}

customElements.define('message-item', MessageItem);