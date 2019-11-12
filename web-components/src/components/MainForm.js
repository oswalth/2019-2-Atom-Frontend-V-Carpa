const template = document.createElement('template');
template.innerHTML = `
<style>
  .container{
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }
  .container *{
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
    z-index: 0;
  }

  message-form{
    z-index: 1;
    right: -100%;
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }

  message-form.appear{
    animation-name: chatAppearence;
  }

  message-form.disappear{
    animation-name: chatDisappear;
  }
  
  @keyframes chatDisappear{
    from{
      right: 0;
    }
    to{
      right: -100%;
    }
  }

    
  @keyframes chatAppearence{
    from{
      right: -100%;
    }
    to{
      right: 0;
    }
  }

  ::-webkit-scrollbar {
    width: 0px;
  }

</style>
<div class="container">
  <dialogue-form></dialogue-form>
  <message-form></message-form>
</div>
`;

class MainForm extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$container = this.shadowRoot.querySelector('.container');
    this.$dialogForm = this.shadowRoot.querySelector('dialogue-form');
    this.$messageForm = this.shadowRoot.querySelector('message-form');

    // this.$dialogList.dialogLoader();
    this.openDialogueEvent();
    this.$dialogForm.$button.addEventListener('newDialogue', () => this.openDialogueEvent());
  }

  openDialogueEvent() {
    if (this.dialogueIds === undefined) {
      this.dialogueIds = [];
    }
    Object.entries(localStorage).forEach((dlg) => {
      const key = dlg[0];
      if ((key.includes('dialogue')) && !(key in this.dialogueIds)) {
        const [currentId, currentName] = [...key.split('#')[1].split('-')];
        const clickableDialogue = this.$dialogForm.$dialoguesList.querySelector(`dialogue-item[dialogueid="${currentId}"]`);
        clickableDialogue.addEventListener('click', () => this.openDialogue(currentId, currentName));
        this.dialogueIds.push(currentId);
      }
    });
  }

  openDialogue(dialogueId, dialogueName) {
    this.$messageForm.setAttribute('dialogueid', dialogueId);
    this.$messageForm.setAttribute('dialoguename', dialogueName);
    this.$messageForm.classList.remove('disappear');
    this.$messageForm.classList.add('appear');
    this.$messageForm.render();
    this.$messageForm.$header.addEventListener('backButtonClick', () => this.closeDialogue());
    this.$messageForm.$input.addEventListener('onSubmit', () => this.refreshDialogue(dialogueId));
  }

  closeDialogue() {
    this.$messageForm.clrscr();
    this.$messageForm.classList.remove('appear');
    this.$messageForm.classList.add('disappear');
  }

  refreshDialogue(dialogueId) {
    const dialogue = this.$dialogForm.$dialoguesList.querySelector(`dialogue-item[dialogueid="${dialogueId}"]`);
    // eslint-disable-next-line no-underscore-dangle
    dialogue._renderMessage();
  }
}

customElements.define('main-form', MainForm);
