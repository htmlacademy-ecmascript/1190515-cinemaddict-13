import {FilterTypes} from "../presenter/filter";
import {getFilmsSortingByRating} from "../utils/film";
import {SORTING_DATA_TYPE} from "../view/sorting";

export default class MoviesModel {
  constructor(films) {
    this._films = films;
    this._currentFilterType = FilterTypes.ALL;
    this._filterChangeHandlers = [];
    this._dataChangeHandlers = [];
    this._dataCommentsChangeHandlers = [];
    this._extraBlockChangeHandlers = [];
  }

  getAllFilms() {
    return this._films;
  }

  getFilms() {
    switch (this._currentFilterType) {
      case FilterTypes.ALL:
        return this._films;
      case FilterTypes.WATCHLIST:
        return this._films.filter((elm) => elm.isWatchlist);
      case FilterTypes.HISTORY:
        return this._films.filter((elm) => elm.isWatched);
      case FilterTypes.FAVORITES:
        return this._films.filter((elm) => elm.isFavorites);
    }
    return this._films;
  }

  updateData(id, newFilm) {
    const index = this._films.findIndex((film) => film.id === id);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newFilm, this._films.slice(index + +1));
    this._callHandlers(this._dataChangeHandlers);

    const isCommentsUpdate = !(this._films[index].comments === newFilm.comments);
    if (isCommentsUpdate) {
      this._callHandlers(this._dataCommentsChangeHandlers);
      this._callHandlers(this._extraBlockChangeHandlers);
    }
  }

  setFilter(filterType) {
    this._currentFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setFilterChangeHandler(callback) {
    this._filterChangeHandlers.push(callback);
  }

  setDataChangeHandler(callback) {
    this._dataChangeHandlers.push(callback);
  }

  setExtraBlockChangeHandler(callback) {
    this._extraBlockChangeHandlers.push(callback);
  }

  setCommentsDataChangeHAndler(callback) {
    this._dataCommentsChangeHandlers.push(callback);
  }

  _callHandlers(callbacks) {
    callbacks.forEach((callback) => callback());
  }

  _getFilmsSortingByRating(from, to) {
    return getFilmsSortingByRating(this.getFilms(), from, to);
  }

  getSortedFilms(sortingType, from, to) {
    switch (sortingType) {
      case SORTING_DATA_TYPE.DATE:
        return this.getFilms().slice().sort((a, b) => {
          const bDate = new Date(b.details.find((detail) => detail.term === `Release Date`).info);
          const aDate = new Date(a.details.find((detail) => detail.term === `Release Date`).info);
          return bDate - aDate;
        }).slice(from, to);
      case SORTING_DATA_TYPE.RATING:
        return this._getFilmsSortingByRating(from, to);
      case SORTING_DATA_TYPE.DEFAULT:
        return this.getFilms().slice(from, to);
    }
    return [];
  }
}
