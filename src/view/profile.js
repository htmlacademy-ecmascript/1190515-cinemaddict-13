import AbstractSmartComponent from "./abstract-smart-component";

const ProfileRank = {
  DEFAULT: null,
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`
};

const createProfileTemplate = (profileRank) => {
  return `<section class="header__profile profile">
            ${profileRank ? `<p class="profile__rating">${profileRank}</p>` : ``}
            <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          </section>`;
};

export default class Profile extends AbstractSmartComponent {
  constructor(moviesModel) {
    super();

    this._moviesModel = moviesModel;
    this._watchedFilmsCount = this._moviesModel.getWatchedFilms().length;
    this._profileRank = this._getProfileRank();
  }

  getTemplate() {
    return createProfileTemplate(this._profileRank);
  }

  _getProfileRank() {
    if (this._watchedFilmsCount === 0) {
      return ProfileRank.DEFAULT;
    }

    if (this._watchedFilmsCount > 0 && this._watchedFilmsCount <= 10) {
      return ProfileRank.NOVICE;
    }

    if (this._watchedFilmsCount > 10 && this._watchedFilmsCount <= 20) {
      return ProfileRank.FAN;
    }

    if (this._watchedFilmsCount > 20) {
      return ProfileRank.MOVIE_BUFF;
    }
    return ``;
  }

  restoreHandlers() {}

  updateElement() {
    this._watchedFilmsCount = this._moviewModel.getWatchedFilms().length;
    this._profileRating = this._getProfileRank();
    super.updateElement();
  }
}
