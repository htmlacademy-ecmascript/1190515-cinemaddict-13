import {render} from "./utils";
import {extraListsTitles} from "./const";
import {createUserStatusTemplate} from "./view/user-status";
import {createNavigationTemplate} from "./view/navigation";
import {createBoardTemplate} from './view/board';
import {createListTemplate} from './view/films-list';
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

const films = new Array(CARD_COUNT).fill().map(generateFilm);
const filters = generateFilters(films);
const extraListsData = generateExtraLists(films);
const userRankLabel = generateUserRank(films);


const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);


render(headerElement, createUserStatusTemplate(userRankLabel), `beforeend`);
render(mainElement, createNavigationTemplate(filters), `beforeend`);
render(mainElement, createSortTemplate(), `beforeend`);
render(mainElement, createBoardTemplate(), `beforeend`);

const boardElement = mainElement.querySelector(`.films`);
render(boardElement, createListTemplate({
  title: `All movies. Upcoming`,
  isTitleHidden: true,
}), `beforeend`);
const mainList = boardElement.querySelector(`.films-list`);
const mainListContainer = mainList.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(films.length, CARDS_COUNT_PER_STEP); i++) {
  render(mainListContainer, createFilmTemplate(films[i]), `beforeend`);
}

if (films.length > CARDS_COUNT_PER_STEP) {
  let renderedFilmsCount = CARDS_COUNT_PER_STEP;

  render(mainList, showMoreButtonTemplate(), `beforeend`);

  const showMoreButton = boardElement.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + CARDS_COUNT_PER_STEP)
      .forEach((film) => render(mainListContainer, createFilmTemplate(film), `beforeend`));

    renderedFilmsCount += CARDS_COUNT_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

extraListsData.forEach(({key}) => {
  render(boardElement, createListTemplate({
    className: `films-list--extra`,
    title: extraListsTitles[key]
  }), `beforeend`);
});

const extraLists = boardElement.querySelectorAll(`.films-list--extra`);

extraLists.forEach((list, i) => {
  const listContainer = list.querySelector(`.films-list__container`);
  const extraFilms = extraListsData[i].films;

  extraFilms.forEach((extraFilm) => render(listContainer, createFilmTemplate(extraFilm), `beforeend`));
});

const statisticsContainer = document.querySelector(`.footer__statistics`);
render(statisticsContainer, createStatisticsTemplate(films.length), `beforeend`);

render(footerElement, createFilmDetailsTemplate(films[0]), `afterend`);

//   const filmsElement = document.querySelector(`.films`);
//   const filmsContainer = filmsElement.querySelectorAll(`.films-list--extra > .films-list__container`);
//   for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
//     render(filmsContainer[0], createTopRatedTemplate(), `afterbegin`);
//     render(filmsContainer[1], createMostCommentedTemplate(), `afterbegin`);
//   }

//   const footerStatisticsElement = document.querySelector(`.footer__statistics`);
//   render(footerStatisticsElement, createStatisticsTemplate(), `beforeend`);

//   const siteFooterElement = document.querySelector(`.footer`);
//   render(siteFooterElement, createFilmDetailsTemplate(), `afterend`);

//   const popup = document.querySelector(`.film-details`);
//   popup.classList.add(`visually-hidden`);
// }
