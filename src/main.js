import API from "./api/api";

import FooterStatisticView from "./view/footer-statistic";
import UserProfileRatingView from "./view/user-profile-rating";
import NavigationView from "./view/navigation";
import StatisticsView from "./view/statistic";

import FilmsModel from "./models/films";

import FilterPresenter from "./presenter/filter";
import FilmCardListPresenter from "./presenter/film-card-list";

import {render} from "./utils/render";
import {getUserRank} from "./utils/user-rank";
import {NavigationItem} from "./const";

const AUTHORIZATION = `Basic h79h9hw4hhywe4yhhgdrhfseg`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict`;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const renderPage = () => {
  filmCardListPresenter.render();
  render(siteFooterElement, new FooterStatisticView(filmsModel.getAllFilms().length));
};

const api = new API(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();

const navigationComponent = new NavigationView();
render(siteMainElement, navigationComponent);

const mainNavigation = siteMainElement.querySelector(`.main-navigation`);

new FilterPresenter(mainNavigation, filmsModel).render();

const statisticsComponent = new StatisticsView(filmsModel);
statisticsComponent.hide();
render(siteMainElement, statisticsComponent);

const filmCardListPresenter = new FilmCardListPresenter(siteMainElement, filmsModel, api);
filmCardListPresenter.showPreloader();


navigationComponent.setOnChangeHandler((navigationItem) => {

  switch (navigationItem) {
    case NavigationItem.FILMS:
      statisticsComponent.hide();
      filmCardListPresenter.show();
      break;

    case NavigationItem.STATS:
      filmCardListPresenter.hide();
      statisticsComponent.show();
      break;
  }
});

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    filmCardListPresenter.removePreloader();
    render(siteHeaderElement, new UserProfileRatingView(getUserRank(filmsModel.getWatchedFilms().length)));
    renderPage();
  })
  .catch(() => {
    renderPage();
  });
