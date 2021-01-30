import AbstractView from "./abstract-view";

export default class NoLoadFilmsView extends AbstractView {
  getTemplate() {
    return `<section class="films-list">
              <h2 class="films-list__title">There are no movies in our database</h2>
            </section>`;
  }
}
