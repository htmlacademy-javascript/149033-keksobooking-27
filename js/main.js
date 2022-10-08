const isNegativeArgument = (value) => value < 0;
const isNoFiniteNumber = (value) => !Number.isFinite(value);
const isValidArguments = (minValue, maxValue) => {
  if (isNegativeArgument(minValue)) {
    throw new RangeError(`${minValue} меньше 0`);
  }
  if (isNegativeArgument(maxValue)) {
    throw new RangeError(`${maxValue} меньше 0`);
  }
  if (isNoFiniteNumber(minValue)) {
    throw new RangeError(`Проверьте значение ${minValue} введеного аргумента`);
  }
  if (isNoFiniteNumber(maxValue)) {
    throw new RangeError(`Проверьте значение ${maxValue} введеного аргумента`);
  }
};

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

getRandomIntInclusive(1, 1);
getRandomFloat(0, 10, 2);

