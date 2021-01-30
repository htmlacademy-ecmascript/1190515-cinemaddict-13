import AbstractSmartComponent from "./abstract-smart-component";
import dayjs from "dayjs";
import {MINUTES_IN_HOUR} from "../const";

const DescriptionLength = {
  MAX: 140,
  REQUIRE: 139,
  MIN: 0,
};

const getCommentsLength = (comments) => comments ? comments.length : 0;

const getActiveState = (isChecked) => isChecked ? `film-card__controls-item--active` : ``;

const getDescription = (description) => description.length > DescriptionLength.MAX ? `${description.substring(DescriptionLength.MIN, DescriptionLength.REQUIRE)}...` : description;

const createFilmCardTemplate = (film) => {
  const {title, poster, description, comments, rating, releaseDate, duration, genres, isInFavorites, isInWatchlist, isInHistory} = film;
  return `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${dayjs(releaseDate).format(`YYYY`)}</span>
        <span class="film-card__duration">${Math.trunc(duration / MINUTES_IN_HOUR)}h ${duration % MINUTES_IN_HOUR}m</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${getDescription(description)}</p>
      <a class="film-card__comments">${getCommentsLength(comments)} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${getActiveState(isInWatchlist)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${getActiveState(isInHistory)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${getActiveState(isInFavorites)}">Mark as favorite</button>
      </form>
    </article>`;
};

export default class FilmCardView extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    // eslint-disable-next-line no-console
    console.log(`123`, callback);
    this._callback.click = callback;
    this.getElement()
      .querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`)
      .forEach((element) => element.addEventListener(`click`, this._clickHandler));
  }

  removeClickHandler(callback) {
    // eslint-disable-next-line no-console
    console.log(`123`, callback);
    this._callback.click = callback;
    this.getElement()
      .querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`)
      .forEach((element) => element.removeEventListener(`click`, this._clickHandler));
  }

  setAddToWatchlistHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._clickHandler);
  }

  setAlreadyWatchedHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._clickHandler);
  }

  setAddToFavoritesHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._clickHandler);
  }
  setControlsClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `BUTTON`) {
        return;
      }

      this._clickHandler(evt.target.dataset.control);
    });
  }
}
