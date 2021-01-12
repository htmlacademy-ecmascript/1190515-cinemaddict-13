import {EXTRA_LIST_TOP_RATED_KEY, EXTRA_LIST_MOST_COMMENTED_KEY} from '../const';

const getTopRatedFilms = (films) => {
  return [...films].sort((a, b) => b.rating - a.rating).slice(0, 2);
};

const getMostCommentedFilms = (films) => {
  return [...films].sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);
};

const extraFilmsLists = [
  {
    key: EXTRA_LIST_TOP_RATED_KEY,
    getFilms: getTopRatedFilms,
  },
  {
    key: EXTRA_LIST_MOST_COMMENTED_KEY,
    getFilms: getMostCommentedFilms,
  }
];

const generateExtraList = (films, extraData) => {
  return {
    key: extraData.key,
    films: extraData.getFilms(films),
  };
};

export const generateExtraLists = (films) => {
  return extraFilmsLists.map((extraData) => generateExtraList(films, extraData));
};
