
function getRandomIntInclusive(number1, number2) {
  if (number1 < 0 || number2 < 0 ) {
    return NaN;
  }

  if (!Number.isFinite(number1) || !Number.isFinite(number2) ) {
    return NaN;
  }

  let min = (number1 <= number2) ? number1 : number2;
  let max = (number1 > number2) ? number1 : number2;
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomCoordinatesFloat(number1, number2, digits = 1) {
  if (number1 < 0 || number2 < 0 || digits < 0) {
    return NaN;
  }

  if (!Number.isFinite(number1) || !Number.isFinite(number2) || !Number.isInteger(digits)) {
    return NaN;
  }

  const min = Math.min(number1,number2);
  const max = Math.max(number1,number2);
  const res = Math.random() * (max - min) + min;
  return Number(res.toFixed(digits));
}

getRandomIntInclusive(-1,1);
getRandomCoordinatesFloat(0, 10, 1);
