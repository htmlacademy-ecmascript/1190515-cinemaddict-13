export const LOREM_TEXT_PLACEHOLDER = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

export const DESCRIPTION_MAX_LENGTH = 5;
export const MAX_RATING_IN_PERCENTS = 100;

export const userRankStrings = {
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`,
};

export const EXTRA_LIST_TOP_RATED_KEY = `topRated`;
export const EXTRA_LIST_MOST_COMMENTED_KEY = `mostCommented`;

export const extraListsTitles = {
  [EXTRA_LIST_TOP_RATED_KEY]: `Top rated`,
  [EXTRA_LIST_MOST_COMMENTED_KEY]: `Most commented`,
};

export const filterTypeKeys = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

export const filterTypes = {
  [filterTypeKeys.ALL]: {
    link: `#all`,
    signature: `All Items`,
  },
  [filterTypeKeys.WATCHLIST]: {
    link: `#watchilst`,
    signature: `Watchlist`,
  },
  [filterTypeKeys.HISTORY]: {
    link: `#watchilst`,
    signature: `History`,
  },
  [filterTypeKeys.FAVORITES]: {
    link: `#watchilst`,
    signature: `Favorites`,
  },
};

export const filmsMockData = {
  titles: [
    `Made for each other`,
    `Popeye meets sinbad`,
    `Sagebrush trail`,
    `Santa claus conquers the martians`,
    `The dance of life`,
    `The great flamarion`,
    `The man with the golden arm`,
  ],

  posters: [
    `./images/posters/made-for-each-other.png`,
    `./images/posters/popeye-meets-sinbad.png`,
    `./images/posters/sagebrush-trail.jpg`,
    `./images/posters/santa-claus-conquers-the-martians.jpg`,
    `./images/posters/the-dance-of-life.jpg`,
    `./images/posters/the-great-flamarion.jpg`,
    `./images/posters/the-man-with-the-golden-arm.jpg`,
  ],

  genres: [
    `Musical`,
    `Western`,
    `Drama`,
    `Comedy`,
    `Cartoon`,
    `Mystery`,
  ],

  names: [
    `Anthony Mannet`,
    `Anne Wigton`,
    `Heinz Herald`,
    `Richard Weil`,
    `Erich von Stroheim`,
    `Mary Beth Hughes`,
    `Dan Duryea`,
  ],

  countries: [
    `USA`,
    `Russia`,
    `Germany`,
    `France`,
  ],
};

