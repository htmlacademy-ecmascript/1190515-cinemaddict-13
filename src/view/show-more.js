import AbstractComponent from "./abstract-component";

export const createShowMoreTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ShowMoreCardView extends AbstractComponent {
  constructor() {
    super();
    // 4. Теперь обработчик - метод класса, а не стрелочная функция.
    // Поэтому при передаче в addEventListener он теряет контекст (this),
    // а с контекстом - доступ к свойствам и методам.
    // Чтобы такого не происходило, нужно насильно
    // привязать обработчик к контексту с помощью bind
    this._clickHandler = this._clickHandler.bind(this);
  }
  getTemplate() {
    return createShowMoreTemplate();
  }
  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }
  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}
