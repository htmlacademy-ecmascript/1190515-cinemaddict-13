import BoardView from "../view/board";
import SortView from "../view/sorting";
import FilmsListView from "../view/films-list";
import TopRatedFilmsView from "../view/top-rated-films";
import MostCommentedFilmsView from "../view/most-commented-films";
import ShowMoreButtonView from "../view/show-more-button";

import FilmCardPresenter from "../presenter/film-card";

import {render, remove, RenderPosition} from "../utils/render";
import {SortType, CardsCount} from "../const";
import {getSortedFilms} from "../utils/sort";

const renderFilms = (container, films, dataChangeHandler, viewChangeHandler, api) => {
  return films.map((par) => {
    const filmPresenter = new FilmCardPresenter(container, dataChangeHandler, viewChangeHandler, api);
    filmPresenter.render(par);
    return filmPresenter;
  });
};

export default class FilmCardListPresenter {
  constructor(container, filmsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._api = api;

    this._currentFilmsPresenters = [];
    this._currentFilms = [];
    this._currentTopRatedFilms = [];
    this._currentMostCommentedFilms = [];

    this._currentFilmsCount = CardsCount.ON_START;
    this._currentSortType = SortType.DEFAULT;

    this._boardComponent = new BoardView();
    this._sortComponent = new SortView();
    this._filmsListComponent = new FilmsListView();
    this._topRatedFilmsComponent = new TopRatedFilmsView();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._sortHandler = this._sortHandler.bind(this);
    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);

    this._sortComponent.setClickHandler(this._sortHandler);
    this._filmsModel.setFilterChangeHandler(this._filterChangeHandler);
  }

  render() {
    render(this._container, this._boardComponent);

    const container = this._boardComponent.getElement();

    if (!this._filmsModel.getAllFilms().length) {
      render(container, new FilmsListView(false));

      return;
    }

    render(container, this._sortComponent);
    render(container, this._filmsListComponent);

    this._updateFilms();
  }

  destroy() {
    remove(this._boardComponent);
    this._removeFilms();
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);
    if (this._currentFilmsCount >= this._currentFilms.length) {
      return;
    }
    render(this._filmsListComponent.getElement().querySelector(`.films-list__container`), this._showMoreButtonComponent, RenderPosition.AFTEREND);
    this._showMoreButtonComponent.setClickHandler((evt) => {
      evt.preventDefault();
      const prevFilmsCount = this._currentFilmsCount;
      this._currentFilmsCount += CardsCount.STEP;
      const newFilms = renderFilms(this._filmsListComponent.getElement().querySelector(`.films-list__container`), this._currentFilms.slice(prevFilmsCount, this._currentFilmsCount), this._dataChangeHandler, this._viewChangeHandler, this._api);
      this._currentFilmsPresenters = [...this._currentFilmsPresenters, ...newFilms];

      if (this._currentFilmsCount >= this._currentFilms.length) {
        this._showMoreButtonComponent.getElement().remove();
      }
    });
  }

  _sortHandler(sortType) {
    this._currentSortType = sortType;
    this._filmsListComponent.getElement().querySelector(`.films-list__container`).innerHTML = ``;

    this._currentFilmsCount = CardsCount.ON_START;
    this._currentFilms = getSortedFilms(this._filmsModel.getFilms(), sortType);
    this._renderFilms(this._currentFilms.slice(0, this._currentFilmsCount));

    this._renderShowMoreButton();
  }

  _dataChangeHandler(prevData, newData) {
    this._api.updateFilm(prevData.id, newData.adaptToServer())
      .then((film) => {
        this._filmsModel.updateFilm(prevData.id, film);
        this._updateFilms(false);
      });
  }

  _removeFilms() {
    this._currentFilmsPresenters.forEach((filmPresenter) => filmPresenter.destroy());
    this._currentFilmsPresenters = [];
  }

  _updateFilms(isDefaultCount = true) {
    this._removeFilms();

    if (isDefaultCount) {
      this._currentFilmsCount = CardsCount.ON_START;
    }

    this._currentFilms = getSortedFilms(this._filmsModel.getFilms().slice(), this._currentSortType);

    this._renderFilmList();

    this._renderShowMoreButton();

    this._renderExtraFilmList();
  }

  _filterChangeHandler() {
    this._updateFilms();
  }

  _renderFilms(films) {
    const newFilms = renderFilms(this._filmsListComponent.getElement().querySelector(`.films-list__container`), films, this._dataChangeHandler, this._viewChangeHandler, this._api);
    this._currentFilmsPresenters = [...this._currentFilmsPresenters, ...newFilms];
  }

  _renderFilmList() {
    this._renderFilms(this._currentFilms.slice(0, this._currentFilmsCount));
  }

  _renderExtraFilmList() {
    render(this._boardComponent.getElement(), this._topRatedFilmsComponent);
    render(this._boardComponent.getElement(), this._mostCommentedFilmsComponent);

    this._currentTopRatedFilms = getSortedFilms(this._filmsModel.getAllFilms(), SortType.RATING).slice(0, CardsCount.EXTRA);

    const topRatedPresenters = renderFilms(this._topRatedFilmsComponent.getElement().querySelector(`.films-list__container`), this._currentTopRatedFilms, this._dataChangeHandler, this._viewChangeHandler, this._api);

    this._currentMostCommentedFilms = getSortedFilms(this._filmsModel.getAllFilms(), SortType.COMMENTS).slice(0, CardsCount.EXTRA);

    const mostCommentedPresenters = renderFilms(this._mostCommentedFilmsComponent.getElement().querySelector(`.films-list__container`), this._currentMostCommentedFilms, this._dataChangeHandler, this._viewChangeHandler, this._api);

    this._currentFilmsPresenters = [...topRatedPresenters, ...mostCommentedPresenters, ...this._currentFilmsPresenters];
  }

  _viewChangeHandler() {
    this._currentFilmsPresenters.forEach((par) => par.setDefaultView());
  }
}
