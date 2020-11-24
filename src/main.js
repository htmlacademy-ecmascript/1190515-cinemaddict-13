import {createUserStatusTemplate} from "./view/user-status.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createFilmsContainerTemplate} from "./view/films-container.js";
import {createCardAddTemplate} from "./view/card-add.js";
import {createLoadMoreButtonTemplate} from "./view/load-more-button.js";
import {createTopRatedTemplate} from "./view/top-rated-cards.js";
import {createMostCommentedTemplate} from "./view/most-commented-cards.js";
import {createStatisticsTemplate} from "./view/statistics.js";
import {createPopupTemplate} from "./view/popup.js";

const CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;

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
for (let i = 0; i < CARD_COUNT; i++) {
  render(filmsListContainerElement, createCardAddTemplate(), `afterbegin`);
}

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
