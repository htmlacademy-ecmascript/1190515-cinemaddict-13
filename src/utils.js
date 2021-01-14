import dayjs from "dayjs";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export let generateDate = (format) => {
  const maxDayGap = 3600;
  const daysGap = getRandomInteger(-maxDayGap, +maxDayGap);
  const date = dayjs().add(daysGap, `day`).toDate();
  return dayjs(date).format(format);
};

export const getRandomArrayItem = (dataArray) => {
  const randomIndex = getRandomInteger(0, dataArray.length - 1);

  return dataArray[randomIndex];
};

export const getSeveralRandomArrayItems = (dataArray, maxItemsCount) => {
  const itemsCount = getRandomInteger(1, maxItemsCount);

  return [...dataArray].sort(() => 0.5 - Math.random()).slice(0, itemsCount);
};

export const truncateString = (value, length) => {
  return value.length > length ? `${value.slice(0, length)}...` : value;
};

export const POSITION = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

export const render = (container, element, place) => {
  switch (place) {
    case POSITION.AFTERBEGIN:
      container.prepend(element);
      break;
    case POSITION.BEFOREEND:
      container.append(element);
      break;
    // case POSITION.AFTEREND:
    //   container.after(element);
    //   break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const sortingByDesc = (a, b) => {
  return b - a;
};
