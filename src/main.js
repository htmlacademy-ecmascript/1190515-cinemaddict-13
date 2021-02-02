import API from "./api/api";

import FooterStatisticView from "./view/footer-statistic-view";
import NavigationView from "./view/navigation-view";
import StatisticView from "./view/statistic-view";

import FilmsModel from "./model/films-model";

import FilterPresenter from "./presenter/filter-presenter";
import FilmCardListPresenter from "./presenter/films-card-list-presenter";
import UserProfileRatingPresenter from "./presenter/user-profile-rating-presenter";

import {render} from "./utils/render-utils";
import {NavigationItem} from "./const";

const AUTHORIZATION = `Basic h7gawgshfseg`;
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

const navigationView = new NavigationView();
render(siteMainElement, navigationView);

const mainNavigation = siteMainElement.querySelector(`.main-navigation`);

new FilterPresenter(mainNavigation, filmsModel).render();

const statisticsView = new StatisticView(filmsModel);
statisticsView.hide();
render(siteMainElement, statisticsView);

const filmCardListPresenter = new FilmCardListPresenter(siteMainElement, filmsModel, api);
filmCardListPresenter.showPreloader();

navigationView.setOnChangeHandler((navigationItem) => {

  switch (navigationItem) {
    case NavigationItem.FILMS:
      statisticsView.hide();
      filmCardListPresenter.show();
      break;

    case NavigationItem.STATS:
      filmCardListPresenter.hide();
      statisticsView.show();
      break;
  }
});

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    filmCardListPresenter.removePreloader();
    new UserProfileRatingPresenter(siteHeaderElement, filmsModel).render();
    renderPage();
  })
  .catch(() => {
    renderPage();
  });
