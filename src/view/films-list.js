import {createElement} from "../utils";
export const createListTemplate = ({
  className = `films-list`,
  title = ``,
  isTitleHidden,
}) => {
  const titleHiddenClassName = isTitleHidden ? `visually-hidden` : ``;
  return (
    `<section class="${className}">
      <h2 class="films-list__title ${titleHiddenClassName}">${title}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmsList {
  constructor(listOptions) {
    this._listOptions = listOptions;

    this._element = null;
  }

  getTemplate() {
    return createListTemplate(this._listOptions);
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
