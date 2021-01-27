import AbstractComponent from "./abstract-component";

export default class LoadFilmsView extends AbstractComponent {
  getTemplate() {
    return `<h2 class="films-list__title">Loading...</h2>`;
  }
}
