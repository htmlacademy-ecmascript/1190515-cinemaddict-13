import {sortingByDesc} from "./common";

const getFilmsSortingByRating = (films, from, to) => {
  return films.slice().sort((a, b) => {
    return sortingByDesc(a.rating, b.rating);
  }).slice(from, to);
};

const getFilmsSortingByCommentsCount = (films, from, to) => {
  return films.slice().sort((a, b) => {
    return sortingByDesc(a.comments.length, b.comments.length);
  }).slice(from, to);
};

export {getFilmsSortingByRating, getFilmsSortingByCommentsCount};
