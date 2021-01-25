import AbstractComponent from "./abstract-component";

const renderFilters = (filters) => {
  return filters
    .map((filter) => {
      const {link, name, count, checked} = filter;
      return `<a href="${link}" class="main-navigation__item${checked ? ` main-navigation__item--active` : ``}">${name}${count > -1 ? ` <span class="main-navigation__item-count">${count}</span>` : ``}</a>`;
    }).join(`\n`);
};

export const createNavigationTemplate = (filters) => {
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${renderFilters(filters)}
    </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export default class NavigationView extends AbstractComponent {
  constructor(filters, isStatisticCheck) {
    super();
    this._filters = filters;
    this._isStatisticCheck = isStatisticCheck;
  }

  getTemplate() {
    return createNavigationTemplate(this._filters, this._isStatisticCheck);
  }

  setFilterChangeHandler(handler) {
    this.getElement().querySelectorAll(`.main-navigation__item`).forEach((link) => {
      link.addEventListener(`click`, handler);
    });
  }

  setStatisticClickHandler(handler) {
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, handler);
  }
}
