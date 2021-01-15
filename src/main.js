import {sortingByDesc} from "./utils/common";
import {POSITION, render, createElement, toggleElement, remove} from "./utils/render";
// import AbstractComponent from "./abstract-component";
import Keydown from "./const";

import generateFilms from "./mock/card-film";
import generateFilters from "./mock/filter";
import generateUserRank from "./mock/user-rank";

// import FooterStatisticsView from "./view/footer-statistic";
import AdditionBlockView from "./view/add-card-block";
import ProfileView from "./view/profile";
import NavigationView from "./view/navigation";
import SortingView from "./view/sorting";
import ContentView from "./view/content";
import FilmView from "./view/card";
import ShowMoreCardView from "./view/show-more";
import FilmDetailsView from "./view/detail-card";

const FILM_COUNT = 17;
const FILMS_PER_COUNT = 5;
const FILM_COUNT_ADDITION = 2;
const siteBodyElement = document.querySelector(`body`);
const headerContainer = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
const footerContainer = document.querySelector(`.footer`);
const ADDITION_CONTAINER_TITLES = [`Top rated`, `Most commented`];
const NO_FILMS_TEXT = `There are no movies in our database`;

const films = generateFilms(FILM_COUNT);
const filters = generateFilters(films);

const getNoFilmsText = () => {
  return `<h2 class="films-list__title">${NO_FILMS_TEXT}</h2>`;
};

const renderFilm = (filmsContainer, film) => {
  const filmComponent = new FilmView(film);
  const filmDetailsComponent = new FilmDetailsView(film);

  const closeFilmDetails = () => {
    toggleElement(footerContainer, filmDetailsComponent, `hide`);
    document.removeEventListener(`keydown`, onEscapeKeyPress);
  };

  const onClickCardElement = () => {
    siteBodyElement.classList.add(`hide-overflow`);
    toggleElement(footerContainer, filmDetailsComponent, `show`);
    document.addEventListener(`keydown`, onEscapeKeyPress);
    filmDetailsComponent.setCloseClickHandler(onClickCloseButton);
  };

  const onClickCloseButton = () => {
    filmDetailsComponent.removeCloseClickHandler(onClickCloseButton);
    siteBodyElement.classList.remove(`hide-overflow`);
    closeFilmDetails();
  };

  const onEscapeKeyPress = (evt) => {
    if (evt.key === Keydown.ESC) {
      evt.preventDefault();
      siteBodyElement.classList.remove(`hide-overflow`);
      closeFilmDetails();
    }
  };

  filmComponent.setClickHandler(onClickCardElement);

  render(filmsContainer, filmComponent, POSITION.BEFOREEND);
};

const renderAdditionBlocks = (filmsContainer, filmsSortingByRating, filmsSortingByCommentsCount) => {
  for (let i = 0; i < FILM_COUNT_ADDITION; i++) {
    render(filmsContainer, new AdditionBlockView().getElement(), POSITION.BEFOREEND);
    const extraContainerElements = filmsContainer.querySelectorAll(`.films-list--extra`);
    const firstextra = extraContainerElements[0];
    const secondextra = extraContainerElements[1];
    const cards = ADDITION_CONTAINER_TITLES[i] === ADDITION_CONTAINER_TITLES[0] ? filmsSortingByRating : filmsSortingByCommentsCount;

    if (ADDITION_CONTAINER_TITLES[i] === ADDITION_CONTAINER_TITLES[0] && cards[0].rating > 0) {
      firstextra.querySelector(`.films-list__title`).textContent = ADDITION_CONTAINER_TITLES[i];
      cards.slice(0, FILM_COUNT_ADDITION).forEach((card) => {
        renderFilm(firstextra.querySelector(`.films-list__container`), card, POSITION.BEFOREEND);
      });
    } else if (ADDITION_CONTAINER_TITLES[i] === ADDITION_CONTAINER_TITLES[1] && cards[0].comments.length > 0) {
      secondextra.querySelector(`.films-list__title`).textContent = ADDITION_CONTAINER_TITLES[i];
      cards.slice(0, FILM_COUNT_ADDITION).forEach((card) => {
        renderFilm(secondextra.querySelector(`.films-list__container`), card, POSITION.BEFOREEND);
      });
    }
  }
};

const userRankLabel = generateUserRank(films);

render(headerContainer, new ProfileView(userRankLabel), POSITION.BEFOREEND);
render(mainContainer, new NavigationView(filters), POSITION.BEFOREEND);
render(mainContainer, new SortingView(), POSITION.BEFOREEND);
render(mainContainer, new ContentView(), POSITION.BEFOREEND);

const filmsContainer = mainContainer.querySelector(`.films`);
const filmListContainer = mainContainer.querySelector(`.films-list__container`);

const filmsSortingByRating = films.slice().sort((a, b) => {
  return sortingByDesc(a.rating, b.rating);
});

const filmsSortingByCommentsCount = films.slice().sort((a, b) => {
  return sortingByDesc(a.comments.length, b.comments.length);
});

let showingFilmsCount = FILMS_PER_COUNT;

if (films.length > 0) {
  films.slice(0, showingFilmsCount).forEach((film) => {
    renderFilm(filmListContainer, film);
  });

  const showMoreButton = new ShowMoreCardView();

  render(filmListContainer, showMoreButton, POSITION.AFTEREND);
  renderAdditionBlocks(filmsContainer, filmsSortingByRating, filmsSortingByCommentsCount);

  showMoreButton.setClickHandler(() => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + FILMS_PER_COUNT;

    films.slice(prevFilmsCount, showingFilmsCount).forEach((film) => {
      renderFilm(filmListContainer, film, POSITION.BEFOREEND);
    });

    if (showingFilmsCount >= films.length) {
      remove(showMoreButton);
    }
  });
} else {
  filmListContainer.remove();
  render(filmsContainer.querySelector(`.films-list`), createElement(getNoFilmsText()), POSITION.BEFOREEND);
}
footerContainer.querySelector(`.footer__statistics`).textContent = `${films.length} movies inside`;
// const FooterStatisticsComponent = new FooterStatisticsView();
// const statisticsContainer = document.querySelector(`.footer__statistics`);
// render(statisticsContainer, FooterStatisticsComponent.getElement(), POSITION.BEFOREEND);


