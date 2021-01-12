export const createNavigationTemplate = (filters, isActive) => {
  const activeClassname = isActive ? `main-navigation__item--active` : ``;
  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
    ${filters.map(({signature, link, count}) => (`<a href="${link}" class="main-navigation__item ${activeClassname}">${signature} ${renderNavCount(count)}</a>`)).join(``)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

const renderNavCount = (value) => {
  return value ? `<span class="main-navigation__item-count">${value}</span>` : ``;
};
