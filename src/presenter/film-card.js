import FilmCardView from "../view/film-card";
import FilmDetailsView from "../view/film-details";

import CommentsPresenter from "../presenter/comments";

import Adapter from "../models/adapter";

import {render, replace, remove} from "../utils/render";
import Keydown from "../const";

export default class FilmCardPresenter {
  constructor(container, dataChangeHandler, viewChangeHandler, api) {
    this._container = container;
    this._dataChangeHandler = dataChangeHandler;
    this._viewChangeHandler = viewChangeHandler;
    this._api = api;

    this._film = null;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._commentsPresenter = null;

    this._closeFilmDetailsHandler = this._closeFilmDetailsHandler.bind(this);
    this._showFilmDetailsHandler = this._showFilmDetailsHandler.bind(this);
    this._escapeButtonHandler = this._escapeButtonHandler.bind(this);
    this._changeData = this._changeData.bind(this);
    this._commentDeleteHandler = this._commentDeleteHandler.bind(this);
    this._commentAddHandler = this._commentAddHandler.bind(this);
  }

  render(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardView(film);

    this._filmCardComponent.setClickHandlers(this._showFilmDetailsHandler);
    this._filmCardComponent.setControlsClickHandler(this._changeData);

    if (prevFilmCardComponent) {
      replace(this._filmCardComponent, prevFilmCardComponent);
      return;
    }

    render(this._container, this._filmCardComponent);
  }

  _escapeButtonHandler(evt) {
    if (evt.key === Keydown.ESC) {
      this._closeFilmDetailsHandler();
    }
  }

  _changeData(field) {
    const changedData = Object.assign({},
        this._film.controls,
        {[field]: !this._film.controls[field]});
    const newData = Adapter.clone(this._film);

    newData.controls = changedData;

    if (field === `isInHistory`) {
      newData.watchingDate = new Date();
    }

    this._dataChangeHandler(this._film, newData);
  }

  _showFilmDetailsHandler() {
    this._viewChangeHandler();
    this._filmFilmDetailsComponent = new FilmDetailsView(this._film);
    this._filmFilmDetailsComponent.setControlsHandler(this._changeData);
    render(document.body, this._filmFilmDetailsComponent);
    this._api.getComment(this._film.id)
      .then((response) => {
        this._film.comments = response;
        this._commentsPresenter = new CommentsPresenter(this._filmFilmDetailsComponent.getElement().querySelector(`form`), this._film.comments, this._commentDeleteHandler, this._commentAddHandler);
        this._commentsPresenter.render();
      });

    this._filmFilmDetailsComponent.setCloseButtonClickHandler(this._closeFilmDetailsHandler);

    document.body.classList.add(`hide-overflow`);

    document.addEventListener(`keydown`, this._escapeButtonHandler);
  }

  _closeFilmDetailsHandler() {
    this._commentsPresenter.destroy();
    this._deleteFilmDetails();
  }

  _commentAddHandler(comment) {
    this._api.addComment(this._film.id, JSON.stringify(comment))
      .then((response) => response.json())
      .then((parsedRes) => {
        this._film.comments = parsedRes[`comments`];
        this.render(this._film);
        this._commentsPresenter.setComments(this._film.comments);
      });
  }

  _commentDeleteHandler(id) {
    this._api.deleteComment(id)
      .then(() => {
        this._film.comments = this._film.comments.filter((comment) => comment.id !== id);
        this.render(this._film);
        this._commentsPresenter.setComments(this._film.comments);
      });
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  _deleteFilmDetails() {
    if (this._filmFilmDetailsComponent) {
      remove(this._filmFilmDetailsComponent);
      document.removeEventListener(`keydown`, this._escapeButtonHandler);
      document.body.classList.remove(`hide-overflow`);
    }
  }

  setDefaultView() {
    this._deleteFilmDetails();
  }
}
