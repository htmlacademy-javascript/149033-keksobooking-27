const isPositiveArgument = (value) => value >= 0;
const isFiniteNumber = (value) => Number.isFinite(value);
const isValidArguments = (minValue, maxValue) => {
  if (
    isPositiveArgument(minValue) &&
    isPositiveArgument(maxValue) &&
    isFiniteNumber(minValue) &&
    isFiniteNumber(maxValue)
  ) {return true;}
  throw new RangeError('Прверьте аргументы');
};

export {isValidArguments};
