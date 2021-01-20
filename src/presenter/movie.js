import FilmView from "../view/card";
import FilmDetailsView from "../view/detail-card";
import {POSITION, render, toggleElement, replace} from "../utils/render";
import Keydown from "../const";

const MODE = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class Movie {
  constructor(container, onDataChange) {
    this._containerComponent = container;
    this._onDataChange = onDataChange;
    this._mode = MODE.DEFAULT;
    this._filmComponent = null;
    this._filmDetailsComponent = null;
    this._film = null;
    this._footerElement = document.querySelector(`.footer`);
    this._setCardClickHandlers = this._setCardClickHandlers.bind(this);
    this._closeFilmDetails = this._closeFilmDetails.bind(this);
    this._onClickCardFilm = this._onClickCardFilm.bind(this);
    this._onClickCloseButton = this._onClickCloseButton.bind(this);
    this._onEscapeKeyPress = this._onEscapeKeyPress.bind(this);
    this._setAddToWatchlist = this._setAddToWatchlist.bind(this);
    this._setMarkAsWatched = this._setMarkAsWatched.bind(this);
    this._setMarkAsFavorite = this._setMarkAsFavorite.bind(this);
  }

  get film() {
    return this._film;
  }

  render(film) {
    this._film = film;

    const oldFilmView = this._filmComponent;
    const oldFilmDetailsView = this._filmDetailsComponent;

    this._filmComponent = new FilmView(film);
    this._filmDetailsComponent = new FilmDetailsView(film);

    this._filmComponent.setAddToWatchlistButtonClickHandler(this._setAddToWatchlist);
    this._filmComponent.setMarkAsWatchedButtonClickHandler(this._setMarkAsWatched);
    this._filmComponent.setMarkAsFavoriteButtonClickHandler(this._setMarkAsFavorite);

    if (oldFilmView && oldFilmDetailsView) {
      replace(oldFilmView, this._filmComponent);
      replace(oldFilmDetailsView, this._filmDetailsComponent);
    } else {
      render(this._containerComponent, this._filmComponent, POSITION.BEFOREEND);
    }
    this._setCardClickHandlers();
  }

  setToDefaultView() {
    if (this._mode !== MODE.DEFAULT) {
      this._closeFilmDetails();
    }
  }

  _setAddToWatchlist() {
    this._onDataChange(this._film, Object.assign({}, this._film, {
      isWatchlist: !this._film.isWatchlist
    }));
  }

  _setMarkAsWatched() {
    this._onDataChange(this._film, Object.assign({}, this._film, {
      isWatched: !this._film.isWatched
    }));
  }

  _setMarkAsFavorite() {
    this._onDataChange(this._film, Object.assign({}, this._film, {
      isFavorites: !this._film.isFavorites
    }));
  }

  _setCardClickHandlers() {
    this._filmComponent.setClickHandler(this._onClickCardFilm);
    this._filmDetailsComponent.setCloseClickHandler(this._onClickCloseButton);
    this._filmDetailsComponent.setFormElementsChangeHandler();
    this._filmDetailsComponent.setFormSubmitHandler();
  }

  _closeFilmDetails() {
    // if (this._filmDetailsComponent.getFilm() !== null) {
    //   remove(this._filmDetailsComponent);
    // }
    this._filmDetailsComponent.reset();
    toggleElement(this._footerElement, this._filmDetailsComponent, `hide`);
    document.removeEventListener(`keydown`, this._onEscapeKeyPress);
    this._mode = MODE.DEFAULT;
  }

  _onClickCardFilm() {
    this._mode = MODE.EDIT;
    toggleElement(this._footerElement, this._filmDetailsComponent, `show`);
    document.addEventListener(`keydown`, this._onEscapeKeyPress);
    this._filmDetailsComponent.setCloseClickHandler(this._onClickCloseButton);
  }

  _onClickCloseButton() {
    this._closeFilmDetails();
  }

  _onEscapeKeyPress(evt) {
    if (evt.key === Keydown.ESC) {
      this._closeFilmDetails();
    }
  }
}
