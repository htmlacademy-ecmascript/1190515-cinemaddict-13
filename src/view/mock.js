
import {getRandomInteger} from "../utils.js";

const generateFilm = () => {
  const serverFilms = [
    {
      title: `Film1`,
      poster: `./images/posters/made-for-each-other.png`,
      description: generateDescription(),
      comments: generateComments(),
      date: generateDate(),
      raiting,
      year,
      genre
    },
    {
      title: `Film2`,
      poster: `./images/posters/popeye-meets-sinbad.png`,
      description: generateDescription(),
      comments: generateComments(),
      date: generateDate(),
      raiting,
      year,
      genre
    },
    {
      title: `Film3`,
      poster: `./images/posters/sagebrush-trail.jpg`,
      description: generateDescription(),
      comments: generateComments(),
      date: generateDate(),
      raiting,
      year,
      genre
    },
    {
      title: `Film4`,
      poster: `./images/posters/santa-claus-conquers-the-martians.jpg`,
      description: generateDescription(),
      comments: generateComments(),
      date: generateDate(),
      raiting,
      year,
      genre
    },
    {
      title: `Film5`,
      poster: `./images/posters/the-dance-of-life.jpg`,
      description: generateDescription(),
      comments: generateComments(),
      date: generateDate(),
      raiting,
      year,
      genre
    },
    {
      title: `Film6`,
      poster: `./images/posters/the-great-flamarion.jpg`,
      description: generateDescription(),
      comments: generateComments(),
      date: generateDate(),
      raiting,
      year,
      genre
    },
    {
      title: `Film7`,
      poster: `./images/posters/the-man-with-the-golden-arm.jpg`,
      description: generateDescription(),
      comments: generateComments(),
      date: generateDate(),
      raiting,
      year,
      genre
    }
  ];
  const randomIndex = getRandomInteger(0, serverFilms.length - 1);
  return serverFilms[randomIndex];
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

  const emoutions = [
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
          emoution: getRandomInteger(0, emoutions.length - 1),
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

export const generateServerFilmCard = () => {
  const film = generateFilm();
  const {title, poster, raiting, year, genre} = film;
  const description = generateDescription();
  const comments = generateComments();
  const date = generateDate();
  return {
    title,
    poster,
    description,
    comments,
    date,
    raiting,
    year,
    genre
  };
};
