import AbstractComponent from "./abstract-component";

export default class FilmsView extends AbstractComponent {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}
