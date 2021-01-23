// import dayjs from "dayjs";
import {POSITION, render, remove} from "../utils/render";
import NoLoadFilmsView from "../view/no-load-films";
import SortingView from "../view/sorting";
import ContentView from "../view/content";
import NavigationView from "../view/navigation";
import LoadMoreButtonView from "../view/load-more";
import renderFilms from "./movie";
import FiltersPresenter from "./filter";
import ExtraBlockPresenter from "./extra-block";

const FILMS_PER_COUNT = 5;

export default class BoardPresenter {
  constructor(container, moviesModel, commentsModel) {
    this._container = container;
    this._navigation = new NavigationView(filters);
    this._sorting = new SortingView();
    this._content = new ContentView();
    this._loadMoreButton = new LoadMoreButtonView();
    this._noFilm = new NoLoadFilmsView();
    this._filtersPresenter = new FiltersPresenter(this._container, moviesModel);
    this._showFilmsPerCount = FILMS_PER_COUNT;
    this._renderLoadMoreButton = this._renderLoadMoreButton.bind(this);
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._films = [];
    this._showFilms = [];
    this._filmsInExtraBlocks = [];
    this._renderSortingFilms = this._renderSortingFilms.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    // this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._updateFilms = this._updateFilms.bind(this);
    this._removeFilms = this._removeFilms.bind(this);
    this._onExtraBlockChange = this._onExtraBlockChange.bind(this);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
    this._moviesModel.setAdditionBlockChangeHandler(this._onAdditionBlockChange);
    this._filmListContainerElement = null;
    this._filmContainerElement = null;
    this._extraBlockPresenter = null;
  }

  render() {
    this._films = this._moviesModel.getFilms();
    this._filtersPresenter.render();

    render(this._container, this._navigation, POSITION.AFTERBEGIN);
    render(this._container, this._sorting, POSITION.BEFOREEND);
    render(this._container, this._content, POSITION.BEFOREEND);

    this._filmsContainer = this._container.querySelector(`.films`);
    this._filmListElement = this._filmsContainer.querySelector(`.films-list`);
    this._filmListContainer = this._container.querySelector(`.films-list__container`);

    // const filmsSortingByRating = this._getFilmsSortingByRating(this._films, 0, FILM_COUNT_ADDITION);
    // const filmsSortingByCommentsCount = this._getFilmsSortingByCommentsCount(this._films, 0, FILM_COUNT_ADDITION);

    if (this._films.length > 0) {
      const showFilms = renderFilms(this._filmListContainer, this._moviesModel.getSortedFilms(this._sorting.getCurrentSortingType(), 0, this._showFilmsPerCount), this._onDataChange, this._commentsModel);
      this._showFilms = this._showFilms.concat(showFilms);
      this._renderLoadMoreButton();
      this._extraBlockPresenter = new ExtraBlockPresenter(this._filmContainerElement, [filmsSortingByRating, filmsSortingByCommentsCount], this._moviesModel, this._onDataChange, this._commentsModel);
      this._extraBlockPresenter.render();
      this._renderExtraBlocks(this._filmsContainer, [filmsSortingByRating, filmsSortingByCommentsCount]);
      this._renderSortingFilms();
    } else {
      this._filmListContainer.remove();
      render(this._filmListElement, this._noLoadFilms, POSITION.BEFOREEND);
    }
  }


  _renderLoadMoreButton() {
    render(this._filmListContainer, this._loadMoreButton, POSITION.AFTEREND);
    this._loadMoreButton.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _handleLoadMoreButtonClick() {
    const sortedFilms = this._getSortedFilms(this._films, this._sorting.getCurrentSortingType(), this._showFilmsCountPerStep, this._showFilmsCountPerStep + FILMS_COUNT_PER_STEP);
    this._showFilmsCountPerStep += FILMS_COUNT_PER_STEP;
    const showFilms = this._renderFilms(this._filmListContainer, sortedFilms);
    this._showFilms = this._showFilms.concat(showFilms);

    if (this._showFilmsCountPerStep >= this._films.length) {
      remove(this._loadMoreButton);
    }
  }


  _renderSortingFilms() {
    this._sortingComponent.setSortingTypeChangeHandler((sortingType) => {
      this._filmListContainer.innerHTML = ``;
      remove(this._loadMoreButtonComponent);
      const showFilms = this._renderFilms(this._filmListContainer, this._getSortedFilms(this._films, sortingType, 0, this._showFilmsCountPerStep));
      this._showFilms = [].concat(showFilms);
      this._showFilms = this._showFilms.concat(this._filmsInExtraBlocks);
      this._renderLoadMoreButton();
    });
  }

  _handleModeChange() {
    Object
      .values(this._MoviePresenter)
      .forEach((presenter) => presenter.resetView());
  }

  //   _onDataChange(oldData, newData) {
  //     const index = this._films.findIndex((film) => film === oldData);
  //     if (index === -1) {
  //       return;
  //     }

  //     const filmControllers = this._showFilms.filter((filmController) => filmController.film === oldData);
  //     this._films[index] = newData;

  //     filmControllers.forEach((filmController) => filmController.render(newData));
  //     remove(this._navigationComponent);
  //     this._navigationComponent = new NavigationView(generateFilters(this._films));
  //     render(this._containerComponent, this._navigationComponent, POSITION.AFTERBEGIN);
  //   }

  //   _onViewChange() {
  //     this._showFilms.forEach((filmController) => filmController.setToDefaultView());
}
