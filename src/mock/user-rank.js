import {RANK} from "../const";

const getUserRank = (count) => {
  if (count > 0 && count <= 10) {
    return RANK.NOVICE;
  }
  if (count > 10 && count < 20) {
    return RANK.FAN;
  }
  if (count >= 20) {
    return RANK.MOVIE_BUFF;
  }
  return ``;
};

export const generateUserRank = (films) => {
  const watchedFilmsCount = films.filter((film) => film.isWatched).length;
  return getUserRank(watchedFilmsCount);
};
