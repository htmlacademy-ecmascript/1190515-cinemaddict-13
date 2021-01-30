import AbstractView from "./abstract-view";

export default class FilmListContainerView extends AbstractView {

  getTemplate() {
    return `<div class="films-list__container"></div>`;
  }
}
