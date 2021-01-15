import dayjs from "dayjs";
import {truncateString} from "../utils/common";
import AbstractComponent from "./abstract-component";

const MAX_DESCRIPTION_LENGTH = 140;

export const createFilmTemplate = (film) => {
  const {name, poster, description, rating, date, duration, genres, comments} = film;

  const year = dayjs(date).format(`YYYY`);
  const truncatedDescription = truncateString(description, MAX_DESCRIPTION_LENGTH);

  return `<article class="film-card">
          <h3 class="film-card__title">${name}</h3>
            <p class="film-card__rating">${rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${year}</span>
              <span class="film-card__duration">${duration}</span>
              <span class="film-card__genre">${genres}</span>
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

export default class FilmView extends AbstractComponent {
  constructor(filmData) {
    super();
    this._film = filmData;
  }

  getTemplate() {
    return createFilmTemplate(this._film);
  }
  _clickHandler(evt) {
    evt.preventDefault();
    // 3. А внутри абстрактного обработчика вызовем колбэк
    this._callback.click();
  }
  setClickHandler(callback) {
    // Мы могли бы сразу передать callback в addEventListener,
    // но тогда бы для удаления обработчика в будущем,
    // нам нужно было бы производить это снаружи, где-то там,
    // где мы вызывали setClickHandler, что не всегда удобно

    // 1. Поэтому колбэк мы запишем во внутреннее свойство
    this._callback.click = callback;
    // 2. В addEventListener передадим абстрактный обработчик
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}
