import {createElement} from "../utils";

export const createBoardTemplate = () => {
  return (
    `<section class="films">
  </section>`
  );
};

export default class Board {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBoardTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
