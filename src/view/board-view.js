import AbstractView from "./abstract-view";

export default class BoardView extends AbstractView {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}
