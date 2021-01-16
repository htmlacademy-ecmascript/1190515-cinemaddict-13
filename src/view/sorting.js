import AbstractComponent from "./abstract-component";

export const SORT_DATA_TYPE = {
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

export default class Sorting extends AbstractComponent {
  getTemplate() {
    return createSortingTemplate();
  }
}
