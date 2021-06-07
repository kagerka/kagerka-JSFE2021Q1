import { BaseComponent } from '../../../base-components';

export class RegisterAvatar extends BaseComponent {
  private readonly label: HTMLElement;

  private readonly input: HTMLElement;

  private readonly avatarPic: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['register-form__avatar']);
    this.rootElement.appendChild(this.element);
    this.label = document.createElement('label');
    this.input = document.createElement('input');
    this.input.setAttribute('type', 'file');
    this.input.setAttribute('name', 'avatar');
    this.input.style.display = 'none';
    this.avatarPic = document.createElement('div');
    this.avatarPic.setAttribute('class', 'register-form__avatar_pic');
  }

  render(): void {
    this.element.appendChild(this.label);
    this.label.appendChild(this.input);
    this.label.appendChild(this.avatarPic);

    this.input.onchange = (event: Event): void => {
      const target = event.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (readerEvent): void => {
        const content = readerEvent.target?.result;
        const avatarField = document.querySelector('.register-form__avatar_pic') as HTMLElement;
        avatarField.style.background = `url(${content})`;
        avatarField.style.backgroundSize = 'cover';
      };
    };
  }
}
