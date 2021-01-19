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

const FILMS_PER_COUNT = 5;
const FILM_COUNT_ADDITION = 2;
const ADDITION_CONTAINER_TITLES = [`Top rated`, `Most commented`];

export default class Board {
  constructor(container, filters, films) {
    this._container = container;
    this._navigation = new NavigationView(filters);
    this._sorting = new SortingView();
    this._content = new ContentView(films);
    this._loadMoreButton = new LoadMoreButtonView();
    this._noLoadFilms = new NoLoadFilms();
    this._showingFilmsPerCount = FILMS_PER_COUNT;
    this._renderLoadMoreButton = this._renderLoadMoreButton.bind(this);
    this._films = [];
    this._renderSortingFilms = this._renderSortingFilms.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._showingFilms = [];
    this._filmsInAdditionsBlocks = [];
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(films) {
    this._films = films;
    render(this._container, this._navigation, POSITION.AFTERBEGIN);
    render(this._container, this._sorting, POSITION.BEFOREEND);
    render(this._container, this._content, POSITION.BEFOREEND);

    const filmsContainer = this._container.querySelector(`.films`);
    const filmListContainer = this._container.querySelector(`.films-list__container`);

    const filmsSortingByRating = this._getFilmsSortingByRating(this._films, 0, FILM_COUNT_ADDITION);
    const filmsSortingByComments = this._getFilmsSortingByComments(this._films, 0, FILM_COUNT_ADDITION);

    if (this._films.length > 0) {
      const showingFilms = this._renderFilms(filmListContainer, this._getSortedFilms(this._films, this._sorting.getCurrentSortingType(), 0, this._showingFilmsPerCount), this._onDataChange);
      this._showingFilms = this._showingFilms.concat(showingFilms);
      this._renderLoadMoreButton();
      this._renderAdditionBlocks(filmsContainer, [filmsSortingByRating, filmsSortingByComments], this._onDataChange);
      this._renderSortingFilms();
    } else {
      filmListContainer.remove();
      render(filmsContainer.querySelector(`.films-list`), this._noLoadFilm, POSITION.BEFOREEND);
    }
  }

  _renderFilms(container, films, onDataChange) {
    return films.map((film) => {
      const filmController = new Movie(container, onDataChange);
      filmController.render(film);
    });
  }

  _renderLoadMoreButton() {
    const filmListContainer = this._container.querySelector(`.films-list__container`);
    render(filmListContainer, this._loadMoreButton, POSITION.AFTEREND);
    this._loadMoreButton.setClickHandler(() => {
      const prevFilmsCount = this._showingFilmsPerCount;
      this._showingFilmsPerCount = this._showingFilmsPerCount + FILMS_PER_COUNT;

      const sortedFilms = this._getSortedFilms(this._films, this._sorting.getCurrentSortingType(), prevFilmsCount, this._showingFilmsPerCount);
      const showingFilms = this._renderFilms(filmListContainer, sortedFilms, this._onDataChange);
      this._showingFilms = this._showingFilms.concat(showingFilms);

      if (this._showingFilmsPerCount >= this._films.length) {
        remove(this._loadMoreButton);
      }
    });
  }

  _getSortedFilms(films, sortingType, from, to) {
    let sortedFilms = [];
    const showingFilms = films.slice();
    switch (sortingType) {
      case SORTING_DATA_TYPE.DATE:
        sortedFilms = showingFilms.sort((a, b) => {
          const bDate = dayjs(b.details.find((detail) => detail.term === `Release Date`).info);
          const aDate = dayjs(a.details.find((detail) => detail.term === `Release Date`).info);
          return bDate - aDate;
        }).slice(from, to);
        break;
      case SORTING_DATA_TYPE.RATING:
        sortedFilms = this._getFilmsSortingByRating(showingFilms, from, to);
        break;
      case SORTING_DATA_TYPE.DEFAULT:
        sortedFilms = showingFilms.slice(from, to);
        break;
    }
    return sortedFilms;
  }

  _getFilmsSortingByRating(films, from, to) {
    return films.slice().sort((a, b) => {
      return sortingByDesc(a.rating, b.rating);
    }).slice(from, to);
  }

  _getFilmsSortingByComments(films, from, to) {
    return films.slice().sort((a, b) => {
      return sortingByDesc(a.comments.length, b.comments.length);
    }).slice(from, to);
  }

  _renderAdditionBlocks(filmsContainer, data, onDataChange) {
    for (let i = 0; i < FILM_COUNT_ADDITION; i++) {
      render(filmsContainer, new AdditionBlockView(), POSITION.BEFOREEND);

      const extraContainers = filmsContainer.querySelectorAll(`.films-list--extra`)[i];

      extraContainers.querySelector(`.films-list__title`).textContent = ADDITION_CONTAINER_TITLES[i];

      const additionContainerFilmList = extraContainers.querySelector(`.films-list__container`);

      render(additionContainerFilmList, this._renderFilms(additionContainerFilmList, data[i], onDataChange), POSITION.BEFOREEND);
    }
  }

  _renderSortingFilms() {
    this._sorting.setSortingTypeChangeHandler((sortingType) => {
      const filmListContainer = this._container.querySelector(`.films-list__container`);
      this._showingFilmsPerCount = FILMS_PER_COUNT;
      filmListContainer.innerHTML = ``;
      remove(this._loadMoreButton);
      const showingFilms = this._renderFilms(filmListContainer, this._getSortedFilms(this._films, sortingType, 0, this._showingFilmsPerCount), this._onDataChange);
      this._showingFilms = [].concat(showingFilms);
      this._showingFilms = this._showingFilms.concat(this._filmsInAdditionsBlocks);
      this._renderLoadMoreButton();
    });
  }

  _onDataChange(oldData, newData) {
    const index = this._films.findIndex((film) => film === oldData);
    if (index === -1) {
      return;
    }

    const filmControllers = this._showingFilms.filter((filmController) => filmController.film === oldData);
    this._films[index] = newData;

    filmControllers.forEach((filmController) => filmController.render(newData));
    remove(this._navigation);
    this._navigation = new NavigationView(generateFilters(this._films));
    render(this._container, this._navigation, POSITION.AFTERBEGIN);
  }

  _onViewChange() {
    this._showingFilms.forEach((filmController) => filmController.setToDefaultView());
  }
}
