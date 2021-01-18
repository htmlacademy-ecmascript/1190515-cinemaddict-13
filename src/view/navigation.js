import AbstractComponent from "./abstract-component";

const renderFilters = (filters) => {
  return filters
    .map((filter) => {
      const {link, name, count} = filter;
      return `<a href="${link}" class="main-navigation__item">${name}${count ? ` <span class="main-navigation__item-count">${count}</span>` : ``}</a>`;
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
  constructor(filters) {
    super();
    this._filters = filters;
  }
  getTemplate() {
    return createNavigationTemplate(this._filters);
  }
}
