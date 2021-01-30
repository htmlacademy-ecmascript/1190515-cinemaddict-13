import AbstractView from "./abstract-view";

export default class LoadFilmsView extends AbstractView {
  getTemplate() {
    return `<section class="films-list">
              <h2 class="films-list__title">Loading...</h2>
            </section>`;
  }
}
