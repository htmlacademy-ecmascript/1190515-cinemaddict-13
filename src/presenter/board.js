import {POSITION, render, remove} from "../utils/render";
import NoLoadFilmsView from "../view/no-load-films";
import SortView from "../view/sorting";
import StatisticView from "../view/sorting";
import ContentView from "../view/content";
import LoadMoreButtonView from "../view/load-more";
import renderFilms from "./movie";
import FiltersPresenter, {FilterTypes} from "./filter";
import ExtraBlockPresenter from "./extra-block";
// import {getFilmsSortByCommentsCount, getFilmsSortByRating} from "../utils/film";

const FILMS_PER_COUNT = 5;
// const FILM_COUNT_ADDITION = 2;

export default class BoardPresenter {
  constructor(container, moviesModel, commentsModel) {
    this._container = container;
    this._sorting = new SortView();
    this._content = new ContentView();
    this._loadMoreButton = new LoadMoreButtonView();
    this._noLoadFilms = new NoLoadFilmsView();
    this._filtersPresenter = new FiltersPresenter(this._container, moviesModel);
    this._showingFilmsCount = FILMS_PER_COUNT;
    this._renderLoadMoreButton = this._renderLoadMoreButton.bind(this);
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._films = [];
    this._renderSortFilms = this._renderSortFilms.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._showingFilms = [];
    this._filmsInAdditionsBlocks = [];
    this._onViewChange = this._onViewChange.bind(this);
    this._filtersController = new FiltersPresenter(this._container, moviesModel);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._updateFilms = this._updateFilms.bind(this);
    this._removeFilms = this._removeFilms.bind(this);
    this._onAdditionBlockChange = this._onAdditionBlockChange.bind(this);
    this._moviesModel.setFilterChangeHandlers(this._onFilterChange);
    this._moviesModel.setAdditionBlockChangeHandler(this._onAdditionBlockChange);
    this._filmListContainerElement = null;
    this._filmContainerElement = null;
    this._extraBlockpresenter = null;
    this._statisticComponent = new StatisticView(moviesModel);
    // this._statisticComponent.hide();
  }

  render() {
    this._films = this._moviesModel.getFilms();
    this._filtersController.render();
    render(this._container, this._sort, POSITION.BEFOREEND);
    render(this._container, this._contentBlock, POSITION.BEFOREEND);

    this._filmContainerElement = this._container.querySelector(`.films`);
    this._filmListContainerElement = this._container.querySelector(`.films-list__container`);

    if (this._films.length > 0) {
      const showingFilms = renderFilms(this._filmListContainerElement, this._moviesModel.getSortedFilms(this._sort.getCurrentSortType(), 0, this._showingFilmsCount), this._onDataChange, this._commentsModel);
      this._showingFilms = this._showingFilms.concat(showingFilms);
      this._renderLoadMoreButton();
      this._extraBlockpresenter = new ExtraBlockPresenter(this._filmContainerElement, this._moviesModel, this._onDataChange, this._commentsModel);
      this._extraBlockpresenter.render();
      this._filmsInAdditionsBlocks = this._extraBlockpresenter.showingFilms;
      this._showingFilms = this._showingFilms.concat(this._filmsInAdditionsBlocks);
      this._renderSortFilms();
    } else {
      this._filmListContainerElement.remove();
      render(this._filmContainerElement.querySelector(`.films-list`), this._noFilm, POSITION.BEFOREEND);
    }

    render(this._container, this._statisticComponent, POSITION.BEFOREEND);
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
    render(this._filmListContainerElement, this._moreButton, POSITION.AFTEREND);
    this._moreButton.setClickHandler(() => {
      const prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + FILMS_PER_COUNT;

      const sortedFilms = this._moviesModel.getSortedFilms(this._sort.getCurrentSortType(), prevFilmsCount, this._showingFilmsCount);
      const showingFilms = renderFilms(this._filmListContainerElement, sortedFilms, this._onDataChange, this._commentsModel);
      this._showingFilms = this._showingFilms.concat(showingFilms);

      if (this._showingFilmsCount >= this._films.length) {
        remove(this._moreButton);
      }
    });
  }

  _renderSortFilms() {
    this._sort.setSortTypeChangeHandler((sortType) => {
      this._showingFilmsCount = FILMS_PER_COUNT;
      this._filmListContainerElement.innerHTML = ``;
      remove(this._moreButton);
      const showingFilms = renderFilms(this._filmListContainerElement, this._moviesModel.getSortedFilms(sortType, 0, this._showingFilmsCount), this._onDataChange, this._commentsModel);
      this._showingFilms = [].concat(showingFilms);
      this._showingFilms = this._showingFilms.concat(this._filmsInAdditionsBlocks);
      this._renderLoadMoreButton();
    });
  }

  _onDataChange(oldData, newData) {
    this._moviesModel.updateData(oldData.id, newData);

    const filmControllers = this._showingFilms.filter((filmController) => filmController.film === oldData);

    filmControllers.forEach((filmController) => filmController.render(newData));
    this._filtersController.render();
    this._updateFilms();
    this._statisticComponent.rerender();
  }

  _onAdditionBlockChange() {
    this._filmsInAdditionsBlocks = this._extraBlockpresenter.showingFilms;
    this._showingFilms = this._showingFilms.concat(this._filmsInAdditionsBlocks);
  }

  _onViewChange() {
    this._showingFilms.forEach((filmController) => filmController.setDefaultView());
  }

  _onFilterChange() {
    this._updateFilms();
  }

  _updateFilms() {
    if (this._filtersController.getCurrentFilterType() === FilterTypes.STATISTIC) {
      this._sort.hide();
      this._hide();
      this._statisticComponent.show();
    } else {
      this._sort.setDefaultSortType();
      this._removeFilms();
      this._films = this._moviesModel.getFilms();
      const showingFilms = renderFilms(this._filmListContainerElement, this._moviesModel.getSortedFilms(this._sort.getCurrentSortType(), 0, FILMS_PER_COUNT), this._onDataChange, this._commentsModel);
      this._showingFilms = this._showingFilms.concat(showingFilms);
      this._showingFilmsCount = showingFilms.length;
      this._renderLoadMoreButton();
      this._statisticComponent.hide();
      this._sort.show();
      this._show();
    }
  }

  _removeFilms() {
    this._showingFilms.forEach((filmController) => {
      if (!this._filmsInAdditionsBlocks.includes(filmController)) {
        filmController.destroy();
      }
    });
    this._showingFilms = [].concat(this._filmsInAdditionsBlocks);
    remove(this._moreButton);
  }
}
