import {getRandomArrayItem, getRandomDate} from '../utils';

const authors = [
  `Tim`,
  `John`,
  `Frank`
];

const comments = [
  `Booo`,
  `Wow!`,
  `Greate!`
];

const emojies = [
  `./images/emoji/smile.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/angry.png`,
  `./images/emoji/sleeping.png`
];

const generateComment = () => {
  return {
    reaction: getRandomArrayItem(emojies),
    author: getRandomArrayItem(authors),
    text: getRandomArrayItem(comments),
    postedDate: getRandomDate(),
  };
};

export const generateComments = (length) => {
  return new Array(length).fill().map(generateComment);
};
