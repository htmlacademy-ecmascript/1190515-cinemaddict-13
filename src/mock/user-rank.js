import {userRankStrings} from "../const";

const getUserRank = (count) => {
  if (count === 0) {
    return getUserRank.addClass(`visually-hidden`);
  }
  if (count > 0 && count <= 10) {
    return userRankStrings.NOVICE;
  }
  if (count > 10 && count <= 20) {
    return userRankStrings.FAN;
  }
  if (count > 20) {
    return userRankStrings.MOVIE_BUFF;
  }
  return ``;
};

export const generateUserRank = (films) => {
  const watchedFilmsCount = films.filter((film) => film.isWatched).length;

  return getUserRank(watchedFilmsCount);
};
