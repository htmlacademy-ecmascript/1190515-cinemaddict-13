import {UserRank} from '../const.js';

const FilmsCount = {
  NOVICE: 1,
  FAN: 10,
  MOVIE_BUFF: 20,
};

export const getUserRank = (watchedFilms) => {

  if (watchedFilms >= FilmsCount.NOVICE && watchedFilms <= FilmsCount.FAN) {
    return UserRank.NOVICE;
  }

  if (watchedFilms > FilmsCount.FAN && watchedFilms <= FilmsCount.MOVIE_BUFF) {
    return UserRank.FAN;
  }

  if (watchedFilms > FilmsCount.MOVIE_BUFF) {
    return UserRank.MOVIE_BUFF;
  }

  return ``;
};
