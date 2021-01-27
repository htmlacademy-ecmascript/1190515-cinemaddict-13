import AbstractSmartComponent from "./abstract-smart-component";
import dayjs from "dayjs";
import {MINUTES_IN_HOUR} from "../const";

const Description = {
  MAX: 140,
  REQUIRE: 139,
  MIN: 0,
};

const getComments = (comments) => comments ? comments.length : 0;

const getActiveState = (isCheckedParameter) => isCheckedParameter ? `film-card__controls-item--active` : ``;

const getDescription = (description) => description.length > Description.MAX ? `${description.substring(Description.MIN, Description.REQUIRE)}...` : description;

const createFilmCardTemplate = (film) => {
  const {title, poster, description, comments, rating, releaseDate, duration, genres, isInFavorites, isInWatchlist, isInHistory} = film;
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${dayjs(releaseDate).format(`YYYY`)}</span>
        <span class="film-card__duration">${Math.trunc(duration / MINUTES_IN_HOUR)}h ${duration % MINUTES_IN_HOUR}m</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${getDescription(description)}</p>
      <a class="film-card__comments">${getComments(comments)} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${getActiveState(isInWatchlist)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${getActiveState(isInHistory)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${getActiveState(isInFavorites)}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCardView extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setClickHandler(callback) {
    this.getElement()
      .querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`)
      .forEach((element) => element.addEventListener(`click`, callback));
  }

  setAddToWatchlistHandler(callback) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, callback);
  }

  setAlreadyWatchedHandler(callback) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, callback);
  }

  setAddToFavoritesHandler(callback) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, callback);
  }
}
