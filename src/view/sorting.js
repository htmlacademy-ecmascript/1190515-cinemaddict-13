import AbstractComponent from "./abstract-component";
import {SortType} from "../const";

const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" id="${SortType.DEFAULT}" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active"> Sort by default </a></li>
      <li><a href="#" id="${SortType.DATE}" data-sort-type="${SortType.DATE}" class="sort__button"> Sort by date </a></li>
      <li><a href="#" id="${SortType.RATING}" data-sort-type="${SortType.RATING}" class="sort__button"> Sort by rating </a></li>
    </ul>`
  );
};

export default class SortView extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;

    // this._resetActiveClass = this._resetActiveClass.bind(this);
    // this._setActiveClass = this._setActiveClass.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  setClickHandler(callback) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      // this._resetActiveClass();
      // this._setActiveClass(evt.target);
      const sortList = evt.currentTarget;
      const sortElement = evt.target;
      const sortElements = sortList.querySelectorAll(`.sort__button`);

      sortElements.forEach((element) => element.classList.remove(`sort__button--active`));
      sortElement.classList.add(`sort__button--active`);

      this._currentSortType = sortType;
      callback(this._currentSortType);
    });
  }

  setDefaultSortType() {
    this._currentSortType = SortType.DEFAULT;
    this._resetActiveClass();
    this._setActiveClass(this._element.querySelector(`a:first-child`));
  }

  _resetActiveClass() {
    this._element
      .querySelectorAll(`.sort__button`)
      .forEach((it) => it.classList.remove(`sort__button--active`));
  }

  _setActiveClass(element) {
    element.classList.add(`sort__button--active`);
  }
}
