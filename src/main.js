import {render} from "./utils";
import {extraListsTitles} from "./const";
import {createUserStatusTemplate} from "./view/user-status";
import {createNavigationTemplate} from "./view/navigation";
import {createSortTemplate} from "./view/sort";
import {createFilmTemplate} from "./view/card-film";
import {showMoreButtonTemplate} from "./view/load-more-button";
import {createStatisticsTemplate} from "./view/statistics";
import {createFilmDetailsTemplate} from "./view/detail-film";
import {generateFilm} from "./mock/card-film";
import {generateFilters} from './mock/filter';
import {generateUserRank} from './mock/user-rank';
import {generateExtraLists} from './mock/extra';

const CARD_COUNT = 17;
const CARDS_COUNT_PER_STEP = 5;

const cardsFilms = new Array(CARD_COUNT).fill().map(generateFilm);
// const filters = generateFilters(cardsFilms);
// const profile = generateProfile();

const siteStatusElement = document.querySelector(`.header`);
render(siteStatusElement, createUserStatusTemplate(), `beforeEnd`);

const mainListElements = document.querySelector(`.main`);
render(mainListElements, createNavigationTemplate(), `afterbegin`);

const mainNavigationsElements = document.querySelector(`.main-navigation`);
render(mainNavigationsElements, createSortTemplate(), `afterend`);

render(mainListElements, createFilmsContainerTemplate(), `beforeend`);

const filmsListContainerElement = document.querySelector(`.films-list__container`);
for (let i = 0; i <= Math.min(cardsFilms.length, CARD_COUNT_STEP); i++) {
  render(filmsListContainerElement, createFilmTemplate(cardsFilms[i]));
}

if (cardsFilms.length > CARD_COUNT_STEP) {
  render(filmsListContainerElement, showMoreButtonTemplate(), `beforeend`);

  let renderedFilmsCount = CARD_COUNT_STEP;
  const ShowMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

  const onShowMore = (evt) => {
    evt.preventDefault();
    cardsFilms
      .slice(renderedFilmsCount, renderedFilmsCount + CARD_COUNT_STEP)
      .forEach((cardFilm) => render(filmsListContainerElement, createFilmTemplate(cardFilm)));

    renderedFilmsCount += CARD_COUNT_STEP;

    if (renderedFilmsCount >= cardsFilms.length) {
      ShowMoreButton.remove();
    }
  };

  ShowMoreButton.addEventListener(`click`, onShowMore);

  const filmsListElement = document.querySelector(`.films-list`);
  render(filmsListElement, showMoreButtonTemplate(), `beforeend`);

  const filmsElement = document.querySelector(`.films`);
  const filmsContainer = filmsElement.querySelectorAll(`.films-list--extra > .films-list__container`);
  for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
    render(filmsContainer[0], createTopRatedTemplate(), `afterbegin`);
    render(filmsContainer[1], createMostCommentedTemplate(), `afterbegin`);
  }

  const footerStatisticsElement = document.querySelector(`.footer__statistics`);
  render(footerStatisticsElement, createStatisticsTemplate(), `beforeend`);

  const footerElement = document.querySelector(`.footer`);
  render(footerElement, createFilmDetailsTemplate(), `afterend`);

  const popup = document.querySelector(`.film-details`);
  popup.classList.add(`visually-hidden`);
}
