import {nanoid} from "nanoid";
import dayjs from "dayjs";
import Card from "../view/card";
import DetailCard from "../view/detail-card";
import {POSITION, render, toggleElement, replace, remove} from "../utils/render";
import Keydown from "../const";


const Mode = {
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
    const filmPresenter = new Movie(container, onDataChange, commentsModel);
    filmPresenter.render(film);
    return filmPresenter;
  });
};

export default class Movie {
  constructor(container, onDataChange, commentsModel) {
    this._bodyElement = document.querySelector(`body`);
    this._container = container;
    this._onDataChange = onDataChange;
    this._mode = Mode.DEFAULT;
    this._filmComponent = null;
    this._filmDetailsComponent = null;
    this._footerElement = document.querySelector(`.footer`);
    this._setCardHandlers = this._setCardHandlers.bind(this);
    this._closeFilmDetails = this._closeFilmDetails.bind(this);
    this._onCardElementClick = this._onCardElementClick.bind(this);
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onEscapeKeyPress = this._onEscapeKeyPress.bind(this);
    this._setAddToWatchlist = this._setAddToWatchlist.bind(this);
    this._setMarkAsWatched = this._setMarkAsWatched.bind(this);
    this._setMarkAsFavorite = this._setMarkAsFavorite.bind(this);
    this._film = null;
    this._filmCommentsModel = commentsModel;
    this._onSubmitForm = this._onSubmitForm.bind(this);
    this._onChangeFormFilterInput = this._onChangeFormFilterInput.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
  }

  get film() {
    return this._film;
  }

  render(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmComponent = new Card(film);
    this._filmDetailsComponent = new DetailCard(film, this._filmCommentsModel);

    this._filmComponent.setAddToWatchlistButtonClickHandler(this._setAddToWatchlist);
    this._filmComponent.setMarkAsWatchedButtonClickHandler(this._setMarkAsWatched);
    this._filmComponent.setMarkAsFavoriteButtonClickHandler(this._setMarkAsFavorite);

    if (prevFilmComponent === null || prevFilmDetailsComponent === null) {
      render(this._container, this._filmComponent, POSITION.BEFOREEND);
      this._setCardHandlers();
      return;
    }
    if (this._mode === Mode.DEFAULT) {
      replace(this._filmComponent, prevFilmComponent);
    }
    if (this._mode === Mode.EDIT) {
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
    }
    remove(prevFilmComponent);
    remove(prevFilmDetailsComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscapeKeyPress);
  }

  // setDefaultView() {
  //   if (this._mode !== Mode.DEFAULT) {
  //     this._closeFilmDetails();
  //   }
  // }

  _setAddToWatchlist() {
    this._onDataChange(this._film, Object.assign({}, this._film, {
      isWatchlist: !this._film.isWatchlist
    }));
  }

  _setMarkAsWatched() {
    const watchingDate = this._film.isWatched ? null : new Date();
    this._onDataChange(this._film, Object.assign({}, this._film, {
      isWatched: !this._film.isWatched, watchingDate
    }));
  }

  _setMarkAsFavorite() {
    this._onDataChange(this._film, Object.assign({}, this._film, {
      isFavorites: !this._film.isFavorites
    }));
  }

  _setCardHandlers() {
    this._filmComponent.setOpenCardClickHandler(this._onCardElementClick);
    this._filmDetailsComponent.setFormElementsChangeHandler();
    this._filmDetailsComponent.setCloseClickHandler(this._onCloseButtonClick);
    this._filmDetailsComponent.setFormFilterInputChangeHandler(this._onChangeFormFilterInput);
    this._filmDetailsComponent.setFormSubmitHandler(this._onSubmitForm);
    this._filmDetailsComponent.setDeleteCommentButtonClickHandler(this._onDeleteButtonClick);
  }

  _onSubmitForm() {
    const filmDetailComponent = this._filmDetailsComponent;
    const commentText = filmDetailComponent.getElement().querySelector(`.film-details__comment-input`).value;
    const emoji = filmDetailComponent.getElement().querySelector(`[name="comment-emoji"]:checked`);

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

    this._filmDetailsComponent.updateElement();
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

  _closeFilmDetails() {
    this._filmDetailsComponent.reset();
    toggleElement(this._footerElement, this._filmDetailsComponent, `hide`);
    document.removeEventListener(`keydown`, this._onEscapeKeyPress);
    this._bodyElement.classList.remove(`hide-overflow`);
    this._mode = Mode.DEFAULT;
  }

  _onCardElementClick() {
    this._mode = Mode.EDIT;
    toggleElement(this._footerElement, this._filmDetailsComponent, `show`);
    document.addEventListener(`keydown`, this._onEscapeKeyPress);
    this._bodyElement.classList.add(`hide-overflow`);
  }

  _onCloseButtonClick() {
    this._closeFilmDetails();
  }

  _onEscapeKeyPress(evt) {
    if (evt.key === Keydown.ESC) {
      this._closeFilmDetails();
    }
  }

  _onDeleteButtonClick(evt) {
    const id = evt.target.getAttribute(`data-id`);
    this._filmCommentsModel.addCommentForDelete(id);
    evt.target.closest(`.film-details__comment`).remove();
    this._filmDetailsComponent.getElement().querySelector(`.film-details__comments-count`).textContent = this._filmDetailsComponent.getElement().querySelectorAll(`.film-details__comments-list > .film-details__comment`).length;
  }
}
