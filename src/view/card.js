import AbstractComponent from "./abstract-component";
import {formatFilmDuration} from "../utils/common";

const DEFAULT_LENGTH = 140;

const cutDescription = (text) => {
  if (text.length > DEFAULT_LENGTH) {
    text = `${text.slice(0, DEFAULT_LENGTH - 1)}...`;
  }
  return text;
};

const createFilmCardTemplate = (film) => {
  const {name, rating, year, duration, genres, description, poster, isWatchlist, isWatched, isFavorites, comments} = film;

  return `<article class="film-card">
            <h3 class="film-card__title">${name}</h3>
            <p class="film-card__rating">${rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${year}</span>
              <span class="film-card__duration">${formatFilmDuration(duration)}</span>
              <span class="film-card__genre">${genres}</span>
            </p>
            <img src="${poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${cutDescription(description)}</p>
            <a class="film-card__comments">${comments.length} comments</a>
            <form class="film-card__controls">
              <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist${isWatchlist ? ` film-card__controls-item--active` : ``}">Add to watchlist</button>
              <button class="film-card__controls-item button film-card__controls-item--mark-as-watched${isWatched ? ` film-card__controls-item--active` : ``}">Mark as watched</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite${isFavorites ? ` film-card__controls-item--active` : ``}">Mark as favorite</button>
            </form>
          </article>`;
};

export default class Card extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setOpenCardClickHandler(callback) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, callback);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, callback);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, callback);
  }

  setAddToWatchlistButtonClickHandler(callback) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      callback();
    });
  }

  setMarkAsWatchedButtonClickHandler(callback) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      callback();
    });
  }

  setMarkAsFavoriteButtonClickHandler(callback) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      callback();
    });
  }
}
