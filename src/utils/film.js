import {sortingByDesc} from "./common";

export const getFilmsSortingByRating = (films, from, to) => {
  return films.slice().sort((a, b) => {
    return sortingByDesc(a.rating, b.rating);
  }).slice(from, to);
};

export const getFilmsSortingByCommentsCount = (films, from, to) => {
  return films.slice().sort((a, b) => {
    return sortingByDesc(a.comments.length, b.comments.length);
  }).slice(from, to);
};
