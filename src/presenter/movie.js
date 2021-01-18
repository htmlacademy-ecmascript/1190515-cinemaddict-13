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
    this._container = container;
    this._onDataChange = onDataChange;
    this._mode = MODE.DEFAULT;
    this._footerElement = document.querySelector(`.footer`);
    this._setCardHandlers = this._setCardHandlers.bind(this);
    this._closeFilmDetails = this._closeFilmDetails.bind(this);
    this._onClickCardElement = this._onClickCardElement.bind(this);
    this._onClickCloseButton = this._onClickCloseButton.bind(this);
    this._onEscapeKeyPress = this._onEscapeKeyPress.bind(this);
    this._setAddToWatchlist = this._setAddToWatchlist.bind(this);
    this._setMarkAsWatched = this._setMarkAsWatched.bind(this);
    this._setMarkAsFavorite = this._setMarkAsFavorite.bind(this);
    this._filmView = null;
    this._filmDetailsView = null;
    this._film = null;
  }

  get film() {
    return this._film;
  }

  render(film) {
    this._film = film;

    const oldFilmView = this._filmView; // component name better?
    const oldFilmDetailsView = this._filmDetailsView;

    this._filmView = new FilmView(film);
    this._filmDetailsView = new FilmDetailsView(film);

    this._filmView.setAddToWatchlistButtonClickHandler(this._setAddToWatchlist);
    this._filmView.setMarkAsWatchedButtonClickHandler(this._setMarkAsWatched);
    this._filmView.setMarkAsFavoriteButtonClickHandler(this._setMarkAsFavorite);

    if (oldFilmView && oldFilmDetailsView) {
      replace(oldFilmView, this._filmView);
      replace(oldFilmDetailsView, this._filmDetailsView);
    } else {
      render(this._container, this._filmView, POSITION.BEFOREEND);
    }
    this._setCardHandlers();
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

  _setCardHandlers() {
    this._filmView.setClickHandler(this._onFilmElementClick);
    this._filmDetailsView.setCloseClickHandler(this._onCloseButtonClick);
    this._filmDetailsView.setFormElementsChangeHandler();
    this._filmDetailsView.setFormSubmitHandler();
  }

  _closeFilmDetails() {
    this._filmDetailsView.reset();
    toggleElement(this._footerElement, this._filmDetailsView, `hide`);
    document.removeEventListener(`keydown`, this._onEscapeKeyPress);
    this._mode = MODE.DEFAULT;
  }

  _onClickCardElement() {
    this._mode = MODE.EDIT;
    toggleElement(this._footerElement, this._filmDetailsView, `show`);
    document.addEventListener(`keydown`, this._onEscapeKeyPress);
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
