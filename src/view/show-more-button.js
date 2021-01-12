import {createElement} from "../utils";

export const showMoreButtonTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ShowMore {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return showMoreButtonTemplate();
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
