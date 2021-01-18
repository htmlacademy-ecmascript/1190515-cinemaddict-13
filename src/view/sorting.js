import AbstractComponent from "./abstract-component";

export const SORTING_DATA_TYPE = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

export const createSortingTemplate = () => {
  return `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-type="default">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-type="date">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-type="rating">Sort by rating</a></li>
  </ul>`;
};

export class SortingView extends AbstractComponent {
  constructor() {
    super();
    this._currentSortingType = SORTING_DATA_TYPE.DEFAULT;
  }

  getCurrentSortingType() {
    return this._currentSortingType;
  }
  getTemplate() {
    return createSortingTemplate();
  }
  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }
  setSortingTypeChangeHandler(callback) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortingType = evt.target.dataset.type;

      if (this._currentSortingType === sortingType) {
        return;
      }

      this.getElement().querySelectorAll(`.sort__button`).forEach((sortButton) => {
        sortButton.classList.remove(`sort__button--active`);
      });
      evt.target.classList.add(`sort__button--active`);

      this._currentSortingType = sortingType;

      callback(this._currentSortingType);
    });
  }
}

