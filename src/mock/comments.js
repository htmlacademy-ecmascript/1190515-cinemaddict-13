import {getRandomArrayItem, generateDate, getRandomInteger} from "../utils";

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

const emotion = [
  `./images/emoji/smile.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/angry.png`,
  `./images/emoji/sleeping.png`
];

export const generateComments = () => {
  const result = [];
  const commentsCount = getRandomInteger(0, 5);
  for (let i = 0; i < commentsCount; i++) {
    result.push({
      emotion: getRandomArrayItem(emotion),
      author: getRandomArrayItem(authors),
      text: getRandomArrayItem(comments),
      commentDate: generateDate(),
    });
  }
  return result;
};
