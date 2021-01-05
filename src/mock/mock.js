import {getRandomInteger, getRandomFloat} from "../utils.js";
import dayjs from "dayjs";

const generateServerFilm = () => {
  const serverFilms = [
    {
      title: generateTitle(),
      poster: generatePoster(),
      age: getRandomInteger(0, 18) + `+`,
      description: generateDescription(),
      comments: generateComments(),
      date: generateDate(),
      director: generateDirector(),
      rating: generateRating(),
      writers: generateWriters(),
      actors: generateActors(),
      country: generateCountry(),
      year: generateDate(),
      genre: generateGenre(),
      runtime: generateDuration(),
      isWatchlist: Boolean(getRandomInteger(0, 1)),
      isWatched: Boolean(getRandomInteger(0, 1)),
      isFavorite: Boolean(getRandomInteger(0, 1)),
    }
  ];
  const randomIndex = getRandomInteger(0, serverFilms.length - 1);
  return serverFilms[randomIndex];
};

const generateTitle = () => {
  const titles = [
    `Made for each other`,
    `Popeye meets sinbad`,
    `Sagebrush trail`,
    `Santa claus conquers the martians`,
    `The dance of life`,
    `The great flamarion`,
    `The man with the golden arm`
  ];
  return titles[getRandomInteger(0, titles.length - 1)];
};

const generatePoster = () => {
  const posters = [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`
  ];
  return `./images/posters/` + posters[getRandomInteger(0, posters.length - 1)];
};

const generateDescription = () => {
  const descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  const randomCount = getRandomInteger(1, 5);

  let description = ``;

  for (let i = 0; i < randomCount; i++) {
    description += descriptions[getRandomInteger(0, descriptions.length - 1)] + (i < randomCount - 1 ? ` ` : ``);
  }
  return description;
};

const generateComments = () => {
  const texts = [
    `Booo`,
    `Wow!`,
    `Greate!`,
  ];

  const EMOTIONS = [
    `smile`,
    `sleeping`,
    `puke`,
    `angry`
  ];

  const autors = [
    `Jan`,
    `Anatoly`,
    `Ann`
  ];

  const commentsCount = getRandomInteger(0, 5);
  const comments = [];

  for (let i = 0; i < commentsCount; i++) {
    comments.push(
        {
          autor: getRandomInteger(0, autors.length - 1),
          text: getRandomInteger(0, texts.length - 1),
          emotions: EMOTIONS[getRandomInteger(0, EMOTIONS.length - 1)],
          date: generateDate(),
        }
    );
  }
  return comments;
};

const generateDate = () => {

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, `day`).toDate();
};

const generateRating = () => {
  return getRandomFloat(1, 10, 1);
};

const generateDuration = () => {
  return getRandomFloat(1, 2);
};

const generateGenre = () => {
  const genres = [
    `Сomedy`,
    `Romcom`,
    `Sci-Fi`,
    `Horror`,
    `Documentary`,
    `Action`,
    `Adventure`,
  ];

  const randomCount = getRandomInteger(1, 3);

  let genre = [];

  for (let i = 0; i < randomCount; i++) {
    genre.push(genres[getRandomInteger(0, genres.length - 1)]);
  }
  return genre;
};

const generateDirector = () => {
  const directors = [
    `Steven Spielberg`,
    `Alfred Hitchcock`,
    `Martin Scorsese`,
    `Christopher Nolan`,
    `James Cameron`
  ];
  return directors[getRandomInteger(0, directors.length - 1)];
};

const generateCountry = () => {
  const countrys = [
    `USA`,
    `Canada`,
    `India`,
    `Germany`
  ];
  return countrys[getRandomInteger(0, countrys.length - 1)];
};


const generateWriters = () => {
  const allWriters = [
    `Anne Wigton`,
    `Heinz Herald`,
    `Richard Weil`,
  ];

  const randomCount = getRandomInteger(1, 3);

  let writers = ``;

  for (let i = 0; i < randomCount; i++) {
    writers += allWriters[getRandomInteger(0, allWriters.length - 1)] + (i < randomCount - 1 ? `, ` : ``);
  }
  return writers;
};

const generateActors = () => {
  const allActors = [
    `Johnny Depp`,
    `Al Pacino`,
    `Robert De Niro`,
  ];

  const randomCount = getRandomInteger(1, 3);

  let actors = ``;
  for (let i = 0; i < randomCount; i++) {
    actors += allActors[getRandomInteger(0, allActors.length - 1)] + (i < randomCount - 1 ? `, ` : ``);
  }
  return actors;
};

export const generateServerFilmCard = () => {
  const cardFilm = generateServerFilm();
  const {title, poster, original, age, description, comments, date, director, rating, writers, actors, country, year, genre, runtime, isWatchlist, isWatched, isFavorite} = cardFilm;
  return {
    title,
    poster,
    original,
    age,
    description,
    comments,
    date,
    director,
    rating,
    writers,
    actors,
    country,
    year,
    genre,
    runtime,
    isWatchlist,
    isWatched,
    isFavorite
  };
};
