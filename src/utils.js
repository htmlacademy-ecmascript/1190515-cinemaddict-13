import dayjs from "dayjs";
// import Abstract from "./view/abstract";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomDate = () => {
  const maxDaysGasp = 7;
  const daysGap = getRandomInteger(-maxDaysGasp, maxDaysGasp);

  return dayjs().add(daysGap, `day`).toDate();
};

const DatesDraft = {
  YEAR: {
    FILM: [dayjs().year(), 1900],
  },
  MONTH: [11, 0],
  DAY: [31, 1],
};

export const humanizeDate = () => {
  const randomYear = getRandomInteger(...DatesDraft.YEAR.FILM);
  const randomMonth = getRandomInteger(...DatesDraft.MONTH);
  const randomDay = getRandomInteger(...DatesDraft.DAY);
  return dayjs(new Date(randomYear, randomMonth, randomDay)).format(`DD MMMM YYYY`);
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

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// export const renderTemplate = (container, child, place) => {
//   if (container instanceof Abstract) {
//     container = container.getElement();
//   }

//   if (child instanceof Abstract) {
//     child = child.getElement();
//   }

//   switch (place) {
//     case RenderPosition.AFTERBEGIN:
//       container.prepend(child);
//       break;
//     case RenderPosition.BEFOREEND:
//       container.append(child);
//       break;
//   }
// };
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
