import CardView from "../view/card";
import CardDetailsView from "../view/detail-card";
import {POSITION, render, toggleElement, remove, replace} from "../utils/render";
import Keydown from "../const";

const MODE = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class Movie {
  constructor(container, onDataChange) {
    this._bodyElement = document.querySelector(`body`);
    this._footerElement = document.querySelector(`.footer`);
    this._containerComponent = container;
    this._onDataChange = onDataChange;
    this._mode = MODE.DEFAULT;
    this._cardComponent = null;
    this._DetailCardComponent = null;
    this._film = null;
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

    const prevCardComponent = this._cardComponent;
    const prevCardDetailsComponent = this._cardDetailsComponent;

    this._cardComponent = new CardView(film);
    this._cardDetailsComponent = new CardDetailsView(film);

    this._cardComponent.setAddToWatchlistButtonClickHandler(this._setAddToWatchlist);
    this._cardComponent.setMarkAsWatchedButtonClickHandler(this._setMarkAsWatched);
    this._cardComponent.setMarkAsFavoriteButtonClickHandler(this._setMarkAsFavorite);

    if (prevCardComponent === null || prevCardDetailsComponent === null) {
      render(this._containerComponent, this._cardComponent, POSITION.BEFOREEND);
      this._setCardClickHandlers();
      return;
    }

    if (this._mode === MODE.DEFAULT) {
      replace(this._cardComponent, prevCardComponent);
    }

    if (this._mode === MODE.EDIT) {
      replace(this._cardDetailsComponent, prevCardDetailsComponent);
    }

    remove(prevCardComponent);
    remove(prevCardDetailsComponent);
  }

  destroy() {
    remove(this._cardComponent);
    remove(this._cardDetailsComponent);
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
    this._cardComponent.setClickHandler(this._onClickCardFilm);
    this._cardDetailsComponent.setCloseClickHandler(this._onClickCloseButton);
    this._cardDetailsComponent.setCommentElementsChangeHandler();
    this._cardDetailsComponent.setCommentSubmitHandler();
  }

  _closeFilmDetails() {
    toggleElement(this._footerElement, this._cardDetailsComponent, `hide`);
    document.removeEventListener(`keydown`, this._onEscapeKeyPress);
    this._bodyElement.classList.remove(`hide-overflow`);
    this._mode = MODE.DEFAULT;
  }

  _onClickCardFilm() {
    if (this._cardDetailsComponent.film !== this._film) {
      return;
    }
    this._mode = MODE.EDIT;
    toggleElement(this._footerElement, this._cardDetailsComponent, `show`);
    document.addEventListener(`keydown`, this._onEscapeKeyPress);
    this._bodyElement.classList.add(`hide-overflow`);
    this._cardDetailsComponent.setCloseClickHandler(this._onClickCloseButton);
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
