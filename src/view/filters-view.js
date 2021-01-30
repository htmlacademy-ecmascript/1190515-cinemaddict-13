import AbstractView from "./abstract-view";
import {FilterType, NavigationItem} from "../const";
import {NAVIGATION_ITEM_ACTIVE} from "./navigation-view";

const createFiltersTemplate = (filters) => {
  return filters.map(({address, name, count, isChecked}) => {
    return `<a href="#${address}"
         data-id="${NavigationItem.FILMS}"
         data-filter-type="${name}"
         class="main-navigation__item${isChecked ? ` ${NAVIGATION_ITEM_ACTIVE}` : ``}">
         ${name}
         ${name === FilterType.ALL ? `` : `<span  class="main-navigation__item-count">${count}</span>`}
      </a>`;
  }).join(`\n`);
};

const createFilterTemplate = (filters) => {
  return `<div class="main-navigation__items">
      ${createFiltersTemplate(filters)}
    </div>`;
};

export default class FilterView extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(callback) {

    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }
      document.querySelector(`.main-navigation__additional`).classList.remove(NAVIGATION_ITEM_ACTIVE);

      callback(evt.target.dataset.filterType);
    });
  }
}
