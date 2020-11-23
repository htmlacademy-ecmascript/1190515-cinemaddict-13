
import {createUserStatusTemplate} from "./view/user-status.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createSortCardsTemplate} from "./view/sort-cards.js";
import {createLoadMoreButtonTemplate} from "./view/load-more-button.js";
import {createTopRatedCardsTemplate} from "./view/top-rated-cards.js";
import {createMostCommentedTemplate} from "./view/most-commented-cards.js";
import {createPopupTemplate} from "./view/popup.js";

const SORT_CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteStatusElement = document.querySelector(`.header__profile`);
render(siteStatusElement, createUserStatusTemplate(), `beforeend`);

const mainListElement = document.querySelector(`.main`);
const mainNavigationElement = mainListElement.querySelector(`.main-navigation`);
render(mainNavigationElement, createSiteMenuTemplate(), `beforeend`);

const createFiltersElement = mainListElement.querySelector(`.sort`);
render(createFiltersElement, createFiltersTemplate(), `beforeend`);

const filmsListElement = document.querySelector(`.films-list`);
const createFilmsCardElement = filmsListElement.querySelector(`.films-list__container`);
for (let i = 0; i < SORT_CARD_COUNT; i++) {
  render(createFilmsCardElement, createSortCardsTemplate(), `beforeend`);
}

render(filmsListElement, createLoadMoreButtonTemplate(), `beforeend`);

const filmsTopRatedListElement = document.querySelector(`.films-list--extra`);
const createExtraFilmsCardElement = filmsTopRatedListElement.querySelector(`.films-list__container`);
for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
  render(createExtraFilmsCardElement, createTopRatedCardsTemplate(), `beforeend`);
}

for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
  render(createExtraFilmsCardElement, createMostCommentedTemplate(), `beforeend`);
}

const filmDetailsElement = document.querySelector(`.film-details`);
render(filmDetailsElement, createPopupTemplate(), `beforeend`);
