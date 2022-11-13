import {isValidArguments} from './valid-arguments.js';

const getRandomIntInclusive = (minValue, maxValue) => {
  isValidArguments(minValue, maxValue);

  let min = Math.min(minValue, maxValue);
  let max = Math.max(minValue, maxValue);
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomFloat = (minValue, maxValue, digits = 1) => {
  isValidArguments(minValue, maxValue);

  const min = Math.min(minValue, maxValue);
  const max = Math.max(minValue, maxValue);
  const res = Math.random() * (max - min) + min;
  return Number(res.toFixed(digits));
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const shuffleRandomLength = (array) => shuffle(array).slice( getRandomIntInclusive(0, array.length - 1) );

const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomIntInclusive, getRandomFloat, shuffleRandomLength, getRandomArrayElement, debounce};
