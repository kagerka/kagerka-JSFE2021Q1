import { BaseComponent } from './baseComponent';
import { actionSetA } from './categories/action-set-a/actionSetA';
import { actionSetB } from './categories/action-set-b/actionSetB';
import { actionSetC } from './categories/action-set-c/actionSetC';
import { adjective } from './categories/adjective/adjective';
import { animalSetA } from './categories/animal-set-a/animalSetA';
import { animalSetB } from './categories/animal-set-b/animalSetB';
import { CardsItem } from './categories/cards-item';
import { categories } from './categories/categories';
import { CategoryItem } from './categories/category-item';
import { fruits } from './categories/fruits/fruits';
import { vegetables } from './categories/vegetables/vegetables';
import {
  EIGHT, FIVE, FOUR, ONE, ONE_SEC, RELOAD_PAGE_TIME, SEVEN, SIX, THREE, TWO, ZERO, ZERO_DOT_FIVE,
} from './constants';
import {
  store,
  categoryMain,
  categoryActionSetA,
  categoryActionSetB,
  categoryActionSetC,
  categoryAdjective,
  categoryAnimalSetA,
  categoryAnimalSetB,
  categoryFruits,
  categoryVegetables,
  correct,
  incorrect,
  error,
  noError,
  start,
  noStart,
  winPage,
  noWinPage,
} from './redux';
import { CategoryCard } from './types';

export class App extends BaseComponent {
  private readonly cards: HTMLElement;

  private readonly playButton: HTMLElement;

  private readonly starField: HTMLElement;

  public static audioArr: string[] = [];

  public static wordArr: string[] = [];

  public static starArr: string[] = [];

  constructor(private readonly rootElement: HTMLElement) {
    super('main', ['app']);
    this.rootElement.appendChild(this.element);

    this.starField = document.createElement('div');
    this.starField.setAttribute('class', 'star-field');

    this.cards = document.createElement('div');
    this.cards.setAttribute('class', 'cards');
    this.element.appendChild(this.cards);

    this.playButton = document.createElement('button');
    this.playButton.innerText = 'Start game';
    this.playButton.setAttribute('class', 'playButton');

    this.init();
    this.mode();
    this.game();
  }

  startGame = (): void => {
    if (store.getState().gameMode.value === 'play' && !this.playButton.classList.contains('active')) {
      store.dispatch(correct());
      store.dispatch(noStart());
      store.dispatch(noError());
      App.starArr = [];
      App.wordArr = [];
      this.categoryNameSwitch();
      App.wordArr.sort(() => Math.random() - ZERO_DOT_FIVE);
      store.dispatch(start());
      this.gameProcess();
    } else if (store.getState().gameMode.value === 'play'
      && this.playButton.classList.contains('active')
      && App.wordArr.length !== ZERO) {
      new Audio(`./audio/${App.wordArr[0]}.mp3`).play();
    }
  };

  game(): void {
    this.playButton.addEventListener('click', this.startGame);

    document.addEventListener('click', (e) => {
      if ((e.target as HTMLElement)?.classList.contains('nav-link')
        || store.getState().restoreGame.value === 'noStart') {
        this.playButton.classList.remove('active');
        App.wordArr = [];
        App.starArr = [];
        this.starField.innerHTML = '';
        store.dispatch(noStart());
      }
    });
  }

  categoryNameSwitch(): void {
    switch (store.getState().categoryName.value) {
      case 'actionSetA':
        actionSetA.forEach((item) => { App.wordArr.push(item.word); });
        break;
      case 'actionSetB':
        actionSetB.forEach((item) => { App.wordArr.push(item.word); });
        break;
      case 'actionSetC':
        actionSetC.forEach((item) => { App.wordArr.push(item.word); });
        break;
      case 'adjective':
        adjective.forEach((item) => { App.wordArr.push(item.word); });
        break;
      case 'animalSetA':
        animalSetA.forEach((item) => { App.wordArr.push(item.word); });
        break;
      case 'animalSetB':
        animalSetB.forEach((item) => { App.wordArr.push(item.word); });
        break;
      case 'fruits':
        fruits.forEach((item) => { App.wordArr.push(item.word); });
        break;
      case 'vegetables':
        vegetables.forEach((item) => { App.wordArr.push(item.word); });
        break;
      default:
        break;
    }
    this.playButton.classList.add('active');
  }

  gameProcessFunc(): void {
    if (store.getState().playGame.value === 'correct' && store.getState().gameMode.value === 'play') {
      try {
        setTimeout(() => {
          const audio = new Audio(`./audio/${App.wordArr[0]}.mp3`);
          audio.play();
          // console.log(`./audio/${App.wordArr[0]}.mp3`);
        }, ONE_SEC);
      } catch { // console.log('no such file');
      }
    }

    this.cards.onclick = (e): void => {
      if ((e.target as HTMLElement)?.classList.contains('cards__card_picture')) {
        if (store.getState().restoreGame.value === 'start' && store.getState().gameMode.value === 'play') {
          if ((e.target as HTMLElement)?.dataset.word === App.wordArr[0]) {
            App.wordArr.shift();
            if (!(e.target as HTMLElement).classList.contains('checked')) {
              new Audio('./audio/correct.mp3').play();
              App.starArr.push('<img src="./icon/star-win.svg" class="star star-correct" />');
            }
            store.dispatch(correct());
            (e.target as HTMLElement).classList.add('checked');
            // console.log(App.wordArr);
            this.starField.innerHTML = App.starArr.join('');
          } else {
            if (!(e.target as HTMLElement).classList.contains('checked')) {
              new Audio('./audio/error.mp3').play();
              App.starArr.push('<img src="./icon/star.svg" class="star star-error" />');
            }
            store.dispatch(error());
            store.dispatch(incorrect());
            this.starField.innerHTML = App.starArr.join('');
          }
        }
      }
    };
  }

  gameProcess(): void {
    if (App.wordArr.length === EIGHT) {
      this.gameProcessFunc();
    }
    this.chooseCard();
    this.cards.addEventListener('click', this.chooseCard);
  }

  chooseCard = (): void => {
    switch (App.wordArr.length) {
      case SEVEN: this.gameProcessFunc();
        break;
      case SIX: this.gameProcessFunc();
        break;
      case FIVE: this.gameProcessFunc();
        break;
      case FOUR: this.gameProcessFunc();
        break;
      case THREE: this.gameProcessFunc();
        break;
      case TWO: this.gameProcessFunc();
        break;
      case ONE: this.gameProcessFunc();
        break;
      case ZERO:
        if (store.getState().failure.value !== 'error' && store.getState().restoreGame.value === 'start') {
          new Audio('./audio/success.mp3').play();
          this.finish();
        } else if (store.getState().failure.value === 'error' && store.getState().restoreGame.value === 'start') {
          new Audio('./audio/failure.mp3').play();
          this.finish();
        }
        this.cards.removeEventListener('click', this.chooseCard);
        break;
      default: break;
    }
  };

  finish(): void {
    const updatePage = (): void => {
      setTimeout(() => {
        try {
          this.starField.innerHTML = '';
          this.element.removeChild(this.starField);
          this.playButton.classList.remove('active');
          this.element.removeChild(this.playButton);
        } catch {
          // console.log('can\'t load file');
        }
      }, ZERO);
      setTimeout(() => {
        this.cards.innerHTML = '';
        this.render();
      }, RELOAD_PAGE_TIME);
    };
    if (store.getState().failure.value !== 'error' && store.getState().restoreGame.value === 'start') {
      store.dispatch(noStart());
      store.dispatch(winPage());
      this.cards.innerHTML = '<img src="./img/success.jpg" class="" />';
      updatePage();
    } else if (store.getState().failure.value === 'error' && store.getState().restoreGame.value === 'start') {
      store.dispatch(noStart());
      store.dispatch(winPage());
      const errors = App.starArr.filter((item) => item === '<img src="./icon/star.svg" class="star star-error" />');
      this.cards.classList.remove('cards');
      this.cards.innerHTML = `<img src="./img/failure.jpg" class="" />
      <p class="error-msg">You have ${errors.length} errors</p>`;
      updatePage();
    }
  }

  mode(): void {
    document.addEventListener('click', () => {
      if (store.getState().categoryName.value !== 'main' && store.getState().gameMode.value === 'play'
      && store.getState().isWinPage.value !== 'winPage') {
        this.element.appendChild(this.playButton);
        this.cards.before(this.starField);
      } else if (store.getState().gameMode.value === 'train' && store.getState().categoryName.value === 'main') {
        try {
          this.element.removeChild(this.playButton);
          this.element.removeChild(this.starField);
        } catch (e) {
          // const err = 'error';
        }
      } else if (store.getState().gameMode.value === 'play' && store.getState().categoryName.value === 'main') {
        try {
          this.element.removeChild(this.playButton);
          this.element.removeChild(this.starField);
        } catch (e) {
          // const err = 'error';
        }
      } else if (store.getState().restoreGame.value === 'noStart' && store.getState().isWinPage.value === 'winPage') {
        try {
          this.element.removeChild(this.playButton);
          this.element.removeChild(this.starField);
        } catch (e) {
          // const err = 'error';
        }
      } else {
        try {
          this.element.removeChild(this.playButton);
          this.element.removeChild(this.starField);
        } catch (e) {
          // const err = 'error';
        }
      }
    });
  }

  init(): void {
    const categoryCard = (categoryName: CategoryCard[]): void => {
      this.cards.innerHTML = '';
      categoryName.forEach((item: CategoryCard) => new CardsItem(this.cards).render(
        item.word, item.picture, item.audio, item.translate,
      ));
      this.cards.setAttribute('class', 'cards');
      this.mode();
    };

    document.addEventListener('click', (e) => {
      if ((e.target as HTMLElement)?.classList.contains('actionSetA')) {
        store.dispatch(categoryActionSetA());
        categoryCard(actionSetA);
      } else if ((e.target as HTMLElement)?.classList.contains('actionSetB')) {
        store.dispatch(categoryActionSetB());
        categoryCard(actionSetB);
      } else if ((e.target as HTMLElement)?.classList.contains('actionSetC')) {
        store.dispatch(categoryActionSetC());
        categoryCard(actionSetC);
      } else if ((e.target as HTMLElement)?.classList.contains('adjective')) {
        store.dispatch(categoryAdjective());
        categoryCard(adjective);
      } else if ((e.target as HTMLElement)?.classList.contains('animalSetA')) {
        store.dispatch(categoryAnimalSetA());
        categoryCard(animalSetA);
      } else if ((e.target as HTMLElement)?.classList.contains('animalSetB')) {
        store.dispatch(categoryAnimalSetB());
        categoryCard(animalSetB);
      } else if ((e.target as HTMLElement)?.classList.contains('fruits')) {
        store.dispatch(categoryFruits());
        categoryCard(fruits);
      } else if ((e.target as HTMLElement)?.classList.contains('vegetables')) {
        store.dispatch(categoryVegetables());
        categoryCard(vegetables);
      }
    });
    this.mainCategory();
  }

  mainCategory(): void {
    document.addEventListener('click', (e) => {
      if ((e.target as HTMLElement)?.classList.contains('main-page')) {
        this.cards.innerHTML = '';
        categories.forEach((item) => new CategoryItem(this.cards).render(
          item.categoryName, item.categoryClass,
        ));
        store.dispatch(categoryMain());
        this.cards.setAttribute('class', 'cards categories');
        this.mode();
      }
    });
  }

  render(): void {
    store.dispatch(noStart());
    store.dispatch(noWinPage());
    categories.forEach((item) => new CategoryItem(this.cards).render(item.categoryName, item.categoryClass));
    this.cards.setAttribute('class', 'cards categories');
    store.dispatch(categoryMain());
    this.mode();
  }
}
