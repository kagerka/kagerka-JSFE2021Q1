export class ClickCount {
  clickCounter(): ClickCount {
    const cardField = document.querySelector('.cards-field');
    let click = 0;
    let clickWrong = 0;
    let clickTotal = 0;
    let firstClick: HTMLElement | null;
    let secondClick: HTMLElement | null;
    const IF_EVEN = 2;
    const EVEN_TRUE = 0;
    const EVEN_FALSE = 1;
    const ZERO_CLICK = 0;
    cardField?.addEventListener('click', (event) => {
      if (event.target instanceof HTMLElement) {
        click++;
        if (event.target.classList.contains('card__back')
            && click % IF_EVEN === EVEN_FALSE
            && !event.target.classList.contains('clicked')) {
          event.target.classList.add('clicked', 'firstClick');
          firstClick = document.querySelector('.card__back.clicked.firstClick');
          firstClick?.previousElementSibling?.classList.add('clicked', 'firstClick');
          firstClick = document.querySelector('.card__front.clicked.firstClick');
          event.target.classList.remove('clicked', 'firstClick');
        } else if (event.target.classList.contains('card__back')
                   && click % IF_EVEN === EVEN_TRUE
                   && !event.target.classList.contains('clicked')) {
          event.target.classList.add('clicked', 'secondClick');
          secondClick = document.querySelector('.card__back.clicked.secondClick');
          secondClick?.previousElementSibling?.classList.add('clicked', 'secondClick');
          secondClick = document.querySelector('.card__front.clicked.secondClick');
          event.target.classList.remove('clicked', 'secondClick');
          click = ZERO_CLICK;
        }
        const ZERO_TIMEOUT = 0;
        if (click === ZERO_CLICK) {
          if (firstClick?.style.backgroundImage === secondClick?.style.backgroundImage) {
            clickTotal++;
            setTimeout(() => {
              firstClick?.classList.remove('clicked', 'firstClick');
              secondClick?.classList.remove('clicked', 'secondClick');
            }, ZERO_TIMEOUT);
          } else if (firstClick?.style.backgroundImage !== secondClick?.style.backgroundImage) {
            clickWrong++;
            clickTotal++;
            setTimeout(() => {
              firstClick?.classList.remove('clicked', 'firstClick');
              secondClick?.classList.remove('clicked', 'secondClick');
            }, ZERO_TIMEOUT);
          }
        } else {
          firstClick?.classList.remove('clicked', 'firstClick');
          secondClick?.classList.remove('clicked', 'secondClick');
        }
      }
      const clickDiff = clickTotal - clickWrong;
      const clickDiffField = document.getElementById('clickDiffField') as HTMLElement | null;
      if (clickDiffField) { clickDiffField.innerHTML = clickDiff.toString(); }
    });
    return this;
  }
}
