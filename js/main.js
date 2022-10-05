
const getRandomIntInclusive = (minValue, maxValue) => {

  const isNegative = (value) => value < 0;
  if (isNegative(minValue)) {
    throw new RangeError('Параметр должен меньше 0' ) ;
  }
  if (isNegative(maxValue)) {
    throw new RangeError('Параметр должен меньше 0' ) ;
  }


  if (!Number.isFinite(minValue) || !Number.isFinite(maxValue)) {
    return NaN;
  }

  let min = Math.min(minValue, maxValue);
  let max = Math.max(minValue, maxValue);
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomFloat = (minValue, maxValue, digits = 1) => {
  if (minValue < 0 || maxValue < 0 || digits < 0) {
    return NaN;
  }

  if (
    !Number.isFinite(minValue) ||
    !Number.isFinite(maxValue) ||
    !Number.isInteger(digits)
  ) {
    return NaN;
  }

  const min = Math.min(minValue, maxValue);
  const max = Math.max(minValue, maxValue);
  const res = Math.random() * (max - min) + min;
  return Number(res.toFixed(digits));
};


getRandomIntInclusive(-1, 1);
getRandomFloat(0, 10, 2);
