import {POSITION, render, remove} from "../utils/render";
import NoLoadFilmsView from "../view/no-load-films";
import SortingView from "../view/sorting";
import ContentView from "../view/content";
import LoadMoreButtonView from "../view/load-more";
import renderFilms from "./movie";
import FiltersPresenter from "./filter";
import ExtraBlockPresenter from "./extra-block";
import MoviePresenter from "./movie";
// import {sortingByDesc} from "../utils/common";
// import MoviesModel from "../model/movies";
import {getFilmsSortingByCommentsCount, getFilmsSortingByRating} from "../utils/film";

const FILMS_PER_COUNT = 5;
const FILM_COUNT_ADDITION = 2;

export default class BoardPresenter {
  constructor(container, moviesModel, commentsModel, changeMode) {
    this._container = container;
    this._sorting = new SortingView();
    this._content = new ContentView();
    this._loadMoreButton = new LoadMoreButtonView();
    this._noLoadFilms = new NoLoadFilmsView();
    this._filtersPresenter = new FiltersPresenter(this._container, moviesModel);
    this._moviePresenter = new MoviePresenter(this._container, changeMode);
    this._showFilmsPerCount = FILMS_PER_COUNT;
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._changeMode = changeMode;
    this._films = [];
    this._showFilms = [];
    this._filmsInExtraBlocks = [];
    this._renderLoadMoreButton = this._renderLoadMoreButton.bind(this);
    this._renderSortingFilms = this._renderSortingFilms.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._updateFilms = this._updateFilms.bind(this);
    this._removeFilms = this._removeFilms.bind(this);
    this._onExtraBlockChange = this._onExtraBlockChange.bind(this);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
    this._moviesModel.setExtraBlockChangeHandler(this._onExtraBlockChange);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._filmListContainer = null;
    this._filmsContainer = null;
    this._filmListElement = null;
    this._extraBlockPresenter = null;
  }

  render() {
    this._films = this._moviesModel.getFilms();
    this._filtersPresenter.render();

    render(this._container, this._sorting, POSITION.BEFOREEND);
    render(this._container, this._content, POSITION.BEFOREEND);

    this._filmContainer = this._container.querySelector(`.films`);
    this._filmListContainer = this._container.querySelector(`.films-list__container`);

    const filmSortingByRating = this._getFilmsSortingByRating();
    const filmSortingByCommentsCount = this._getFilmsSortingByCommentsCount();
    const data = [filmSortingByRating, filmSortingByCommentsCount];

    if (this._films.length > 0) {
      const showFilms = renderFilms(this._filmListContainer, this._moviesModel.getSortedFilms(this._sorting.getCurrentSortingType(), 0, this._showFilmsPerCount), this._onDataChange, this._commentsModel);
      this._showFilms = this._showFilms.concat(showFilms);
      this._renderLoadMoreButton();
      this._extraBlockPresenter = new ExtraBlockPresenter(this._filmContainer, data, this._moviesModel, this._onDataChange, this._commentsModel);
      this._extraBlockPresenter.render();

      this._filmsInExtraBlocks = this._extraBlockPresenter.showFilms;
      this._showFilms = this._showFilms.concat(this._filmsInExtraBlocks);
      this._renderSortingFilms();
    } else {
      this._filmListContainer.remove();
      render(this._filmContainer.querySelector(`.films-list`), this._noLoadFilms, POSITION.BEFOREEND);
    }
  }

  _renderLoadMoreButton() {
    render(this._filmListContainer, this._loadMoreButton, POSITION.AFTEREND);
    this._loadMoreButton.setClickHandler(() => {
      const prevFilmsCount = this._showFilmsPerCount;
      this._showFilmsPerCount += FILMS_PER_COUNT;
      const sortedFilms = this._moviesModel.getSortedFilms(this._sorting.getCurrentSortingType(), prevFilmsCount, this._showFilmsPerCount);
      const showFilms = renderFilms(this._filmListContainer, sortedFilms, this._onDataChange, this._commentsModel);
      this._showFilms = this._showFilms.concat(showFilms);

      if (this._showFilmsPerCount >= this._films.length) {
        remove(this._loadMoreButton);
      }
    });
  }

  _renderSortingFilms() {
    this._sorting.setSortingTypeChangeHandler((sortingType) => {
      this._showFilmsPerCount = FILMS_PER_COUNT;
      this._filmListContainer.innerHTML = ``;
      remove(this._loadMoreButton);

      const showFilms = renderFilms(this._filmListContainer, this.moviesModel.getSortedFilms(sortingType, 0, this._showFilmsPerCount), this._onDataChange, this._commentsModel);
      this._showFilms = [].concat(showFilms);
      this._showFilms = this._showFilms.concat(this._filmsInExtraBlocks);
      this._renderLoadMoreButton();
    });
  }

  _handleModeChange() {
    Object
      .values(this._moviePresenter)
      .forEach((filmPresenter) => filmPresenter.resetView());
  }

  _onDataChange(oldData, newData) {
    this._moviesModel.updateData(oldData.id, newData);
    const filmPresenters = this._showFilms.filter((filmPresenter) => filmPresenter.film === oldData);
    filmPresenters.forEach((filmPresenter) => filmPresenter.render(newData));
    this._filtersPresenter.render();
  }
  _onExtraBlockChange() {
    this._filmsInExtraBlocks = this._extraBlockPresenter.showFilms;
    this._showFilms = this._showFilms.concat(this._filmsInExtraBlocks);
  }

  _onFilterChange() {
    this._updateFilms();
  }

  _updateFilms() {
    this._removeFilms();
    this._films = this._moviesModel.getFilms();
    this._sorting.setDefaultSortingType();
    const showFilms = renderFilms(this._filmListContainer, this._moviesModel.getSortedFilms(this._sorting.getCurrentSoringtType(), 0, FILMS_PER_COUNT), this._onDataChange, this._commentsModel);
    this._showFilms = this._showFilms.concat(showFilms);
    this._showFilmsPerCount = showFilms.length;
    this._renderLoadMoreButton();
  }

  _removeFilms() {
    this._showFilms.forEach((filmPresenter) => {
      if (!this._filmsInExtraBlocks.includes(filmPresenter)) {
        filmPresenter.destroy();
      }
    });
    this._showFilms = [].concat(this._filmsInExtraBlocks);
    remove(this._loadMoreButton);
  }
  _getFilmsSortingByRating() {
    return getFilmsSortingByRating(this._moviesModel.getAllFilms(), 0, FILM_COUNT_ADDITION);
  }

  _getFilmsSortingByCommentsCount() {
    return getFilmsSortingByCommentsCount(this._moviesModel.getAllFilms(), 0, FILM_COUNT_ADDITION);
  }
}
