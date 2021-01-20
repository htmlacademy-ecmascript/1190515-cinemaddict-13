import dayjs from "dayjs";
import {sortingByDesc} from "../utils/common";
import {POSITION, render, remove} from "../utils/render";
import Movie from "./movie";
import NoLoadFilms from "../view/no-load-films";
import AdditionBlockView from "../view/add-card-block";
import generateFilters from "../mock/filters";
import NavigationView from "../view/navigation";
import {SortingView, SORTING_DATA_TYPE} from "../view/sorting";
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
    this._onViewChange = this._onViewChange.bind(this);
    this._renderSortingFilms = this._renderSortingFilms.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._films = [];
    this._showFilms = [];
    this._filmsInExtraBlocks = [];
  }

  render(films) {
    this._films = films;
    render(this._containerComponent, this._navigationComponent, POSITION.AFTERBEGIN);
    render(this._containerComponent, this._sortingComponent, POSITION.BEFOREEND);
    render(this._containerComponent, this._contentComponent, POSITION.BEFOREEND);

    const filmsContainer = this._containerComponent.querySelector(`.films`);
    const filmListElement = filmsContainer.querySelector(`.films-list`);
    const filmListContainer = this._containerComponent.querySelector(`.films-list__container`);

    const filmsSortingByRating = this._getFilmsSortingByRating(this._films, 0, FILM_COUNT_ADDITION);
    const filmsSortingByComments = this._getFilmsSortingByCommentsCount(this._films, 0, FILM_COUNT_ADDITION);

    if (this._films.length > 0) {
      const showFilms = this._renderFilms(filmListContainer, this._getSortedFilms(this._films, this._sortingComponent.getCurrentSortingType(), 0, this._showFilmsCountPerStep), this._onDataChange);
      this._showFilms = this._showFilms.concat(showFilms);
      this._renderLoadMoreButton();
      this._renderAdditionBlocks(filmsContainer, [filmsSortingByRating, filmsSortingByComments], this._onDataChange);
      this._renderSortingFilms();
    } else {
      filmListContainer.remove();
      render(filmListElement, this._noLoadFilmsComponent, POSITION.BEFOREEND);
    }
  }

  _renderFilms(container, films, onDataChange) {
    return films.map((film) => {
      const filmsController = new Movie(container, onDataChange);
      filmsController.render(film);
    });
  }

  _renderLoadMoreButton() {
    const filmListContainer = this._containerComponent.querySelector(`.films-list__container`);
    render(filmListContainer, this._loadMoreButtonComponent, POSITION.AFTEREND);
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _handleLoadMoreButtonClick() {
    const filmListContainer = this._containerComponent.querySelector(`.films-list__container`);
    const sortedFilms = this._getSortedFilms(this._films, this._sortingComponent.getCurrentSortingType(), this._showFilmsCountPerStep, this._showFilmsCountPerStep + FILMS_COUNT_PER_STEP);
    this._showFilmsCountPerStep += FILMS_COUNT_PER_STEP;
    const showFilms = this._renderFilms(filmListContainer, sortedFilms, this._onDataChange);
    this._showFilms = this._showFilms.concat(showFilms);

    if (this._showFilmsCountPerStep >= this._films.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _getSortedFilms(films, sortingType, from, to) {
    let sortedFilms = [];
    const showFilms = films.slice();
    switch (sortingType) {
      case SORTING_DATA_TYPE.DATE:
        sortedFilms = showFilms.sort((a, b) => {
          const bDate = dayjs(b.details.find((detail) => detail.term === `Release Date`).info);
          const aDate = dayjs(a.details.find((detail) => detail.term === `Release Date`).info);
          return bDate - aDate;
        }).slice(from, to);
        break;
      case SORTING_DATA_TYPE.RATING:
        sortedFilms = this._getFilmsSortingByRating(showFilms, from, to);
        break;
      case SORTING_DATA_TYPE.DEFAULT:
        sortedFilms = showFilms.slice(from, to);
        break;
    }
    return sortedFilms;
  }

  _getFilmsSortingByRating(films, from, to) {
    return films.slice().sort((a, b) => {
      return sortingByDesc(a.rating, b.rating);
    }).slice(from, to);
  }

  _getFilmsSortingByCommentsCount(films, from, to) {
    return films.slice().sort((a, b) => {
      return sortingByDesc(a.comments.length, b.comments.length);
    }).slice(from, to);
  }

  _renderAdditionBlocks(filmsContainer, data, onDataChange) {
    for (let i = 0; i < FILM_COUNT_ADDITION; i++) {
      render(filmsContainer, new AdditionBlockView(), POSITION.BEFOREEND);
      const extraContainers = filmsContainer.querySelectorAll(`.films-list--extra`)[i];
      const extraContainerFilmList = extraContainers.querySelector(`.films-list__container`);
      extraContainers.querySelector(`.films-list__title`).textContent = ADDITION_CONTAINER_TITLES[i];
      render(extraContainerFilmList, this._renderFilms(extraContainerFilmList, data[i], onDataChange), POSITION.BEFOREEND);
    }
  }

  _renderSortingFilms() {
    this._sortingComponent.setSortingTypeChangeHandler((sortingType) => {
      const filmListContainer = this._containerComponent.querySelector(`.films-list__container`);
      filmListContainer.innerHTML = ``;
      remove(this._loadMoreButtonComponent);
      const showFilms = this._renderFilms(filmListContainer, this._getSortedFilms(this._films, sortingType, 0, this._showFilmsCountPerStep), this._onDataChange);
      this._showFilms = [].concat(showFilms);
      this._showFilms = this._showFilms.concat(this._filmsInExtraBlocks);
      this._renderLoadMoreButton();
    });
  }

  _onDataChange(oldData, newData) {
    const index = this._films.findIndex((film) => film === oldData);
    if (index === -1) {
      return;
    }

    const filmControllers = this._showFilms.filter((filmController) => filmController.film === oldData);
    this._films[index] = newData;

    filmControllers.forEach((filmController) => filmController.render(newData));
    remove(this._navigationComponent);
    this._navigationComponent = new NavigationView(generateFilters(this._films));
    render(this._containerComponent, this._navigationComponent, POSITION.AFTERBEGIN);
  }

  _onViewChange() {
    this._showFilms.forEach((filmController) => filmController.setToDefaultView());
  }
}
