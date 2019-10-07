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
        flex-basis: 1;
        margin-right: 10px;
        
    }

    .message #text{
        color: var(--secondary-color);
        padding: 4px 8px;
        align-self: flex-end;
        word-wrap: break-word;
        display: inline-block;
        background-color: #689CD2;
        border-radius: .4em;
        color: #fff;
        max-width: 80%;
    }

    .message #time{
        font-size: 10px;
        padding: 4px 8px;

        color: #999;
        align-self: flex-end;
        
    }



</style>
<div class="message">
    <label id='name'></label>
    <label id='text'></label>
    <label id='time'></label>
    <label id='identifier'></label>
    <img id='avatar'>
</div>
`;

class MessageItem extends HTMLElement {
    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$message = this._shadowRoot.querySelector('message')

        this.$name = this._shadowRoot.getElementById('name')
        this.$text = this._shadowRoot.getElementById('text')
        this.$timestamp = this._shadowRoot.getElementById('time')

    
    }

    static get observedAttributes() {
        return ['name', 'text', 'timestamp', 'avatar'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name){
            case 'text':
                this._text = newValue;
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

    _renderMessage(){
        this.$text.innerHTML = this._text
        let time = new Date()
        this.$timestamp.innerHTML = time.toLocaleString('ru', {
            hour: 'numeric',
            minute: 'numeric',
          });
        this.$identifier = Date.parse(time) + (Math.random() * 1000)
    }

}

customElements.define('message-item', MessageItem);