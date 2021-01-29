import BoardView from "../view/board";
import SortView from "../view/sort";
import ShowMoreButtonView from "../view/show-more-button";
import FilmsListComponent from "../view/films-list";
import FilmListContainerView from "../view/film-list-container";
import MostCommentedFilmsView from "../view/most-commented-films";
import TopRatedFilmsView from "../view/top-rated-films";
import NoLoadFilmsView from "../view/no-load-films";
import LoadFilmsView from "../view/load-films";

import {render, remove} from "../utils/render";
import {SortType} from "../const.js";
import {getSortedFilms} from "../utils/sort";

import FilmCardPresenter from "../presenter/film-card";

const CardCount = {
  DEFAULT: 17,
  ON_START: 5,
  STEP: 5,
  EXTRA: 2
};

export default class FilmCardListPresenter {
  constructor(container, filmsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._api = api;

    this._currentFilmPresenters = [];
    this._currentCardsCount = CardCount.ON_START;

    this._filmsListContainer = null;

    this._films = [];
    this._currentTopRatedFilms = [];
    this._currentMostCommentedFilms = [];

    this._filmsLoadComponent = new LoadFilmsView();
    this._sortComponent = new SortView(SortType.DEFAULT);
    this._filmsComponent = new BoardView();
    this._filmsListComponent = new FilmsListComponent();
    this._filmsListContainerComponent = new FilmListContainerView();
    this._noFilmsComponent = new NoLoadFilmsView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsView();
    this._topRatedFilmsComponent = new TopRatedFilmsView();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);


    this._sortComponent.setSortTypeHandler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    this._films = this._filmsModel.getAllFilms();

    const currentFilms = this._films.slice(0, this._currentCardsCount);

    render(this._container, this._sortComponent);
    render(this._container, this._filmsComponent);
    render(this._filmsComponent.getElement(), this._filmsListComponent);

    render(this._filmsListComponent.getElement(), this._filmsListContainerComponent);

    this._filmsListContainer = this._filmsListContainerComponent.getElement();

    if (this._films.length === 0) {
      render(this._filmsListContainer, this._noFilmsComponent);
      return;
    }

    this._renderFilms(currentFilms, this._filmsListContainer);
    this._renderShowMoreButton();
  }

  _renderFilmPresenters(films, container) {
    return films.map((film) => {
      const filmPresenter = new FilmCardPresenter(film, container, this._onDataChange, this._onViewChange, this._api);
      filmPresenter.render(film);
      this._currentFilmPresenters.push(filmPresenter);
    });
  }

  _renderFilms(films, container) {
    this._films = films;
    if (this._films.length === 0) {
      render(this._filmsListContainer, this._noFilmsComponent);
      return;
    }
    this._renderFilmPresenters(films, container);
  }

  _removeFilms() {
    this._currentFilmPresenters.forEach((filmController) => filmController.destroy());
    this._currentFilmPresenters = [];
  }

  _updateFilms(count) {
    this._removeFilms();
    this._renderFilms(this._filmsModel.getFilms().slice(0, count), this._filmsListContainer);
    this._renderShowMoreButton();
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._currentCardsCount >= this._filmsModel.getFilms().length) {
      return;
    }

    render(this._filmsListComponent.getElement(), this._showMoreButtonComponent);
    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _onShowMoreButtonClick() {
    const previousCardCount = this._currentCardsCount;
    const films = this._filmsModel.getFilms();

    this._currentCardsCount += CardCount.STEP;

    const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), previousCardCount, this._currentCardsCount);
    this._renderFilms(sortedFilms, this._filmsListContainer);

    if (this._currentCardsCount >= films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _updateList(sortType) {
    this._currentCardsCount = CardCount.ON_START;
    this._removeFilms();
    this._renderFilms(getSortedFilms(this._filmsModel.getFilms(), sortType, 0, this._currentCardsCount), this._filmsListContainer);
    this._renderShowMoreButton();
  }

  _onSortTypeChange(sortType) {
    this._updateList(sortType);
  }

  _onDataChange(filmPresenter, oldData, newData) {

    this._api.updateFilm(oldData.id, newData)
      .then((film) => {
        this._filmsModel.updateFilms(oldData.id, film);
        filmPresenter.updateElement(film);
      });
  }

  _onViewChange() {
    this._currentFilmPresenters.forEach((presenter) => presenter.setDefaultView());
  }

  _onFilterChange() {
    if (this._noFilmsComponent) {
      remove(this._noFilmsComponent);
    }
    this._sortComponent.setDefaultSortType();
    this._onSortTypeChange(SortType.DEFAULT);
    this._updateList(this._sortComponent.getSortType());
  }

  hide() {
    this._sortComponent.hide();
    this._filmsComponent.hide();
  }

  show() {
    this._sortComponent.show();
    this._filmsComponent.show();
  }

  showPreloader() {
    render(this._container, this._filmsComponent);
    render(this._filmsComponent.getElement(), this._filmsLoadComponent);
  }

  removePreloader() {
    remove(this._filmsLoadComponent);
  }

  _renderExtraFilmList() {
    render(this._filmsComponent.getElement(), this._topRatedFilmsComponent);
    render(this._filmsComponent.getElement(), this._mostCommentedFilmsComponent);

    this._currentTopRatedFilms = getSortedFilms(this._filmsModel.getAllFilms(), SortType.RATING, 0, CardCount.EXTRA);

    this._renderFilmPresenters(this._currentTopRatedFilms, this._topRatedFilmsComponent.getElement().querySelector(`.films-list__container`));

    this._currentMostCommentedFilms = getSortedFilms(this._filmsModel.getAllFilms(), SortType.COMMENTS, 0, CardCount.EXTRA);

    this._renderFilmPresenters(this._currentMostCommentedFilms, this._mostCommentedFilmsComponent.getElement().querySelector(`.films-list__container`));
  }
}
