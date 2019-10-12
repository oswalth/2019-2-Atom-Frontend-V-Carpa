/* eslint-disable no-underscore-dangle */
const template = document.createElement('template')
template.innerHTML = `
<style>
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    :host {
        display: flex;
        flex-direction: row;
        font-family: sans-serif;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .backButton{
        height: 30px;
        width: 30px;
        margin: 0px 15px;
        background: url(https://image.flaticon.com/icons/svg/156/156887.svg)
    }

    .chatInfo{
        flex: auto;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
    }
    
    .chatInfo .avatar{
        height: 30px;
        width: 30px;
        margin: 5px 15px;   
        border-radius: 50%;      
        background: url(https://assets.dryicons.com/uploads/icon/svg/5608/9446101f-27b4-4f8f-9761-0397d7ea932e.svg);
    }

    .senderInfo {
        display: flex;
        flex-flow: column wrap;
        height: 100%;
        justify-content: center;
        align-conten: center;
        align-items: center;
        
    }

    .searchButton{
        height: 20px;
        width: 20px;
        margin: 5px 15px;
        background: url(https://image.flaticon.com/icons/svg/149/149309.svg)
    }
    
    .settingsButton{
        height: 20px;
        width: 20px;
        margin: 5px 15px;
        background: url(https://image.flaticon.com/icons/svg/149/149404.svg)
    }

    



</style>
<div class='backButton'></div>
<div class='chatInfo'>
    <div class='avatar'></div>
    <div class='senderInfo'> 
        <div class='name'>Vladimir C.</div>
        <div class='lastTime'>last seen at 21:00</div>
    </div>
</div>
<div class='searchButton'></div>

<div class='settingsButton'>
</div>
`


class ChatHeader extends HTMLElement {
    constructor () {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(template.content.cloneNode(true))

        
        this.$messageList = this._shadowRoot.querySelector('div')
        
    }




}

customElements.define('chat-header', ChatHeader)