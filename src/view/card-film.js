import dayjs from "dayjs";
import {truncateString, createElement} from "../utils";

const MAX_DESCRIPTION_LENGTH = 140;

export const createFilmTemplate = (film) => {
  const {title, poster, description, rating, date, duration, genre, comments} = film;

  const year = dayjs(date).format(`YYYY`);
  const truncatedDescription = truncateString(description, MAX_DESCRIPTION_LENGTH);

  return `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${year}</span>
              <span class="film-card__duration">${duration}</span>
              <span class="film-card__genre">${genre}</span>
            </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${truncatedDescription}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </div>
        </article>`;
};

export default class Film {
  constructor(filmData) {
    this._film = filmData;

    this._element = null;
  }

  getTemplate() {
    return createFilmTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
