const isPositiveArgument = (value) => value >= 0;
const isFiniteNumber = (value) => Number.isFinite(value);
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const isValidArguments = (minValue, maxValue) => {
  if (
    isPositiveArgument(minValue) &&
    isPositiveArgument(maxValue) &&
    isFiniteNumber(minValue) &&
    isFiniteNumber(maxValue)
  ) {return true;}
  throw new RangeError('Прверьте аргументы');
};
const isVildTypeImg = (fileName) => FILE_TYPES.some((it) => fileName.endsWith(it));
export {isValidArguments, isVildTypeImg};
