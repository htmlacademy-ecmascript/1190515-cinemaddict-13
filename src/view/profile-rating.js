import AbstractComponent from "./abstract-component";

const UserRating = {
  NOT_RATING: 0,
  NOVICE: 10,
  MOVIE_BUFF: 20,
};

const UserRank = {
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`,
};

export const getUserRank = (watchedFilms) => {

  if (watchedFilms > UserRating.NOT_TITLE && watchedFilms <= UserRating.NOVICE) {
    return UserRank.NOVICE;
  } else if (watchedFilms > UserRating.NOVICE && watchedFilms <= UserRating.MOVIE_BUFF) {
    return UserRank.FAN;
  } else if (watchedFilms > UserRating.MOVIE_BUFF) {
    return UserRank.MOVIE_BUFF;
  } else {
    return ``;
  }
};

const createUserProfileTemplate = (films) => {
  const rating = getUserRank(films);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class ProfileRatingView extends AbstractComponent {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;

    this.refreshTitle = this.refreshTitle.bind(this);
    this._filmsModel.setDataChangeHandler(this.refreshTitle);
  }

  getTemplate() {
    return createUserProfileTemplate(this._filmsModel.getWatchedFilms().length);
  }

  refreshTitle() {
    this._element.querySelector(`.profile__rating`).textContent = getUserRank(this._filmsModel.getWatchedFilms().length);
  }
}
