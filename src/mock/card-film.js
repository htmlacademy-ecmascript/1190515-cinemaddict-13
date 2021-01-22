import {nanoid} from "nanoid";
import dayjs from "dayjs";
import {
  getRandomArrayItem,
  getRandomInteger,
  generateDate,
  getSeveralRandomArrayItems
} from "../utils/common";

import {
  TEXT,
  DESCRIPTION_MAX_LENGTH,
  MAX_RATING_IN_PERCENTS,
  COUNTRIES,
  TITLES,
  GENRES,
  FILM_POSTERS,
  NAMES,
  AGES
} from "../const";

export const AUTHORS = [
  `Tim`,
  `John`,
  `Frank`
];

export const COMMENTS = [
  `Booo`,
  `Wow!`,
  `Greate!`,
  `Fine!`,
  `Bad..`
];

const EMOTIONS = [
  `smile`,
  `puke`,
  `angry`,
  `sleeping`
];

export const generateComments = () => {
  const result = [];
  const commentsCount = getRandomInteger(0, 5);
  for (let i = 0; i < commentsCount; i++) {
    result.push({
      emotion: getRandomArrayItem(EMOTIONS),
      author: getRandomArrayItem(AUTHORS),
      text: getRandomArrayItem(COMMENTS),
      commentDate: generateDate(),
    });
  }
  return result;
};

const generateDescription = () => {
  const sentences = TEXT.split(`. `);

  return getSeveralRandomArrayItems(sentences, DESCRIPTION_MAX_LENGTH).join(`. `);
};

const generateRating = () => {
  return getRandomInteger(0, MAX_RATING_IN_PERCENTS) / 10;
};

export const generateFilm = () => {
  const duration = getRandomInteger(90, 180);
  return {
    id: nanoid(),
    name: getRandomArrayItem(TITLES),
    originalName: getRandomArrayItem(TITLES),
    poster: getRandomArrayItem(FILM_POSTERS),
    description: generateDescription(),
    rating: generateRating(),
    date: generateDate(`DD MMMM YYYY`),
    duration,
    genres: getRandomArrayItem(GENRES),
    comments: generateComments(getRandomInteger(0, 5)),
    age: getRandomArrayItem(AGES),
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
        info: dayjs().minute(duration).format(`h[h] m[m]`)
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

export default {generateFilms, COMMENTS, AUTHORS};
