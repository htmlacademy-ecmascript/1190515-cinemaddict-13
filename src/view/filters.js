import AbstractComponent from "./abstract-component";
import {FilterType} from "../const";

const createFiltersTemplate = (filters) => {
  return filters.map(({name, count, isChecked}) => {
    return `<a href="${name}" data-filter="${name}"
    class="main-navigation__item ${isChecked ? `main-navigation__item--active` : ``}">
    ${name} ${name === FilterType.ALL ? `` : `<span class="main-navigation__item-count">${count}</span>`}
    </a>`;
  }).join(`\n`);
};

const createFilterTemplate = (filters) => {
  const filtersTemplate = createFiltersTemplate(filters);

  return (
    `<div class="main-navigation__items">
      ${filtersTemplate}
    </div>`
  );
};

export default class FiltersView extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(callback) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `A` || evt.target.parentElement.tagName === `A`) {
        evt.preventDefault();

        const filterName = evt.target.tagName === `A` ? evt.target.dataset.filter : evt.target.parentElement.dataset.filter;

        callback(filterName);
      }
    });
  }
}
