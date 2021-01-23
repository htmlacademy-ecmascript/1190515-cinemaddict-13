import {POSITION, render} from "./utils/render";
import BoardPresenter from "./presenter/board";
import {generateFilms, getAllComments} from "./mock/card-film";
import ProfileView from "./view/profile";
import FooterStatisticsView from "./view/footer-statistic";
import {generateUserRank} from "./mock/user-rank";
import MoviesModel from "./models/movies";
import CommentsModel from "./models/comments";

const FILM_COUNT = 17;

const headerContainerElement = document.querySelector(`.header`);
const mainContainerElement = document.querySelector(`.main`);
const footerContainerElement = document.querySelector(`.footer`);

const films = generateFilms(FILM_COUNT);
const comments = getAllComments;

const moviesModel = new MoviesModel(films);
const commentsModel = new CommentsModel(comments);

const userRankLabel = generateUserRank(films);
render(headerContainerElement, new ProfileView(userRankLabel), POSITION.BEFOREEND);

new BoardPresenter(mainContainerElement, moviesModel, commentsModel).render(films);

const statisticsContainer = footerContainerElement.querySelector(`.footer__statistics`);
render(statisticsContainer, new FooterStatisticsView(films.length), POSITION.BEFOREEND);

