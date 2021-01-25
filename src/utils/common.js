import dayjs from "dayjs";
//

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomItemFromArray = (array) => {
  const min = 0;
  const max = array.length;
  return array[getRandomNumber(min, max)];
};

const formatDateTime = (date) => {
  return dayjs(date).format(`DD MMMM YYYY`);
};

const formatFilmDuration = (movieDuration) => {
  return dayjs().minute(movieDuration).format(`h[h] m[m]`);
};

// const formatFilmDurationForStatistic = (movieDuration) => {
//   return dayjs().duration(movieDuration, `minutes`).format(`h:m`);
// };

const sortByDesc = (a, b) => {
  return b - a;
};

export {getRandomNumber, getRandomItemFromArray, formatDateTime, sortByDesc, formatFilmDuration};
