import dayjs from "dayjs";
import {truncateString} from "../utils/common";
import AbstractComponent from "./abstract-component";

const MAX_DESCRIPTION_LENGTH = 140;

export const createCardTemplate = (film) => {
  const {name, poster, description, rating, date, duration, genres, comments, isInWatchlist, isWatched, isFavorite} = film;

  const year = dayjs(date).format(`YYYY`);
  const cutDescription = truncateString(description, MAX_DESCRIPTION_LENGTH);

  return `<article class="film-card">
          <h3 class="film-card__title">${name}</h3>
            <p class="film-card__rating">${rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${year}</span>
              <span class="film-card__duration">${dayjs().minute(duration).format(`h[h] m[m]`)}</span>
              <span class="film-card__genre">${genres}</span>
            </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${cutDescription}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist${isInWatchlist ? ` film-card__controls-item--active` : ``}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched${isWatched ? ` film-card__controls-item--active` : ``}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite${isFavorite ? ` film-card__controls-item--active` : ``}">Mark as favorite</button>
          </div>
        </article>`;
};

export default class CardView extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);
  }
  getTemplate() {
    return createCardTemplate(this._film);
  }
  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }
  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`img`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._clickHandler);
  }
  removeClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__title`).removeEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`img`).removeEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__comments`).removeEventListener(`click`, this._clickHandler);
  }
  setAddToWatchlistButtonClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._clickHandler);
  }

  setMarkAsWatchedButtonClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._clickHandler);
  }

  setMarkAsFavoriteButtonClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._clickHandler);
  }
}
