
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

const filmsElement = document.querySelector(`films`);
const filmsListExtra = filmsElement.querySelectorAll(`.films-list--extra`);
// eslint-disable-next-line no-console
console.log(filmsListExtra);
// const filmsExtraElement = document.querySelector(`.films-list--extra`);
// const createContainerFilms = filmsExtraElement.querySelector(`.films-list__container`);
filmsListExtra.forEach((element) => {
  const createContainerFilms = element.querySelector(`.films-list__container`);
  if (element[0]) {
    for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
      render(createContainerFilms, createTopRatedTemplate(), `afterbegin`);
    }
  }
  if (element[filmsListExtra.length - 1]) {
    for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
      render(createContainerFilms, createMostCommentedTemplate(), `afterbegin`);
    }
  }
  // return element;
});

const footerStatisticsElement = document.querySelector(`.footer__statistics`);
render(footerStatisticsElement, createStatisticsTemplate(), `afterbegin`);


const bodyElement = document.querySelector(`.footer`);
render(bodyElement, createPopupTemplate(), `afterend`);
