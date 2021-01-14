import {
  getRandomArrayItem,
  getRandomInteger,
  generateDate,
  getSeveralRandomArrayItems
} from "../utils";

import {
  TEXT,
  DESCRIPTION_MAX_LENGTH,
  MAX_RATING_IN_PERCENTS,
  COUNTRIES,
  TITLES,
  GENRES,
  FILM_POSTERS,
  NAMES
} from "../const";

import {generateComments} from "./comments";

const generateDescription = () => {
  const sentences = TEXT.split(`. `);

  return getSeveralRandomArrayItems(sentences, DESCRIPTION_MAX_LENGTH).join(`. `);
};

const generateRating = () => {
  return getRandomInteger(0, MAX_RATING_IN_PERCENTS) / 10;
};

const generateDuration = () => {
  const duration = {
    h: getRandomInteger(1, 3),
    m: getRandomInteger(15, 60),
  };

  return Object.entries(duration)
    .map(([key, value]) => value ? `${value}${key}` : ``)
    .filter(Boolean)
    .join(` `);
};

export const generateFilm = () => {
  return {
    name: getRandomArrayItem(TITLES),
    originalName: getRandomArrayItem(TITLES),
    poster: getRandomArrayItem(FILM_POSTERS),
    description: generateDescription(),
    rating: generateRating(),
    date: generateDate(`DD MMMM YYYY`),
    duration: generateDuration(),
    genres: getRandomArrayItem(GENRES),
    comments: generateComments(getRandomInteger(0, 5)),
    isInWatchlist: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    details: [
      {
        term: `Director`,
        info: getRandomArrayItem(NAMES),
      },
      {
        term: `Writers`,
        info: getSeveralRandomArrayItems(NAMES, 3),
      },
      {
        term: `Actors`,
        info: getSeveralRandomArrayItems(NAMES, 3),
      },
      {
        term: `Release Date`,
        info: generateDate(`DD MMMM YYYY`),
      },
      {
        term: `Runtime`,
        info: generateDuration(),
      },
      {
        term: `Country`,
        info: getRandomArrayItem(COUNTRIES),
      },
    ]
  };
};

export const generateFilms = (count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(generateFilm(i));
  }
  return result;
};

