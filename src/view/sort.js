import AbstractComponent from "./abstract-component";

export const SORT_TYPE = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

const createSortTemplate = () => {
  return `<ul class="sort">
            <li><a href="#" class="sort__button sort__button--active" data-type="default">Sort by default</a></li>
            <li><a href="#" class="sort__button" data-type="date">Sort by date</a></li>
            <li><a href="#" class="sort__button" data-type="rating">Sort by rating</a></li>
          </ul>`;
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SORT_TYPE.DEFAULT;
  }

  getCurrentSortType() {
    return this._currentSortType;
  }

  getTemplate() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler(callback) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.type;

      if (this._currentSortType === sortType) {
        return;
      }

      this.getElement().querySelectorAll(`.sort__button`).forEach((sortButton) => {
        sortButton.classList.remove(`sort__button--active`);
      });
      evt.target.classList.add(`sort__button--active`);

      this._currentSortType = sortType;

      callback(this._currentSortType);
    });
  }

  setDefaultSortType() {
    if (this._currentSortType === SORT_TYPE.DEFAULT) {
      return;
    }

    this.getElement().querySelectorAll(`.sort__button`).forEach((sortButton) => {
      if (sortButton.getAttribute(`data-type`) === SORT_TYPE.DEFAULT) {
        sortButton.classList.add(`sort__button--active`);
      } else {
        sortButton.classList.remove(`sort__button--active`);
      }
    });

    this._currentSortType = SORT_TYPE.DEFAULT;
  }
}

