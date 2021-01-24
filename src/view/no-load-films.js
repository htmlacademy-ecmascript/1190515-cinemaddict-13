import AbstractComponent from "./abstract-component";

const NO_LOAD_FILMS_TEXT = `There are no movies in our database`;

export const getNoLoadFilms = () => {
  return `<h2 class="films-list__title">${NO_LOAD_FILMS_TEXT}</h2>`;
};

export default class NoLoadFilms extends AbstractComponent {
  getTemplate() {
    return getNoLoadFilms();
  }
}
