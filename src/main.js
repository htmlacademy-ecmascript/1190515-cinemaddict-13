import {generateServerFilmCard} from "./mock/film-card.js";
import {CARD_COUNT_STEP, EXTRA_CARD_COUNT} from "./mock/const.js";
import {createUserStatusTemplate} from "./view/user-status.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFiltersTemplate} from "./view/sort.js";
import {createFilmsContainerTemplate} from "./view/films-container.js";
import {createCardTemplate} from "./view/card-add.js";
// import {createFilmDescriptionTemplate} from "./view/card-add.js";
import {createLoadMoreButtonTemplate} from "./view/load-more-button.js";
import {createTopRatedTemplate} from "./view/top-rated-cards.js";
import {createMostCommentedTemplate} from "./view/most-commented-cards.js";
import {createStatisticsTemplate} from "./view/statistics.js";
import {createPopupTemplate} from "./view/popup.js";

const CARD_COUNT = 17;

const cardsFilms = new Array(CARD_COUNT).fill().map(generateServerFilmCard);
// const filters = generateFilters(cardsFilms);
// const profile = generateProfile();

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteStatusElement = document.querySelector(`.header`);
render(siteStatusElement, createUserStatusTemplate(), `beforeEnd`);

const mainListElements = document.querySelector(`.main`);
render(mainListElements, createSiteMenuTemplate(), `afterbegin`);

const mainNavigationsElements = document.querySelector(`.main-navigation`);
render(mainNavigationsElements, createFiltersTemplate(), `afterend`);

render(mainListElements, createFilmsContainerTemplate(), `beforeend`);

const filmsListContainerElement = document.querySelector(`.films-list__container`);
for (let i = 0; i <= Math.min(cardsFilms.length, CARD_COUNT_STEP); i++) {
  render(filmsListContainerElement, createCardTemplate(cardsFilms[i]));
}

if (cardsFilms.length > CARD_COUNT_STEP) {
  render(filmsListContainerElement, createLoadMoreButtonTemplate(), `beforeend`);

  let renderedFilmsCount = CARD_COUNT_STEP;
  const ShowMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

  const onShowMore = (evt) => {
    evt.preventDefault();
    cardsFilms
      .slice(renderedFilmsCount, renderedFilmsCount + CARD_COUNT_STEP)
      .forEach((cardFilm) => render(filmsListContainerElement, createCardTemplate(cardFilm)));

    renderedFilmsCount += CARD_COUNT_STEP;

    if (renderedFilmsCount >= cardsFilms.length) {
      ShowMoreButton.remove();
    }
  };

  ShowMoreButton.addEventListener(`click`, onShowMore);

  const filmsListElement = document.querySelector(`.films-list`);
  render(filmsListElement, createLoadMoreButtonTemplate(), `beforeend`);

  const filmsElement = document.querySelector(`.films`);
  const filmsContainer = filmsElement.querySelectorAll(`.films-list--extra > .films-list__container`);
  for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
    render(filmsContainer[0], createTopRatedTemplate(), `afterbegin`);
    render(filmsContainer[1], createMostCommentedTemplate(), `afterbegin`);
  }

  const footerStatisticsElement = document.querySelector(`.footer__statistics`);
  render(footerStatisticsElement, createStatisticsTemplate(), `beforeend`);

  const footerElement = document.querySelector(`.footer`);
  render(footerElement, createPopupTemplate(), `afterend`);

  const popup = document.querySelector(`.film-details`);
  popup.classList.add(`visually-hidden`);
}
