import {POSITION, render} from "./utils/render";
import PageController from "./controllers/page";
import generateFilms from "./mock/card-film";
import generateFilters from "./mock/filter";
import ProfileView from "./view/profile";
import {generateUserRank} from "./mock/user-rank";

const FILM_COUNT = 17;

const headerContainer = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);

const films = generateFilms(FILM_COUNT);
const filters = generateFilters(films);

const userRankLabel = generateUserRank(films);
render(headerContainer, new ProfileView(userRankLabel), POSITION.BEFOREEND);

new PageController(mainContainer, filters).render(films);
export default films;
