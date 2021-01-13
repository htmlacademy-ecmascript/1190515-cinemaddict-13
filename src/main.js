import {RenderPosition, renderElement} from "./utils";
import {extraListsTitles, Keydown} from "./const";
import {generateFilm} from "./mock/card-film";
import {generateFilters} from "./mock/filter";
import {generateUserRank} from "./mock/user-rank";
import {generateExtraLists} from "./mock/extra-list";

import RankView from "./view/user-status";
import NavView from "./view/navigation";
import SortingView from "./view/sorting";
import BoardView from "./view/board";
import ListView from "./view/films-list";
import FilmView from "./view/card-film";
import ShowMoreView from "./view/show-more-button";
import FooterStatisticsView from "./view/footer-statistics";
import FilmDetailsView from "./view/detail-film";

const CARD_COUNT = 17;
const CARDS_COUNT_PER_STEP = 5;

const films = new Array(CARD_COUNT).fill().map(generateFilm);
const filters = generateFilters(films);
const extraListsData = generateExtraLists(films);
const userRankLabel = generateUserRank(films);

const siteBodyElement = document.querySelector(`body`);
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const rankComponent = new RankView(userRankLabel);
const navComponent = new NavView(filters);
const sortComponent = new SortingView();
const boardComponent = new BoardView();
const showMoreComponent = new ShowMoreView();
const footerStatisticsComponent = new FooterStatisticsView(films.length);

renderElement(headerElement, rankComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(mainElement, navComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(mainElement, sortComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(mainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

const boardElement = mainElement.querySelector(`.films`);
const mainListComponent = new ListView(films.length);

renderElement(boardElement, mainListComponent.getElement(), RenderPosition.BEFOREEND);

const renderFilmDetails = (filmData) => {
  const filmDetailsComponent = new FilmDetailsView(filmData);
  const filmDetailsElement = filmDetailsComponent.getElement();

  const closeButton = filmDetailsElement.querySelector(`.film-details__close-btn`);
  siteBodyElement.classList.add(`hide-overflow`);

  const onEscKeyDown = (evt) => {
    if (evt.key === Keydown.ESC) {
      evt.preventDefault();
      closeModal();
    }
  };
  document.addEventListener(`keydown`, onEscKeyDown);

  const closeModal = () => {
    filmDetailsElement.remove();
    filmDetailsComponent.removeElement();
    siteBodyElement.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, onEscKeyDown);
    closeButton.removeEventListener(`click`, closeModal);
  };
  closeButton.addEventListener(`click`, closeModal);
  renderElement(document.body, filmDetailsComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderFilm = (container, filmData) => {
  const filmComponent = new FilmView(filmData);
  const filmElement = filmComponent.getElement();
  const filmPosterElement = filmElement.querySelector(`.film-card__poster`);
  const filmTitleElement = filmElement.querySelector(`.film-card__title`);
  const filmCommentsElement = filmElement.querySelector(`.film-card__comments`);
  const modalTriggers = [filmPosterElement, filmTitleElement, filmCommentsElement];

  modalTriggers.forEach((modalTrigger) => {
    modalTrigger.addEventListener(`click`, () => renderFilmDetails(filmData));
  });
  renderElement(container, filmComponent.getElement(), RenderPosition.BEFOREEND);

};

const mainList = boardElement.querySelector(`.films-list`);
const mainListContainer = mainList.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(films.length, CARDS_COUNT_PER_STEP); i++) {
  renderFilm(mainListContainer, films[i]);
}

if (films.length > CARDS_COUNT_PER_STEP) {
  let renderedFilmsCount = CARDS_COUNT_PER_STEP;

  renderElement(mainList, showMoreComponent.getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = boardElement.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + CARDS_COUNT_PER_STEP)
      .forEach((film) => renderFilm(mainListContainer, film));

    renderedFilmsCount += CARDS_COUNT_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

extraListsData.forEach(({key}) => {
  const extraListComponent = new ListView({
    className: `films-list--extra`,
    title: extraListsTitles[key]
  });
  renderElement(boardElement, extraListComponent.getElement(), RenderPosition.BEFOREEND);
});

const extraLists = boardElement.querySelectorAll(`.films-list--extra`);

extraLists.forEach((list, i) => {
  const listContainer = list.querySelector(`.films-list__container`);
  const extraFilms = extraListsData[i].films;

  extraFilms.forEach((extraFilm) => {
    renderFilm(listContainer, extraFilm);
  });

  const statisticsContainer = document.querySelector(`.footer__statistics`);
  renderElement(statisticsContainer, footerStatisticsComponent.getElement(), RenderPosition.BEFOREEND);
});
