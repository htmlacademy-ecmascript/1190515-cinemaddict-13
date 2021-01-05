import {
  getRandomArrayItem,
  getRandomInteger,
  getRandomDate,
  getSeveralRandomArrayItems
} from "../utils";

import {
  LOREM_TEXT_PLACEHOLDER,
  DESCRIPTION_MAX_LENGTH,
  MAX_RATING_IN_PERCENTS,
  filmsMockData,
} from "../const";

import {generateComments} from "./comments";
import {generateFilmDetails} from "./detail-card-film";

const generateDescription = () => {
  const loremSentences = LOREM_TEXT_PLACEHOLDER.split(`. `);

  return getSeveralRandomArrayItems(loremSentences, DESCRIPTION_MAX_LENGTH).join(`. `);
};

const generateRating = () => {
  return getRandomInteger(0, MAX_RATING_IN_PERCENTS) / 10;
};

const generateDuration = () => {
  const duration = {
    h: getRandomInteger(0, 30),
    m: getRandomInteger(0, 60),
  };


  // export const commentDate = (dueDate) => {
  //   const duration = dueDate !== null
  //     ? dayjs(dueDate).format(`h: mm A`)
  //     : ``;
  // };

  return Object.entries(duration)
    .map(([key, value]) => value ? `${value}${key}` : ``)
    .filter(Boolean)
    .join(` `);
};

export const generateFilm = () => {
  return {
    title: getRandomArrayItem(filmsMockData.titles),
    originalTitle: 
    poster: getRandomArrayItem(filmsMockData.posters),
    description: generateDescription(),
    rating: generateRating(),
    dueDate: getRandomDate(),
    duration: generateDuration(),
    genre: getRandomArrayItem(filmsMockData.genres),
    filmDetails: generateFilmDetails(),
    comments: generateComments(getRandomInteger(0, 5)),
    isInWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
