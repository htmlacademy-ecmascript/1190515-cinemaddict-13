import ProfileRatingView from "./view/profile-rating";
import NavigationView from "./view/navigation";
import StatisticsView from "./view/statistics";
import FooterStatisticView from "./view/footer-statistic";

import FilmCardListPresenter from "./presenter/film-card-list";
import FilterPresenter from "./presenter/filter";

import FilmsModel from "./models/films";

import {render} from "./utils/render";
import API from "./api/api";


const AUTHORIZATION = `Basic 9723thu9iweu3t`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict/`;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const filmsModel = new FilmsModel();

const api = new API(END_POINT, AUTHORIZATION);

const navigationComponent = new NavigationView();
const boardPresenter = new FilmCardListPresenter(siteMainElement, filmsModel, api);

render(siteMainElement, navigationComponent);

const statisticsComponent = new StatisticsView(filmsModel);

render(siteMainElement, statisticsComponent);
statisticsComponent.hide();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    render(siteHeaderElement, new ProfileRatingView(filmsModel));
    new FilterPresenter(navigationComponent.getElement(), filmsModel).render();
    boardPresenter.render();
    render(siteFooterElement, new FooterStatisticView(films.length));
  });

navigationComponent.setClickHandler((isStatistics) => {
  if (isStatistics) {
    boardPresenter.destroy();
    statisticsComponent.show();
  } else {
    statisticsComponent.hide();
    boardPresenter.render();
  }
});
