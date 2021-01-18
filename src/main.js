import {POSITION, render} from "./utils/render";
import Board from "./presenter/movie-list";
import generateFilms from "./mock/card-film";
import generateFilters from "./mock/filters";
import ProfileView from "./view/profile";
import FooterStatisticsView from "./view/footer-statistic";
import {generateUserRank} from "./mock/user-rank";

const FILM_COUNT = 17;

const headerContainer = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
const footerContainer = document.querySelector(`.footer`);

const films = generateFilms(FILM_COUNT);
const filters = generateFilters(films);

const userRankLabel = generateUserRank(films);
render(headerContainer, new ProfileView(userRankLabel), POSITION.BEFOREEND);

new Board(mainContainer, filters).render(films);

const statisticsContainer = footerContainer.querySelector(`.footer__statistics`);
render(statisticsContainer, new FooterStatisticsView(films.length), POSITION.BEFOREEND);

