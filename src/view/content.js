import {createElement} from "../utils";

export const createContentTemplate = () => {
  return `<section class="films">
            <section class="films-list">
              <div class="films-list__container"></div>
            </section>
          </section>`;
};

export default class ContentView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createContentTemplate();
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
