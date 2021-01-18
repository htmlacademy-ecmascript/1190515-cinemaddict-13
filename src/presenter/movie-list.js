import {sortingByDesc} from "../utils/common";
import {POSITION, render, createElement, remove} from "../utils/render";
import Movie from "./movie";
// import generateFilms from "./mock/card-film";
import {NoLoadFilms, getNoFilmsText} from "../components/no-film";
import AdditionBlockView from "../view/add-card-block";
import NavigationView from "../view/navigation";
import {SortingView, SORT_DATA_TYPE} from "../view/sorting";
import ContentView from "../view/content";
import ShowMoreCardView from "../view/show-more";

// const FILM_COUNT = 17;
const FILMS_PER_COUNT = 5;
const FILM_COUNT_ADDITION = 2;
// const siteBodyElement = document.querySelector(`body`);
// const footerContainer = document.querySelector(`.footer`);
const ADDITION_CONTAINER_TITLES = [`Top rated`, `Most commented`];

// const films = generateFilms(FILM_COUNT);

const renderAdditionBlocks = (filmsContainer, filmsSortingByRating, filmsSortingByComments) => {
  for (let i = 0; i < FILM_COUNT_ADDITION; i++) {
    render(filmsContainer, new AdditionBlockView().getElement(), POSITION.BEFOREEND);
    const extraContainerElements = filmsContainer.querySelectorAll(`.films-list--extra`);
    const firstextra = extraContainerElements[0];
    const secondextra = extraContainerElements[1];
    const cards = ADDITION_CONTAINER_TITLES[i] === ADDITION_CONTAINER_TITLES[0] ? filmsSortingByRating : filmsSortingByComments;

    if (ADDITION_CONTAINER_TITLES[i] === ADDITION_CONTAINER_TITLES[0] && cards[0].rating > 0) {
      firstextra.querySelector(`.films-list__title`).textContent = ADDITION_CONTAINER_TITLES[i];
      cards.forEach((card) => {
        renderFilms(firstextra.querySelector(`.films-list__container`), card, POSITION.BEFOREEND);
      });
    } else if (ADDITION_CONTAINER_TITLES[i] === ADDITION_CONTAINER_TITLES[1] && cards[0].comments.length > 0) {
      secondextra.querySelector(`.films-list__title`).textContent = ADDITION_CONTAINER_TITLES[i];
      cards.forEach((card) => {
        renderFilms(secondextra.querySelector(`.films-list__container`), card, POSITION.BEFOREEND);
      });
    }
  }
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
    this._moreButton = new ShowMoreCardView();
    this._noFilm = new NoLoadFilms();
  }

  render(films) {
    render(this._container, this._navigation, POSITION.AFTERBEGIN);
    render(this._container, this._sorting, POSITION.BEFOREEND);
    render(this._container, this._content, POSITION.BEFOREEND);

    const filmsContainer = this._container.querySelector(`.films`);
    const filmListContainer = this._container.querySelector(`.films-list__container`);

    const filmsSortingByRating = getFilmsSortingByRating(films, 0, FILM_COUNT_ADDITION);
    const filmsSortingByComments = getFilmsSortingByComments(films, 0, FILM_COUNT_ADDITION);

    const renderLoadMoreButton = (showingFilmsPerCount) => {
      render(filmListContainer, this._moreButton, POSITION.AFTEREND);
      this._moreButton.setClickHandler(() => {
        const prevFilmsCount = showingFilmsPerCount;
        showingFilmsPerCount = showingFilmsPerCount + FILMS_PER_COUNT;

        const sortedFilms = getSortedFilms(films, this._sort.getCurrentSortType(), prevFilmsCount, showingFilmsPerCount);
        renderFilms(filmListContainer, sortedFilms);
        if (showingFilmsPerCount >= films.length) {
          remove(this._moreButton);
        }
      });
    };

    let showingFilmsPerCount = FILMS_PER_COUNT;
    if (films.length > 0) {
      renderFilms(filmListContainer, getSortedFilms(films, this._sort.getCurrentSortType(), 0, showingFilmsPerCount));
      renderLoadMoreButton(showingFilmsPerCount);
      renderAdditionBlocks(filmsContainer, filmsSortingByRating, filmsSortingByComments);

      this._sort.setSortTypeChangeHandler((sortType) => {
        showingFilmsPerCount = FILMS_PER_COUNT;
        filmListContainer.innerHTML = ``;
        remove(this._moreButton);
        renderFilms(filmListContainer, getSortedFilms(films, sortType, 0, showingFilmsPerCount));
        renderLoadMoreButton(showingFilmsPerCount);
      });
    } else {
      filmListContainer.remove();
      render(filmsContainer.querySelector(`.films-list`), createElement(getNoFilmsText()), POSITION.BEFOREEND);
    }
  }
}
