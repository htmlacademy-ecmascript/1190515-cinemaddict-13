import {POSITION, render, remove} from "../utils/render";
import NoLoadFilmsView from "../view/no-load-films";
import SortView from "../view/sorting";
import StatisticView from "../view/sorting";
import ContentView from "../view/content";
import LoadMoreButtonView from "../view/load-more";
import renderFilms from "./movie";
import Filters, {FilterTypes} from "./filter";
import ExtraBlock from "./extra-block";
// import {getFilmsSortByCommentsCount, getFilmsSortByRating} from "../utils/film";

const FILMS_PER_COUNT = 5;
// const FILM_COUNT_ADDITION = 2;

export default class Board {
  constructor(container, moviesModel, commentsModel) {
    this._container = container;
    this._sort = new SortView();
    this._content = new ContentView();
    this._loadMoreButton = new LoadMoreButtonView();
    this._noLoadFilms = new NoLoadFilmsView();
    this._statistic = new StatisticView(moviesModel);
    this._filtersPresenter = new Filters(this._container, moviesModel);
    this._showingFilmsCount = FILMS_PER_COUNT;
    this._renderLoadMoreButton = this._renderLoadMoreButton.bind(this);
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._films = [];
    this._renderSortFilms = this._renderSortFilms.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._showingFilms = [];
    this._filmsInAdditionsBlocks = [];
    // this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._updateFilms = this._updateFilms.bind(this);
    this._removeFilms = this._removeFilms.bind(this);
    this._onAdditionBlockChange = this._onAdditionBlockChange.bind(this);
    this._moviesModel.setFilterChangeHandlers(this._onFilterChange);
    this._moviesModel.setAdditionBlockChangeHandler(this._onAdditionBlockChange);
    this._filmListContainerElement = null;
    this._filmContainerElement = null;
    this._extraBlockpresenter = null;
    // this._statistic.hide();
  }

  render() {
    this._films = this._moviesModel.getFilms();
    this._filtersPresenter.render();
    render(this._container, this._sort, POSITION.BEFOREEND);
    render(this._container, this._content, POSITION.BEFOREEND);

    this._filmContainerElement = this._container.querySelector(`.films`);
    this._filmListContainerElement = this._container.querySelector(`.films-list__container`);

    if (this._films.length > 0) {
      const showingFilms = renderFilms(this._filmListContainerElement, this._moviesModel.getSortedFilms(this._sort.getCurrentSortType(), 0, this._showingFilmsCount), this._onDataChange, this._commentsModel);
      this._showingFilms = this._showingFilms.concat(showingFilms);
      this._renderLoadMoreButton();
      this._extraBlockPresenter = new ExtraBlock(this._filmContainerElement, this._moviesModel, this._onDataChange, this._commentsModel);
      this._extraBlockPresenter.render();
      this._filmsInAdditionsBlocks = this._extraBlockPresenter.showingFilms;
      this._showingFilms = this._showingFilms.concat(this._filmsInAdditionsBlocks);
      this._renderSortFilms();
    } else {
      this._filmListContainerElement.remove();
      render(this._filmContainerElement.querySelector(`.films-list`), this._noLoadFilms, POSITION.BEFOREEND);
    }

    render(this._container, this._statistic, POSITION.BEFOREEND);
  }

  _show() {
    if (this._filmContainerElement.classList.contains(`visually-hidden`)) {
      this._filmContainerElement.classList.remove(`visually-hidden`);
    }
  }

  _hide() {
    if (!this._filmContainerElement.classList.contains(`visually-hidden`)) {
      this._filmContainerElement.classList.add(`visually-hidden`);
    }
  }

  _renderLoadMoreButton() {
    render(this._filmListContainerElement, this._loadMoreButton, POSITION.AFTEREND);
    this._loadMoreButton.setClickHandler(() => {
      const prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + FILMS_PER_COUNT;

      const sortedFilms = this._moviesModel.getSortedFilms(this._sort.getCurrentSortType(), prevFilmsCount, this._showingFilmsCount);
      const showingFilms = renderFilms(this._filmListContainerElement, sortedFilms, this._onDataChange, this._commentsModel);
      this._showingFilms = this._showingFilms.concat(showingFilms);

      if (this._showingFilmsCount >= this._films.length) {
        remove(this._loadMoreButton);
      }
    });
  }

  _renderSortFilms() {
    this._sort.setSortTypeChangeHandler((sortType) => {
      this._showingFilmsCount = FILMS_PER_COUNT;
      this._filmListContainerElement.innerHTML = ``;
      remove(this._loadMoreButton);
      const showingFilms = renderFilms(this._filmListContainerElement, this._moviesModel.getSortedFilms(sortType, 0, this._showingFilmsCount), this._onDataChange, this._commentsModel);
      this._showingFilms = [].concat(showingFilms);
      this._showingFilms = this._showingFilms.concat(this._filmsInAdditionsBlocks);
      this._renderLoadMoreButton();
    });
  }

  _onDataChange(oldData, newData) {
    this._moviesModel.updateData(oldData.id, newData);

    const filmPresenters = this._showingFilms.filter((filmPresenter) => filmPresenter.film === oldData);

    filmPresenters.forEach((filmPresenter) => filmPresenter.render(newData));
    this._filtersPresenter.render();
    this._updateFilms();
    this._statistic.rerender();
  }

  _onAdditionBlockChange() {
    this._filmsInAdditionsBlocks = this._extraBlockpresenter.showingFilms;
    this._showingFilms = this._showingFilms.concat(this._filmsInAdditionsBlocks);
  }

  // _onViewChange() {
  //   this._showingFilms.forEach((filmPresenter) => filmPresenter.setDefaultView());
  // }

  _onFilterChange() {
    this._updateFilms();
  }

  _updateFilms() {
    if (this._filtersPresenter.getCurrentFilterType() === FilterTypes.STATISTIC) {
      this._sort.hide();
      this._hide();
      this._statistic.show();
    } else {
      this._sort.setDefaultSortType();
      this._removeFilms();
      this._films = this._moviesModel.getFilms();
      const showingFilms = renderFilms(this._filmListContainerElement, this._moviesModel.getSortedFilms(this._sort.getCurrentSortType(), 0, FILMS_PER_COUNT), this._onDataChange, this._commentsModel);
      this._showingFilms = this._showingFilms.concat(showingFilms);
      this._showingFilmsCount = showingFilms.length;
      this._renderLoadMoreButton();
      this._statistic.hide();
      this._sort.show();
      this._show();
    }
  }

  _removeFilms() {
    this._showingFilms.forEach((filmPresenter) => {
      if (!this._filmsInAdditionsBlocks.includes(filmPresenter)) {
        filmPresenter.destroy();
      }
    });
    this._showingFilms = [].concat(this._filmsInAdditionsBlocks);
    remove(this._loadMoreButton);
  }
}
