import {getRandomArrayItem, generateDate, getRandomInteger} from "../utils";

const AUTHORS = [
  `Tim`,
  `John`,
  `Frank`
];

const COMMENTS = [
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
