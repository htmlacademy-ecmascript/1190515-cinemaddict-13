import {POSITION, render} from "../utils/render";
import ExtraBlockView from "../view/extra-block";
import {getFilmsSortingByCommentsCount, getFilmsSortingByRating} from "../utils/film";
import renderFilms from "./movie";

const FILM_COUNT_ADDITION = 2;
const ADDITION_CONTAINER_TITLES = [`Top rated`, `Most commented`];

export default class ExtraBlockPresenter {
  constructor(container, moviesModel, onDataChange, commentsModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._onDataChange = onDataChange;
    this._filmCommentsModel = commentsModel;
    this._showFilms = [];
    this._filmsSortingByCommentsCount = null;
    this._onCommentsDataChange = this._onCommentsDataChange.bind(this);
    this._moviesModel.setCommentsDataChangeHandler(this._onCommentsDataChange);
  }

  render() {
    const filmsSortingByRating = this._getFilmsSortingByRating();
    const filmsSortingByCommentsCount = this._getFilmsSortingByCommentsCount();
    const data = [filmsSortingByRating, filmsSortingByCommentsCount];
    for (let i = 0; i < FILM_COUNT_ADDITION; i++) {
      render(this._filmsContainer, new ExtraBlockView(), POSITION.BEFOREEND);
      const extraContainers = this._filmsContainer.querySelectorAll(`.films-list--extra`)[i];
      const extraContainerFilmList = extraContainers.querySelector(`.films-list__container`);
      const films = ADDITION_CONTAINER_TITLES[i] === `Top rated` ? this._getFilmsSortingByRating() : this._getFilmsSortingByCommentsCount();
      extraContainers.querySelector(`.films-list__title`).textContent = ADDITION_CONTAINER_TITLES[i];
      this._showFilms = this._showFilms.concat(renderFilms(extraContainerFilmList, films, data[i], this._onDataChange, this._filmCommentsModel));
    }
  }

  get showFilms() {
    return this._showFilms;
  }

  _getFilmsSortingByRating() {
    return getFilmsSortingByRating(this._moviesModel.getAllFilms(), 0, FILM_COUNT_ADDITION);
  }

  _getFilmsSortingByCommentsCount() {
    return getFilmsSortingByCommentsCount(this._moviesModel.getAllFilms(), 0, FILM_COUNT_ADDITION);
  }

  _onCommentsDataChange() {
    this.render();
  }
}
