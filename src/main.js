import {RenderPosition, renderElement} from "./utils";
import {Keydown} from "./const";

import {generateFilms} from "./mock/card-film";
import {generateFilters} from "./mock/filter";
import {generateUserRank} from "./mock/user-rank";
import {generateComments} from "./mock/comments";

import UserRankView from "./view/user-status";
import NavigationView from "./view/navigation";
import SortingView from "./view/sorting";
import ContentView from "./view/conent";
// import FilmsListView from "./view/films-list";
import FilmView from "./view/card-film";
import ShowMoreCardView from "./view/show-more-button";
import FooterStatisticsView from "./view/footer-statistics";
import FilmDetailsView from "./view/detail-film";

const FILM_COUNT = 17;
const FILM_COUNT_PER_STEP = 5;
const ADDITION_CONTAINER_TITLES = [`Top rated`, `Most commented`];
const NO_FILMS_TEXT = `There are no movies in our database`;
const siteBodyElement = document.querySelector(`body`);
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const statisticsContainer = document.querySelector(`.footer__statistics`);

const films = generateFilms();
const filters = generateFilters(FILM_COUNT);
const userRankLabel = generateUserRank(films);

const siteBodyElement = document.querySelector(`body`);
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const userRankComponent = new UserRankView(userRankLabel);
const navigationComponent = new NavigationView(filters);
const sortingComponent = new SortingView();
const contentComponent = new ContentView();
const showMoreComponent = new ShowMoreCardView();
const footerStatisticsComponent = new FooterStatisticsView(films.length);

const onEscKeyDown = (evt) => {
  if (evt.key === Keydown.ESC) {
    evt.preventDefault();
    closeModal();
  }
};

const closeModal = () => {
  filmDetailsElement.remove();
  filmDetailsComponent.removeElement();
  siteBodyElement.classList.remove(`hide-overflow`);
  document.removeEventListener(`keydown`, onEscKeyDown);
  closeButton.removeEventListener(`click`, closeModal);
};

const films = generateFilms(FILM_COUNT);
const filters = generateFilters(films);

const getNoFilmsText = () => {
  return `<h2 class="films-list__title">${NO_FILMS_TEXT}</h2>`;
};

renderElement(headerElement, rankComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(mainElement, navComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(mainElement, sortComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(mainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

const mainList = boardElement.querySelector(`.films-list`);
const mainListContainer = mainList.querySelector(`.films-list__container`);


const renderFilm = (container, film) => {
  const filmComponent = new FilmView(film);
  const filmElement = filmComponent.getElement();
  const filmPosterElement = filmElement.querySelector(`.film-card__poster`);
  const filmTitleElement = filmElement.querySelector(`.film-card__title`);
  const filmCommentsElement = filmElement.querySelector(`.film-card__comments`);

  renderElement(container, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

