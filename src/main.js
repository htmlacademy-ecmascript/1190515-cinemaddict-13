import ProfileRatingView from "./view/profile-rating";
import MenuView from "./view/menu";
import StatisticsView from "./view/statistics";
import MovieListPresenter from "./presenter/movie";
import FilterPresenter from "./presenter/filter";
import FilmsModel from "./models/films";
import {render} from "./utils/render";
import API from "./api/api";
import FooterStatisticsComponent from "./view/footer-statistics";

const AUTHORIZATION = `Basic 9723thu9iweu3t`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict/`;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const filmsModel = new FilmsModel();

const api = new API(END_POINT, AUTHORIZATION);

const MenuComponent = new MenuView();
const pagePresenter = new MovieListPresenter(siteMainElement, filmsModel, api);

render(siteMainElement, MenuComponent);
const statisticsComponent = new StatisticsView(filmsModel);
render(siteMainElement, statisticsComponent);
statisticsComponent.hide();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    render(siteHeaderElement, new ProfileRatingView(filmsModel));
    new FilterPresenter(MenuComponent.getElement(), filmsModel).render();
    pagePresenter.render();
    render(siteFooterElement, new FooterStatisticsComponent(films.length));
  });

MenuComponent.setClickHandler((isStatistics) => {
  if (isStatistics) {
    pagePresenter.destroy();
    statisticsComponent.show();
  } else {
    statisticsComponent.hide();
    pagePresenter.render();
  }
});
