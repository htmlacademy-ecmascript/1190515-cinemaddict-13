import {
  getRandomNumber,
  getRandomIntegerNumber,
  getRandomDate,
  getRandomArrayElements,
  getRandomArrayItem,
  generateArray,
} from "../utils/render";
import {nanoid} from "nanoid";

const MIN_DATE = new Date(2021, 1, 27);
const MIN_СOMMENTS = 5;


const Titles = [
  `Knok' on heaven doors`,
  `Fight club`,
  `Back to the Future`,
  `Ghostbusters`,
  `The Gentlemen`,
  `Green book`,
];

const Descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
];

const Posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const DIRECTORS = [
  `Steven Spielberg`,
  `Martin Scorsese`,
  `Alfred Hitchcock`,
  `Stanley Kubrick`,
  `Quentin Tarantino`,
  `Peter Jackson`,
];

const WRITERS = [
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Ethan Coen and Joel Coen`,
  `Francis Ford Coppola`,
  `Quentin Tarantino`,
];

const ACTORS = [
  `Jack Nicholson`,
  `Tom Hardy`,
  `Joaquin Phoenix`,
  `Christian Bale`,
  `Johnny Depp`,
  `Brad Pitt`,
  `Andjelina Joly`
];

const COUNTRIES = [
  `USA`,
  `Canada`,
  `Russia`,
  `Italy`,
  `Poland`,
  `Japan`,
];

const EMOJIS = [
  `smile`,
  `angry`,
  `puke`,
  `sleeping`,
];

const AUTHORS = [
  `Movie Maker`,
  `Kitty`,
  `Boom_pow_wow`,
  `Serinity`,
  `Magnolia_Fan`,
  `Kevin_Smith`,
  `Arnie`,
];

const texts = [
  `10 из 10!`,
  `WTF???!`,
  `Актёры ужасные, режиссёрская работа отвратительная, саундтрек хуже некуда, сюжета нет.`,
  `Я заснул...`,
  `Под пивко сойдёт!`,
  `Хорошо провел время`,
  `Вот так вот!`,
  `Фигня`,
  `Это ШЕДЕВР!`,
  `Я-я-я-я-ЗЬ!`,
  `Я вообще ничего не понимаю.`,
  `Годнота, всем рекомендую.`,
  `Фильм ацтой! `,
];

const FILM_GENRES = [
  `Horror`,
  `Action`,
  `Adventure`,
  `Musical`,
  `Comedy`,
  `Thriller`,
  `Detective`,
  `Anime`,
  `Drama`,
  `Melodrama`,
  `Art house`,
  `Fantasy`,
  `Space opera`,
];

const filmAges = [`6+`, `12+`, `16+`, `18+`];

const DescriptionLength = {
  MIN: 1,
  MAX: 5,
};
const CommentParameter = {
  MIN: 0,
  MAX: 20,
  YEAR: 1970,
  MONTH: 0,
  DAY: 1,
};

const RatingParameter = {
  MIN: 0,
  MAX: 10,
  FIXED: 1,
};

const DurationParameter = {
  MIN: 80,
  MAX: 240,
};

const GenreParameter = {
  MIN: 1,
  MAX: 3,
};

const WriterParameter = {
  MIN: 1,
  MAX: 3,
};

const ActorParameter = {
  MIN: 2,
  MAX: 6
};

const FilmStartDate = {
  YEAR: 1900,
  MONTH: 0,
  DAY: 1,
};

const generateFilmComment = () => {
  const commentDate = getRandomDate(new Date(CommentParameter.YEAR, CommentParameter.MONTH, CommentParameter.DAY), new Date());
  return {
    id: nanoid(MIN_СOMMENTS),
    emoji: getRandomArrayItem(EMOJIS),
    text: getRandomArrayItem(texts),
    author: getRandomArrayItem(AUTHORS),
    date: commentDate,
  };
};

const generateFilmCard = () => {
  const filmDate = getRandomDate(new Date(FilmStartDate.YEAR, FilmStartDate.MONTH, FilmStartDate.DAY), new Date());
  return {
    id: nanoid(),
    title: getRandomArrayItem(Titles),
    poster: getRandomArrayItem(Posters),
    description: getRandomArrayElements(Descriptions, DescriptionLength.MIN, DescriptionLength.MAX).join(` `),
    comments: generateArray(getRandomIntegerNumber(CommentParameter.MIN, CommentParameter.MAX), generateFilmComment),
    rating: getRandomNumber(RatingParameter.MIN, RatingParameter.MAX).toFixed(RatingParameter.FIXED),
    release: filmDate,
    duration: getRandomIntegerNumber(DurationParameter.MIN, DurationParameter.MAX),
    genres: getRandomArrayElements(FILM_GENRES, GenreParameter.MIN, GenreParameter.MAX),
    age: getRandomArrayItem(filmAges),
    director: getRandomArrayItem(DIRECTORS),
    writers: getRandomArrayElements(WRITERS, WriterParameter.MIN, WriterParameter.MAX),
    actors: getRandomArrayElements(ACTORS, ActorParameter.MIN, ActorParameter.MAX),
    country: getRandomArrayItem(COUNTRIES),
    controls: {
      isInFavorites: Boolean(getRandomIntegerNumber()),
      isInWatchlist: Boolean(getRandomIntegerNumber()),
      isInHistory: Boolean(getRandomIntegerNumber()),
    },
    watchingDate: getRandomDate(MIN_DATE, new Date()),
  };
};

export const generateFilmsCard = (count) => generateArray(count, generateFilmCard);
