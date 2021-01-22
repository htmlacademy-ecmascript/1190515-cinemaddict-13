import {FilterTypes} from "../presenter/filter";

export default class Movies {
  constructor(films) {
    this._films = films;
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
  }

  updateData(id, newFilm) {
    const index = this._films.findIndex((film) => film.id === id);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newFilm, this._films.slice(index + +1));
  }
}
