import AbstractComponent from "./abstract-component";

export default class BoardView extends AbstractComponent {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}
