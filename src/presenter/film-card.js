import FilmCardView from "../view/film-card";
import FilmDetailsView from "../view/film-details";
import FilmDetailsCommentsView from "../view/film-details-comments";
import FilmDetailsControlsView from "../view/film-details-controls";
import FilmDetailsNewCommentView from "../view/film-details-new-comment";

import CommentsModel from "../models/comments";
import AdapterModel from "../models/adapter";

import {render, removeChild, appendChild, replace, remove} from "../utils/render";
import Keydown from "../const";

const Mode = {
  CLOSED: `closed`,
  OPEN: `open`,
};

const Field = {
  HISTORY: `isInHistory`,
  FAVORITE: `isInFavorites`,
  WATCHLIST: `isInWatchlist`,
};

export default class FilmCardPresenter {
  constructor(film, container, onDataChange, onViewChange, api) {
    this._film = film;
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._api = api;

    this._comments = null;
    this._mode = Mode.CLOSED;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._filmDetailsControlsComponent = null;
    this._filmDetailsCommentsComponent = null;
    this._filmDetailsNewCommentComponent = new FilmDetailsNewCommentView();
    this._newCommentContainer = null;
    this._commentsModel = new CommentsModel();

    this._closePopupOnEscPress = this._closePopupOnEscPress.bind(this);
    this._showPopupOnClick = this._showPopupOnClick.bind(this);
    this._closePopupOnClick = this._closePopupOnClick.bind(this);
    this._changeData = this._changeData.bind(this);
    this._deleteComment = this._deleteComment.bind(this);
    this._addComment = this._addComment.bind(this);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
    remove(this._filmDetailsNewCommentComponent);

    document.removeEventListener(`keydown`, this._closePopupOnEscPress);
  }

  _closePopupOnEscPress(evt) {
    if (evt.key === Keydown.ESC) {
      this._onViewChange();

      this._mode = Mode.CLOSED;
    }
  }

  _showPopupOnClick() {
    this._onViewChange();
    this._renderComments();
    document.querySelector(`body`).classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, this._closePopupOnEscPress);

    this._filmDetailsNewCommentComponent.setAddCommentHandler((comment) => {
      if (this._mode === Mode.OPEN) {
        this._api.addComment(this._film.id, JSON.stringify(comment))
          .then((res) => res.json())
          .then((response) => {
            this._commentsModel.setComments(response.comments);
            this._resetTextarea();
            this._renderComments();
          })
          .catch(() => {
            this._filmDetailsNewCommentComponent.shakeBlock();
          });
      }
    });

    appendChild(document.body, this._filmDetailsComponent);
    this._mode = Mode.OPEN;
  }

  _closePopupOnClick() {
    this._onViewChange();
    this._mode = Mode.CLOSED;
  }

  _closePopup() {
    this._filmDetailsNewCommentComponent.reset();
    removeChild(this._filmDetailsCommentsComponent);
    removeChild(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._closePopupOnEscPress);
    document.querySelector(`body`).classList.remove(`hide-overflow`);
    this._filmDetailsNewCommentComponent.removeCommentHandler();
    this._mode = Mode.CLOSED;
    this._onDataChange(this, this._film, AdapterModel.clone(this._film));
  }

  _renderFilmCard(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardView(film);
    this._filmCardComponent.setClickHandler(this._showPopupOnClick);

    this._filmCardComponent.setAddToWatchlistHandler((evt) => {
      evt.preventDefault();
      this._changeData(film, Field.WATCHLIST);
    });

    this._filmCardComponent.setAlreadyWatchedHandler((evt) => {
      evt.preventDefault();
      this._changeData(film, Field.HISTORY);
    });

    this._filmCardComponent.setAddToFavoritesHandler((evt) => {
      evt.preventDefault();
      this._changeData(film, Field.FAVORITE);
    });


    if (prevFilmCardComponent) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    } else {
      render(this._container, this._filmCardComponent);
    }
  }

  _renderFilmDetails(film) {
    this._film = film;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmDetailsComponent = new FilmDetailsView(film);
    this._renderFilmDetailsControls(film);
    this._newCommentContainer = this._filmDetailsComponent.getElement().querySelector(`.form-details__bottom-container`);
    this._filmDetailsComponent.setClickHandler(this._closePopupOnClick);

    if (prevFilmDetailsComponent) {
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);

      this._filmDetailsNewCommentComponent.updateElement();
      appendChild(this._newCommentContainer, this._filmDetailsNewCommentComponent);
    }
  }

  _renderFilmDetailsControls(film) {
    if (this._filmDetailsControlsComponent) {
      remove(this._filmDetailsControlsComponent);
    }

    const {isInWatchlist, isInHistory, isInFavorites} = film;
    this._filmDetailsControlsComponent = new FilmDetailsControlsView({isInWatchlist, isInHistory, isInFavorites});
    render(this._filmDetailsComponent.getElement().querySelector(`.form-details__top-container`), this._filmDetailsControlsComponent);

    this._filmDetailsControlsComponent.setAddToWatchlistHandler((evt) => {
      evt.preventDefault();
      this._changeData(film, Field.WATCHLIST);
    });

    this._filmDetailsControlsComponent.setAlreadyWatchedHandler((evt) => {
      evt.preventDefault();
      this._changeData(film, Field.HISTORY);
    });

    this._filmDetailsControlsComponent.setAddToFavoritesHandler((evt) => {
      evt.preventDefault();
      this._changeData(film, Field.FAVORITE);
    });
  }

  render(film) {
    this._renderFilmCard(film);
    this._renderFilmDetails(film);
  }

  updateElement(film) {
    this._renderFilmCard(film);
    this._renderFilmDetailsControls(film);
  }

  _renderComments() {
    if (this._filmDetailsCommentsComponent) {
      remove(this._filmDetailsCommentsComponent);
    }

    this._api.getComment(this._film.id)
      .then((comments) => {
        this._commentsModel.setComments(comments);
        this._comments = this._commentsModel.getComments();
        this._filmDetailsCommentsComponent = new FilmDetailsCommentsView(this._comments);

        appendChild(this._filmDetailsComponent.getElement().querySelector(`.film-details__bottom-container`), this._filmDetailsCommentsComponent);

        this._filmDetailsCommentsComponent.setDeleteButtonHandler(this._deleteComment);

        appendChild(this._filmDetailsComponent.getElement().querySelector(`.film-details__comments-wrap`), this._filmDetailsNewCommentComponent);
      });
  }

  _addComment(comment) {
    if (this._mode === Mode.OPEN) {
      this._api.addComment(this._film.id, JSON.stringify(comment))
        .then((response) => {
          this._commentsModel.setComments(response.comments);
          this._resetTextarea();
          this._renderComments();
        })
        .catch(() => {
          this._filmDetailsNewCommentComponent.shakeBlock();
        });
    }
  }

  _deleteComment(commentId) {
    this._api.deleteComment(commentId)
      .then(() => {
        this._commentsModel.remove(commentId);
        this._renderComments();
      })
      .catch(() => {
        this._filmDetailsCommentsComponent.shakeComment(commentId);
      });
  }

  _resetTextarea() {
    this._filmDetailsNewCommentComponent.reset();
  }

  setDefaultView() {
    if (this._mode !== Mode.CLOSED) {
      this._closePopup();
    }
  }

  _changeData(film, field) {
    const newFilm = AdapterModel.clone(film);
    newFilm[field] = !newFilm[field];

    if (newFilm[field] === Field.HISTORY) {
      newFilm.watchingDate = new Date();
    } else {
      newFilm.watchingDate = null;
    }

    this._onDataChange(this, film, newFilm);
  }
}
