import {POSITION, remove, render} from "../utils/render";
import LoadMoreButton from "../view/load-more";
import NoLoadFilms from "../view/no-load-films";
import Sort from "../view/sort";
import Content from "../view/content";
import {renderFilms} from "./movie";
import Filter, {FilterTypes} from "./filter";
import ExtraBlock from "./extra-block";
import Statistic from "../view/statistic";

const FILM_PAGE_COUNT = 5;

export default class Board {
  constructor(container, moviesModel, commentsModel) {
    this._container = container;
    this._sort = new Sort();
    this._contentBlock = new Content();
    this._moreButton = new LoadMoreButton();
    this._noFilm = new NoLoadFilms();
    this._showingFilmsCount = FILM_PAGE_COUNT;
    this._renderLoadMoreButton = this._renderLoadMoreButton.bind(this);
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._films = [];
    this._renderSortFilms = this._renderSortFilms.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._showingFilms = [];
    this._filmsInAdditionsBlocks = [];
    this._onViewChange = this._onViewChange.bind(this);
    this._filtersController = new Filter(this._container, moviesModel);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._updateFilms = this._updateFilms.bind(this);
    this._removeFilms = this._removeFilms.bind(this);
    this._onAdditionBlockChange = this._onAdditionBlockChange.bind(this);
    this._moviesModel.setFilterChangeHandlers(this._onFilterChange);
    this._moviesModel.setAdditionBlockChangeHandler(this._onAdditionBlockChange);
    this._filmListContainerElement = null;
    this._filmContainerElement = null;
    this._additionBlockController = null;
    this._statisticComponent = new Statistic(moviesModel);
    this._statisticComponent.hide();
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
      this._additionBlockController = new ExtraBlock(this._filmContainerElement, this._moviesModel, this._onDataChange, this._commentsModel);
      this._additionBlockController.render();
      this._filmsInAdditionsBlocks = this._additionBlockController.showingFilms;
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
      this._showingFilmsCount = this._showingFilmsCount + FILM_PAGE_COUNT;

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
      this._showingFilmsCount = FILM_PAGE_COUNT;
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

    const filmPresenters = this._showingFilms.filter((filmPresenter) => filmPresenter.film === oldData);

    filmPresenters.forEach((filmPresenter) => filmPresenter.render(newData));
    this._filtersController.render();
    this._updateFilms();
    this._statisticComponent.rerender();
  }

  _onAdditionBlockChange() {
    this._filmsInAdditionsBlocks = this._additionBlockController.showingFilms;
    this._showingFilms = this._showingFilms.concat(this._filmsInAdditionsBlocks);
  }

  _onViewChange() {
    this._showingFilms.forEach((filmPresenter) => filmPresenter.setDefaultView());
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
      const showingFilms = renderFilms(this._filmListContainerElement, this._moviesModel.getSortedFilms(this._sort.getCurrentSortType(), 0, FILM_PAGE_COUNT), this._onDataChange, this._commentsModel);
      this._showingFilms = this._showingFilms.concat(showingFilms);
      this._showingFilmsCount = showingFilms.length;
      this._renderLoadMoreButton();
      this._statisticComponent.hide();
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
    remove(this._moreButton);
  }
}
