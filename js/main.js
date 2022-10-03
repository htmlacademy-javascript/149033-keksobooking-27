
// пример getRandomIntInclusive() из https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(number1, number2) {
  if (number1 < 0 || number2 < 0) {
    return NaN;
  }
  let min = (number1 <= number2) ? number1 : number2;
  let max = (number1 > number2) ? number1 : number2;
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

getRandomIntInclusive(-1,1);
