import {getRandomInteger} from "../utils.js";

const generateServerFilm = () => {
  const serverFilms = [
    {
      title: generateTitle(),
      poster: generatePoster(),
      description: generateDescription(),
      comments: generateComments(),
      date: generateDate(),
      rating,
      year,
      genre: generateGenre(),
      runtime
    },
    {
      title: generateTitle(),
      poster: generatePoster(),
      description: generateDescription(),
      comments: generateComments(),
      date: generateDate(),
      rating,
      year,
      genre: generateGenre(),
      runtime
    },
    {
      title: generateTitle(),
      poster: generatePoster(),
      description: generateDescription(),
      comments: generateComments(),
      date: generateDate(),
      rating,
      year,
      genre: generateGenre(),
      runtime
    },
    {
      title: generateTitle(),
      poster: generatePoster(),
      description: generateDescription(),
      comments: generateComments(),
      date: generateDate(),
      rating,
      year,
      genre: generateGenre(),
      runtime
    },
    {
      title: generateTitle(),
      poster: generatePoster(),
      description: generateDescription(),
      comments: generateComments(),
      date: generateDate(),
      rating,
      year,
      genre: generateGenre(),
      runtime
    },
    {
      title: generateTitle(),
      poster: generatePoster(),
      description: generateDescription(),
      comments: generateComments(),
      date: generateDate(),
      rating,
      year,
      genre: generateGenre(),
      runtime
    },
    {
      title: generateTitle(),
      poster: generatePoster(),
      description: generateDescription(),
      comments: generateComments(),
      date: generateDate(),
      rating,
      year,
      genre: generateGenre(),
      runtime
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
    `./images/posters/made-for-each-other.png`,
    `./images/posters/popeye-meets-sinbad.png`,
    `./images/posters/sagebrush-trail.jpg`,
    `./images/posters/santa-claus-conquers-the-martians.jpg`,
    `./images/posters/the-dance-of-life.jpg`,
    `./images/posters/the-great-flamarion.jpg`,
    `./images/posters/the-man-with-the-golden-arm.jpg`
  ];

  return posters[getRandomInteger(0, posters.length - 1)];

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
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);

  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
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
  return genres[getRandomInteger(0, genres.length - 1)];
};

export const generateServerFilmCard = () => {
  const cardFilm = generateServerFilm();
  const {title, poster, description, comments, date, rating, year, genre, runtime} = cardFilm;
  return {
    title: generateTitle(),
    poster: generatePoster(),
    description: generateDescription(),
    comments: generateComments(),
    date: generateDate(),
    rating,
    year,
    genre: generateGenre(),
    runtime
  };
};
