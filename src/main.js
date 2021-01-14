import {POSITION, renderElement} from "./utils";
import {Keydown} from "./const";

import {generateFilms} from "./mock/card-film";
import {generateFilters} from "./mock/filter";
import {generateUserRank} from "./mock/user-rank";
// import {generateComments} from "./mock/comments";

import UserRankView from "./view/user-status";
import NavigationView from "./view/navigation";
import SortingView from "./view/sorting";
import ContentView from "./view/conent";
// import FilmsListView from "./view/films-list";
import FilmView from "./view/card-film";
import ShowMoreCardView from "./view/show-more-button";
// import FooterStatisticsView from "./view/footer-statistics";
import FilmDetailsView from "./view/detail-film";

const FILM_COUNT = 17;
const FILM_COUNT_ADDITION = 5;
const ADDITION_CONTAINER_TITLES = [`Top rated`, `Most commented`];
const NO_FILMS_TEXT = `There are no movies in our database`;
// const statisticsContainer = document.querySelector(`.footer__statistics`);

const films = generateFilms(FILM_COUNT);
const filters = generateFilters(films);
const userRankLabel = generateUserRank(films);

const siteBodyElement = document.querySelector(`body`);

// const footerStatisticsComponent = new FooterStatisticsView(films.length);

const getNoFilmsText = () => {
  return `<h2 class="films-list__title">${NO_FILMS_TEXT}</h2>`;
};

const headerElement = document.querySelector(`.header`);
const mainContainerElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const filmContainerElement = mainContainerElement.querySelector(`.films`);
const filmListContainerElement = mainContainerElement.querySelector(`.films-list__container`);


const renderFilm = (filmContainerElement, film) => {
  const filmComponent = new FilmView(film);
  const filmElement = filmComponent.getElement();
  const filmPosterElement = filmElement.querySelector(`.film-card__poster`);
  const filmTitleElement = filmElement.querySelector(`.film-card__title`);
  const filmCommentsElement = filmElement.querySelector(`.film-card__comments`);

  const filmDetailsComponent = new FilmDetailsView(film);
  const filmDetailsElement = filmDetailsComponent.getElement();
  const filmDetailsElementClose = filmDetailsElement.querySelector(`.film-details__close-btn`);

  const closeFilmDetails = () => {
    footerElement.removeChild(filmDetailsElement);
  };

  const onFilmCardElementClick = () => {
    siteBodyElement.classList.add(`hide-overflow`);
    footerElement.appendChild(filmDetailsElement);
  };

  const onCloseButtonClick = () => {
    filmDetailsElementClose.removeEventListener(`click`, onCloseButtonClick);
    document.removeEventListener(`keydown`, onEscapeKeyPress);
    siteBodyElement.classList.remove(`hide-overflow`);
    closeFilmDetails();
  };

  const onEscapeKeyPress = (evt) => {
    if (evt.key === Keydown.ESC) {
      evt.preventDefault();
      closeFilmDetails();
    }
  };
  renderElement(filmContainerElement, filmElement, POSITION.BEFOREEND);

  filmPosterElement.addEventListener(`click`, onFilmCardElementClick);
  filmTitleElement.addEventListener(`click`, onFilmCardElementClick);
  filmCommentsElement.addEventListener(`click`, onFilmCardElementClick);
  filmDetailsElementClose.addEventListener(`click`, onCloseButtonClick);
  document.addEventListener(`keydown`, onEscapeKeyPress);
};

const renderAdditionalBlocks = (filmContainerElement, filmsSortByRating, filmsSortByCommentsCount) => {
  for (let i = 0; i < FILM_COUNT_ADDITION; i++) {
    render(filmContainerElement, new AdditionBlock().getElement(), POSITION.BEFOREEND);
    const extraContainerElements = filmContainerElement.querySelectorAll(`.films-list--extra`);
    const additionContainerElement = extraContainerElements[extraContainerElements.length - 1];
    const films = ADDITION_CONTAINER_TITLES[i] === `Top rated` ? filmsSortByRating : filmsSortByCommentsCount;

    if (ADDITION_CONTAINER_TITLES[i] === `Top rated` && films[0].rating > 0) {
      additionContainerElement.querySelector(`.films-list__title`).textContent = ADDITION_CONTAINER_TITLES[i];
      films.slice(0, FILM_COUNT_ADDITION).forEach((film) => {
        renderFilm(additionContainerElement.querySelector(`.films-list__container`), film, POSITION.BEFOREEND);
      });
    } else if (ADDITION_CONTAINER_TITLES[i] === `Most commented` && films[0].comments.length > 0) {
      additionContainerElement.querySelector(`.films-list__title`).textContent = ADDITION_CONTAINER_TITLES[i];
      films.slice(0, FILM_COUNT_ADDITION).forEach((film) => {
        renderFilm(additionContainerElement.querySelector(`.films-list__container`), film, POSITION.BEFOREEND);
      });
    }
  }
};

const userRankComponent = new UserRankView(userRankLabel);
const navigationComponent = new NavigationView(filters);
const sortingComponent = new SortingView();
const contentComponent = new ContentView();
renderElement(headerElement, userRankComponent.getElement(), POSITION.BEFOREEND);
renderElement(mainContainerElement, navigationComponent.getElement(), POSITION.BEFOREEND);
renderElement(mainContainerElement, sortingComponent.getElement(), POSITION.BEFOREEND);
renderElement(mainContainerElement, contentComponent.getElement(), POSITION.BEFOREEND);

const filmsSortingByRating = films.slice().sort((a, b) => {
  return sortByDesc(a.rating, b.rating);
});

const filmsSortingByCommentsCount = films.slice().sort((a, b) => {
  return sortByDesc(a.comments.length, b.comments.length);
});

let showingFilmsCount = FILM_PER_COUNT;

if (films.length > 0) {
  films.slice(0, showingFilmsCount).forEach((film) => {
    renderFilm(filmListContainerElement, film);
  });

  const showMoreComponent = new ShowMoreCardView();
  const showMoreComponentElement = showMoreComponent.getElement();

  render(filmListContainerElement, showMoreComponentElement, POSITION.AFTEREND);
  renderAdditionalBlocks(filmContainerElement, filmsSortingByRating, filmsSortingByCommentsCount);

  showMoreComponentElement.addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + FILM_PER_COUNT;

    films.slice(prevFilmsCount, showingFilmsCount).forEach((film) => {
      renderFilm(filmListContainerElement, film, POSITION.BEFOREEND);
    });

    if (showingFilmsCount >= films.length) {
      showMoreComponentElement.remove();
      showMoreComponent.removeElement();
    }
  });
} else {
  filmListContainerElement.remove();
  render(filmContainerElement.querySelector(`.films-list`), createElement(getNoFilmsText()), POSITION.BEFOREEND);
}
