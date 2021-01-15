import AbstractComponent from "./abstract-component";

export const createShowMoreTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ShowMoreCardView extends AbstractComponent {
  getTemplate() {
    return createShowMoreTemplate();
  }
}
