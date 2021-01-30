import {createElement} from "../utils/render-utils";

const VISUALLY_HIDDEN = `visually-hidden`;

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one.`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate.`);
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

  show() {
    if (this._element) {
      this._element.classList.remove(VISUALLY_HIDDEN);
    }
  }

  hide() {
    if (this._element) {
      this._element.classList.add(VISUALLY_HIDDEN);
    }
  }
}


