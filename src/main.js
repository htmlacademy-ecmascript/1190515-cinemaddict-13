import {POSITION, render} from "./utils/render";
import Board from "./presenter/board";
import {generateFilms, getAllComments} from "./mock/film";
import Profile from "./view/profile";
import FooterStatistics from "./view/footer-statistic";
import Movies from "./model/movies";
import Comments from "./model/comments";

const FILM_COUNT = 17;

const headerContainer = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
const footerContainer = document.querySelector(`.footer`);

const films = generateFilms(FILM_COUNT);
const comments = getAllComments;

const moviesModel = new Movies(films);
const commentsModel = new Comments(comments);

render(headerContainer, new Profile(moviesModel), POSITION.BEFOREEND);

new Board(mainContainer, moviesModel, commentsModel).render();

const statisticsContainer = footerContainer.querySelector(`.footer__statistics`);
render(statisticsContainer, new FooterStatistics(films.length), POSITION.BEFOREEND);

