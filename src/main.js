import {POSITION, render} from "./utils/render";
import Board from "./presenter/board";
import {generateFilms, getAllComments} from "./mock/card-film";
import ProfileView from "./view/profile";
import FooterStatisticsView from "./view/footer-statistic";
import {generateUserRank} from "./mock/user-rank";
import MoviesModel from "./model/movies";
import CommentsModel from "./model/comments";

const FILM_COUNT = 17;

const headerContainer = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
const footerContainer = document.querySelector(`.footer`);

const films = generateFilms(FILM_COUNT);
const comments = getAllComments;

const moviesModel = new MoviesModel(films);
const commentsModel = new CommentsModel(comments);

const userRankLabel = generateUserRank(films);
render(headerContainer, new ProfileView(userRankLabel), POSITION.BEFOREEND);

new Board(mainContainer, moviesModel, commentsModel).render(films);

const statisticsContainer = footerContainer.querySelector(`.footer__statistics`);
render(statisticsContainer, new FooterStatisticsView(films.length), POSITION.BEFOREEND);

