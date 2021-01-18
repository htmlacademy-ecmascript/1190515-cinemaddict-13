import {sortingByDesc} from "../utils/common";
import {POSITION, render, remove} from "../utils/render";
import Movie from "./movie";
import NoLoadFilms from "../view/no-load-films";
import AdditionBlockView from "../view/add-card-block";
import generateFilters from "../mock/filters";
import NavigationView from "../view/navigation";
import {SortingView, SORT_DATA_TYPE} from "../view/sorting";
import ContentView from "../view/content";
import LoadMoreButtonView from "../view/load-more";

const FILMS_PER_COUNT = 5;
const FILM_COUNT_ADDITION = 2;
const ADDITION_CONTAINER_TITLES = [`Top rated`, `Most commented`];

const renderAdditionBlocks = (filmsContainer, filmsSortingByRating, filmsSortingByComments, onDataChange) => {
  let showingFilms = [];
  for (let i = 0; i < FILM_COUNT_ADDITION; i++) {
    render(filmsContainer, new AdditionBlockView(), POSITION.BEFOREEND);
    const extraContainers = filmsContainer.querySelectorAll(`.films-list--extra`);
    const additionContainer = extraContainers[extraContainers.length - 1];
    // const secondextra = extraContainerElements[1];
    const additionContainerTitle = additionContainer.querySelector(`.films-list__title`);
    const additionContainerFilmList = additionContainer.querySelector(`.films-list__container`);
    const films = ADDITION_CONTAINER_TITLES[i] === ADDITION_CONTAINER_TITLES[0] ? filmsSortingByRating : filmsSortingByComments;

    if (ADDITION_CONTAINER_TITLES[i] === ADDITION_CONTAINER_TITLES[0] && films[0].rating > 0) {
      additionContainerTitle.textContent = ADDITION_CONTAINER_TITLES[i];
      showingFilms = showingFilms.concat(renderFilms(additionContainerFilmList, films, onDataChange));
    } else if (ADDITION_CONTAINER_TITLES[i] === ADDITION_CONTAINER_TITLES[1] && films[0].comments.length > 0) {
      additionContainerTitle.textContent = ADDITION_CONTAINER_TITLES[i];
      showingFilms = showingFilms.concat(renderFilms(additionContainerFilmList, films, onDataChange));
    }
  }
  return showingFilms;
};

const getFilmsSortingByRating = (films, from, to) => {
  return films.slice().sort((a, b) => {
    return sortingByDesc(a.rating, b.rating);
  }).slice(from, to);
};

const getFilmsSortingByComments = (films, from, to) => {
  return films.slice().sort((a, b) => {
    return sortingByDesc(a.comments.length, b.comments.length);
  }).slice(from, to);
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();
  switch (sortType) {
    case SORT_DATA_TYPE.DATE:
      sortedFilms = showingFilms.sort((a, b) => {
        const bDate = new Date(b.details.find((detail) => detail.term === `Release Date`).info);
        const aDate = new Date(a.details.find((detail) => detail.term === `Release Date`).info);
        return bDate - aDate;
      }).slice(from, to);
      break;
    case SORT_DATA_TYPE.RATING:
      sortedFilms = getFilmsSortingByRating(showingFilms, from, to);
      break;
    case SORT_DATA_TYPE.DEFAULT:
      sortedFilms = showingFilms.slice(from, to);
      break;
  }
  return sortedFilms;
};
const renderFilms = (container, films, onDataChange) => {
  return films.map((film) => {
    const filmController = new Movie(container, onDataChange);
    filmController.render(film);
    return filmController;
  });
};

export default class Board {
  constructor(container, filters, films) {
    this._container = container;
    this._navigation = new NavigationView(filters);
    this._sorting = new SortingView();
    this._content = new ContentView(films);
    this._loadMoreButton = new LoadMoreButtonView();
    this._noLoadFilm = new NoLoadFilms();
    this._showingFilmsCount = FILMS_PER_COUNT;
    this._renderLoadMoreButton = this._renderLoadMoreButton.bind(this);
    this._films = [];
    this._renderSortingFilms = this._renderSortingFilms.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._showingFilmsPerCount = [];
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

    const filmsSortingByRating = getFilmsSortingByRating(this._films, 0, FILM_COUNT_ADDITION);
    const filmsSortingByComments = getFilmsSortingByComments(this._films, 0, FILM_COUNT_ADDITION);

    if (this._films.length > 0) {
      const showingFilms = renderFilms(filmListContainer, getSortedFilms(this._films, this._sort.getCurrentSortType(), 0, this._showingFilmsCount), this._onDataChange);
      this._showingFilms = this._showingFilms.concat(showingFilms);
      this._renderLoadMoreButton();
      this._filmsInAdditionsBlocks = renderAdditionBlocks(filmsContainer, filmsSortingByRating, filmsSortingByComments, this._onDataChange);
      this._showingFilms = this._showingFilms.concat(this._filmsInAdditionsBlocks);
      this._renderSortingFilms();
    } else {
      filmListContainer.remove();
      render(filmsContainer.querySelector(`.films-list`), this._noLoadFilm, POSITION.BEFOREEND);
    }
  }
  _renderLoadMoreButton() {
    const filmListContainer = this._container.querySelector(`.films-list__container`);
    render(filmListContainer, this._loadMoreButton, POSITION.AFTEREND);
    this._loadMoreButton.setClickHandler(() => {
      const prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + FILMS_PER_COUNT;

      const sortedFilms = getSortedFilms(this._films, this._sort.getCurrentSortType(), prevFilmsCount, this._showingFilmsCount);
      const showingFilms = renderFilms(filmListContainer, sortedFilms, this._onDataChange);
      this._showingFilms = this._showingFilms.concat(showingFilms);
      renderFilms(filmListContainer, sortedFilms);
      if (this._showingFilmsCount >= this._films.length) {
        remove(this._loadMoreButton);
      }
    });
  }

  _renderSortingFilms() {
    this._sort.setSortTypeChangeHandler((sortType) => {
      const filmListContainer = this._container.querySelector(`.films-list__container`);
      this._showingFilmsCount = FILMS_PER_COUNT;
      filmListContainer.innerHTML = ``;
      remove(this._loadMoreButton);
      const showingFilms = renderFilms(filmListContainer, getSortedFilms(this._films, sortType, 0, this._showingFilmsCount), this._onDataChange);
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
