import { BaseComponent } from '../../../base-components';

export class Avatar extends BaseComponent {
  avatar(): HTMLElement {
    const input: HTMLInputElement | null = document.querySelector('input[name="avatar"]');

    if (input) {
      input.onchange = (event: Event): void => {
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
    return this.element;
  }
}
