// import dayjs from "dayjs";
import {POSITION, render, remove} from "../utils/render";
import MoviePresenter from "./movie";
import NoLoadFilms from "../view/no-load-films";
import AddExtraBlockView from "../view/add-extra-block";
// import generateFilters from "../mock/filters";
import NavigationView from "../view/navigation";
import {SortingView} from "../view/sorting";
import ContentView from "../view/content";
import LoadMoreButtonView from "../view/load-more";

const FILMS_COUNT_PER_STEP = 5;
const FILM_COUNT_ADDITION = 2;
const ADDITION_CONTAINER_TITLES = [`Top rated`, `Most commented`];

export default class Board {
  constructor(container, filters, films) {
    this._containerComponent = container;
    this._navigationComponent = new NavigationView(filters);
    this._sortingComponent = new SortingView();
    this._contentComponent = new ContentView(films);
    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._noLoadFilmsComponent = new NoLoadFilms();
    this._showFilmsCountPerStep = FILMS_COUNT_PER_STEP;
    // this._onViewChange = this._onViewChange.bind(this);
    this._renderSortingFilms = this._renderSortingFilms.bind(this);
    // this._onDataChange = this._onDataChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._films = [];
    this._showFilms = [];
    this._filmsInExtraBlocks = [];
    this._filmsContainer = null;
    this._filmListElement = null;
    this._filmListContainer = null;
    this._MoviePresenter = {};
  }

  render(films) {
    this._films = films;
    render(this._containerComponent, this._navigationComponent, POSITION.AFTERBEGIN);
    render(this._containerComponent, this._sortingComponent, POSITION.BEFOREEND);
    render(this._containerComponent, this._contentComponent, POSITION.BEFOREEND);

    this._filmsContainer = this._containerComponent.querySelector(`.films`);
    this._filmListElement = this._filmsContainer.querySelector(`.films-list`);
    this._filmListContainer = this._containerComponent.querySelector(`.films-list__container`);

    const filmsSortingByRating = this._getFilmsSortingByRating(this._films, 0, FILM_COUNT_ADDITION);
    const filmsSortingByCommentsCount = this._getFilmsSortingByCommentsCount(this._films, 0, FILM_COUNT_ADDITION);

    if (this._films.length > 0) {
      const showFilms = this._renderFilms(this._filmListContainer, this._getSortedFilms(this._films, this._sortingComponent.getCurrentSortingType(), 0, this._showFilmsCountPerStep), this._onDataChange);
      this._showFilms = this._showFilms.concat(showFilms);
      this._renderLoadMoreButton();
      this._renderExtraBlocks(this._filmsContainer, [filmsSortingByRating, filmsSortingByCommentsCount]);
      this._renderSortingFilms();
    } else {
      this._filmListContainer.remove();
      render(this._filmListElement, this._noLoadFilmsComponent, POSITION.BEFOREEND);
    }
  }

  _renderFilms(container, films) {
    return films.map((film) => {
      const moviePresenter = new MoviePresenter(container, this._handleModeChange);
      moviePresenter.render(film);
    });
  }

  _renderLoadMoreButton() {
    render(this._filmListContainer, this._loadMoreButtonComponent, POSITION.AFTEREND);
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _handleLoadMoreButtonClick() {
    const sortedFilms = this._getSortedFilms(this._films, this._sortingComponent.getCurrentSortingType(), this._showFilmsCountPerStep, this._showFilmsCountPerStep + FILMS_COUNT_PER_STEP);
    this._showFilmsCountPerStep += FILMS_COUNT_PER_STEP;
    const showFilms = this._renderFilms(this._filmListContainer, sortedFilms);
    this._showFilms = this._showFilms.concat(showFilms);

    if (this._showFilmsCountPerStep >= this._films.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderExtraBlocks(filmsContainer, data) {
    for (let i = 0; i < FILM_COUNT_ADDITION; i++) {
      render(this._filmsContainer, new AddExtraBlockView(), POSITION.BEFOREEND);
      const extraContainers = this._filmsContainer.querySelectorAll(`.films-list--extra`)[i];
      const extraContainerFilmList = extraContainers.querySelector(`.films-list__container`);
      extraContainers.querySelector(`.films-list__title`).textContent = ADDITION_CONTAINER_TITLES[i];
      render(extraContainerFilmList, this._renderFilms(extraContainerFilmList, data[i]), POSITION.BEFOREEND);
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
