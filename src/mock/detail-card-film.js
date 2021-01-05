import {getRandomArrayItem, getSeveralRandomArrayItems, getRandomInteger} from "../utils";
import {filmsMockData} from "../const";

export const generateFilmDetails = () => {
  return {
    originalTitle: getRandomArrayItem(filmsMockData.titles),
    director: getRandomArrayItem(filmsMockData.names),
    writers: getSeveralRandomArrayItems(filmsMockData.names, 3),
    actors: getSeveralRandomArrayItems(filmsMockData.names, 3),
    country: getRandomArrayItem(filmsMockData.countries),
    rating: getRandomInteger(0, 18) + `+`,
    genres: getSeveralRandomArrayItems(filmsMockData.genres, 3),
  };
};
