import BoardView from "../view/board-view";
import SortView from "../view/sort-view";
import ShowMoreButtonView from "../view/show-more-button-view";
import FilmsListView from "../view/films-list-view";
import FilmListContainerView from "../view/film-list-container-view";
import MostCommentedFilmsView from "../view/most-commented-films-view";
import TopRatedFilmsView from "../view/top-rated-films-view";
import NoLoadFilmsView from "../view/no-load-films-view";
import LoadFilmsView from "../view/load-films-view";

import {render, remove} from "../utils/render-utils";
import {SortType, CardsCount} from "../const";
import {getSortedFilms} from "../utils/sort-utils";

import FilmCardPresenter from "./film-card-presenter";

export default class FilmCardListPresenter {
  constructor(container, filmsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._api = api;

    this._currentFilmPresenters = [];
    this._currentCardsCount = CardsCount.ON_START;

    this._filmsListContainer = null;

    this._films = [];
    this._currentTopRatedFilms = [];
    this._currentMostCommentedFilms = [];

    this._filmsLoadView = new LoadFilmsView();
    this._sortView = new SortView(SortType.DEFAULT);
    this._filmsView = new BoardView();
    this._filmsListView = new FilmsListView();
    this._filmsListContainerView = new FilmListContainerView();
    this._noFilmsView = new NoLoadFilmsView();
    this._showMoreButtonView = new ShowMoreButtonView();
    this._mostCommentedFilmsView = new MostCommentedFilmsView();
    this._topRatedFilmsView = new TopRatedFilmsView();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);


    this._sortView.setSortTypeHandler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    this._films = this._filmsModel.getAllFilms();

    const currentFilms = this._films.slice(0, this._currentCardsCount);

    render(this._container, this._sortView);
    render(this._container, this._filmsView);
    render(this._filmsView.getElement(), this._filmsListView);

    render(this._filmsListView.getElement(), this._filmsListContainerView);

    this._filmsListContainer = this._filmsListContainerView.getElement();

    if (this._films.length === 0) {
      render(this._filmsListContainer, this._noFilmsView);
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
      render(this._filmsListContainer, this._noFilmsView);
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
    remove(this._showMoreButtonView);

    if (this._currentCardsCount >= this._filmsModel.getFilms().length) {
      return;
    }

    render(this._filmsListView.getElement(), this._showMoreButtonView);
    this._showMoreButtonView.setClickHandler(this._onShowMoreButtonClick);
  }

  _onShowMoreButtonClick() {
    const previousCardsCount = this._currentCardsCount;
    const films = this._filmsModel.getFilms();

    this._currentCardsCount += CardsCount.STEP;

    const sortedFilms = getSortedFilms(films, this._sortView.getSortType(), previousCardsCount, this._currentCardsCount);
    this._renderFilms(sortedFilms, this._filmsListContainer);

    if (this._currentCardsCount >= films.length) {
      remove(this._showMoreButtonView);
    }
  }

  _updateList(sortType) {
    this._currentCardsCount = CardsCount.ON_START;
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
    if (this._noFilmsView) {
      remove(this._noFilmsView);
    }
    this._sortView.setDefaultSortType();
    this._onSortTypeChange(SortType.DEFAULT);
    this._updateList(this._sortView.getSortType());
  }

  hide() {
    this._sortView.hide();
    this._filmsView.hide();
  }

  show() {
    this._sortView.show();
    this._filmsView.show();
  }

  showPreloader() {
    render(this._container, this._filmsView);
    render(this._filmsView.getElement(), this._filmsLoadView);
  }

  removePreloader() {
    remove(this._filmsLoadView);
  }

  _renderExtraFilmList() {
    render(this._filmsView.getElement(), this._topRatedFilmsView);
    render(this._filmsView.getElement(), this._mostCommentedFilmsView);

    this._currentTopRatedFilms = getSortedFilms(this._filmsModel.getAllFilms(), SortType.RATING, 0, CardsCount.EXTRA);

    this._renderFilmPresenters(this._currentTopRatedFilms, this._topRatedFilmsView.getElement().querySelector(`.films-list__container`));

    this._currentMostCommentedFilms = getSortedFilms(this._filmsModel.getAllFilms(), SortType.COMMENTS, 0, CardsCount.EXTRA);

    this._renderFilmPresenters(this._currentMostCommentedFilms, this._mostCommentedFilmsView.getElement().querySelector(`.films-list__container`));
  }
}