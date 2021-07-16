import { BaseComponent } from '../baseComponent';
import { AdminPanel } from './adminPanel';

export class AuthPopup extends BaseComponent {
  private readonly authPopup: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['overlay']);
    this.rootElement.appendChild(this.element);

    this.authPopup = document.createElement('div');
    this.authPopup.setAttribute('class', 'auth-popup');
    this.element.appendChild(this.authPopup);
    this.init();
  }

  init(): void {
    this.element.addEventListener('click', (e) => {
      if ((e.target as HTMLElement)?.classList.contains('overlay')) {
        this.rootElement.removeChild(this.element);
      }
    });
    this.authPopup.addEventListener('click', (e) => {
      const login = document.getElementById('auth-popup-login');
      const password = document.getElementById('auth-popup-password');
      if ((e.target as HTMLElement)?.classList.contains('auth-popup__cancel-button')) {
        this.rootElement.removeChild(this.element);
      } if ((e.target as HTMLElement)?.classList.contains('auth-popup__submit-button')
        && (login as HTMLInputElement)?.value === 'admin' && (password as HTMLInputElement)?.value === 'admin') {
        this.rootElement.removeChild(this.element);
        document.body.innerHTML = '';
        new AdminPanel(document.body).render();
      }
    });
  }

  render(): void {
    this.authPopup.innerHTML = `
        <div class="auth-popup__auth-popup-field">
          <h2>Login</h2>
          <form class="auth-popup__form">
            <input class="auth-popup__form_input" name="login" id="auth-popup-login" type="text"
              placeholder="Login" value="admin" required>
            <input class="auth-popup__form_input" name="password" id="auth-popup-password" type="password"
              placeholder="Password" value="admin" required>
            <div class="auth-popup__button-wrapper">
              <button class="auth-popup__cancel-button" type="button">Cancel</button>
              <button class="auth-popup__submit-button" type="button">Submit</button>
            </div>
          </form>
        </div>
    `;
  }
}
