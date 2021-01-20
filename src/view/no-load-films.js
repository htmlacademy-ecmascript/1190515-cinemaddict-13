import AbstractComponent from "./abstract-component";

const NO_LOADFILMS_TEXT = `There are no movies in our database`;

export const getNoFilmsText = () => {
  return `<h2 class="films-list__title">${NO_LOADFILMS_TEXT}</h2>`;
};

export default class NoLoadFilms extends AbstractComponent {
  getTemplate() {
    return getNoFilmsText();
  }
}
