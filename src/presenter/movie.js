import {nanoid} from "nanoid";
import dayjs from "dayjs";
import CardView from "../view/card";
import CardDetailsView from "../view/detail-card";
import {POSITION, render, toggleElement, replace, remove} from "../utils/render";
import Keydown from "../const";


const MODE = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

const FormFilterTypes = {
  WATCHLIST: `watchlist`,
  WATCHED: `watched`,
  FAVORITE: `favorite`
};

export const renderFilms = (container, films, onDataChange, commentsModel) => {
  return films.map((film) => {
    const filmPresenter = new MoviePresenter(container, onDataChange, commentsModel);
    filmPresenter.render(film);
  });
};

export default class MoviePresenter {
  constructor(container, changeMode, onDataChange, commentsModel) {
    this._bodyElement = document.querySelector(`body`);
    this._footerElement = document.querySelector(`.footer`);
    this._container = container;
    this._changeMode = changeMode;
    this._onDataChange = onDataChange;
    this._filmCommentsModel = commentsModel;
    this._mode = MODE.DEFAULT;
    this._card = null;
    this._cardDetails = null;
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

    const prevCard = this._card;
    const prevCardDetails = this._cardDetails;

    this._card = new CardView(film);
    this._cardDetails = new CardDetailsView(film, this._filmCommentsModel);

    this._card.setAddToWatchlistButtonClickHandler(this._setAddToWatchlist);
    this._card.setMarkAsWatchedButtonClickHandler(this._setMarkAsWatched);
    this._card.setMarkAsFavoriteButtonClickHandler(this._setMarkAsFavorite);

    if (prevCard === null || prevCardDetails === null) {
      render(this._container, this._card, POSITION.BEFOREEND);
      this._setCardClickHandlers();
      return;
    }
    if (this._mode === MODE.DEFAULT) {
      replace(this._card, prevCard);
    }
    if (this._mode === MODE.EDIT) {
      replace(this._cardDetails, prevCardDetails);
    }
    remove(prevCard);
    remove(prevCardDetails);
  }

  destroy() {
    remove(this._card);
    remove(this._cardDetails);
  }

  resetView() {
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
    this._card.setClickHandler(this._onClickCardFilm);
    this._cardDetails.setCloseClickHandler(this._onClickCloseButton);
    this._cardDetails.setCommentElementsChangeHandler();
    this._cardDetails.setFormFilterInputChangeHandler(this._onChangeFormFilterInput);
    this._cardDetails.setDeleteCommentButtonClickHandler(this._onDeleteButtonClick);
  }

  _onChangeFormFilterInput(evt) {
    switch (evt.target.name) {
      case FormFilterTypes.WATCHLIST:
        this._setAddToWatchlist();
        break;
      case FormFilterTypes.WATCHED:
        this._setMarkAsWatched();
        break;
      case FormFilterTypes.FAVORITE:
        this._setMarkAsFavorite();
        break;
    }
  }

  _onSubmitForm() {
    const filmDetails = this._filmDetails;
    const commentText = filmDetails.getElement().querySelector(`.film-details__comment-input`).value;
    const emoji = filmDetails.getElement().querySelector(`[name="comment-emoji"]:checked`);

    const commentsIDs = this._film.comments.slice();

    if (this._filmCommentsModel.getCommentsForDelete().length > 0) {
      this._filmCommentsModel.getCommentsForDelete().forEach((commentId) => {
        const commentIndex = commentsIDs.indexOf(commentId);
        if (commentIndex > -1) {
          commentsIDs.splice(commentIndex, 1);
        }
      });
      this._filmCommentsModel.deleteComments();
    }

    if (commentText && emoji) {
      const id = nanoid();
      const newComment = {
        id,
        comment: commentText,
        emotion: emoji.value,
        author: `Current Author`,
        date: dayjs()
      };

      this._filmCommentsModel.addComment(newComment);
      commentsIDs.push(id);
    }
    this._onDataChange(this._film, Object.assign({}, this._film, {comments: commentsIDs}));

    this._filmDetails.updateElement();
  }

  _closeFilmDetails() {
    toggleElement(this._footerElement, this._cardDetailsComponent, `hide`);
    document.removeEventListener(`keydown`, this._onEscapeKeyPress);
    this._bodyElement.classList.remove(`hide-overflow`);
    this._mode = MODE.DEFAULT;
  }

  _onClickCardFilm() {
    toggleElement(this._footerElement, this._cardDetailsComponent, `show`);
    document.addEventListener(`keydown`, this._onEscapeKeyPress);
    this._bodyElement.classList.add(`hide-overflow`);
    this._cardDetailsComponent.setCloseClickHandler(this._onClickCloseButton);
    this._changeMode();
    this._mode = MODE.EDIT;
  }

  _onClickCloseButton() {
    this._closeFilmDetails();
  }

  _onEscapeKeyPress(evt) {
    if (evt.key === Keydown.ESC) {
      this._closeFilmDetails();
    }
  }
  _onDeleteButtonClick(evt) {
    evt.preventDefault();
    const id = evt.target.getAttribute(`data-id`);
    this._filmCommentsModel.addCommentForDelete(id);
    evt.target.closest(`.film-details__comment`).remove();
    this._filmDetails.getElement().querySelector(`.film-details__comments-count`).textContent = this._filmDetails.getElement().querySelectorAll(`.film-details__comments-list > .film-details__comment`).length;
  }
}
