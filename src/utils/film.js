import {sortByDesc} from "./common";

const getFilmsSortingByRating = (films, from, to) => {
  return films.slice().sort((a, b) => {
    return sortByDesc(a.rating, b.rating);
  }).slice(from, to);
};

const getFilmsSortingByCommentsCount = (films, from, to) => {
  return films.slice().sort((a, b) => {
    return sortByDesc(a.comments.length, b.comments.length);
  }).slice(from, to);
};

export {getFilmsSortingByRating, getFilmsSortingByCommentsCount};
