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

const LIST_ADVERTISEMENT_LENGTH = 10;
const TITLE_OFFER = [
  'Сдаю в аренду',
  'Хорошое жилье',
  'Принимаю гостей',
  'Жилье в любое время',
];
const Location = {
  MIN_LONGITUDE: 139.7,
  MAX_LONGITUDE: 139.8,
  MIN_LATITUDE: 35.65,
  MAX_LATITUDE: 35.7
};
const TYPE_OF_REALTY = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const PRICE_LIMIT = 999999999;
const ROOMS_LIMIT = 50;
const NUMBER_GUESTS_LIMIT = 100;
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES_OFFERS = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRITION_OFFERS = [
  'Рядом с метро',
  'Хорошый вид из окна',
  'Удобная парковка',
];
const PHOTOS_OFFERS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];


const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const shuffleRandomLength = (array) => shuffle(array).slice( getRandomIntInclusive(0, array.length - 1) );

const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

const createAdvertisement = () => {
  const lat = getRandomFloat(Location.MIN_LATITUDE, Location.MAX_LATITUDE, 5);
  const lng = getRandomFloat(Location.MIN_LONGITUDE, Location.MAX_LONGITUDE, 5);
  return {
    author: {
      avatar: `img/avatars/user{{${String(
        getRandomIntInclusive(1, 10)
      ).padStart(2, '0')}}.png`,
    },
    offer: {
      title: `${getRandomArrayElement(TITLE_OFFER)}`,
      address: `{{${lat}}}},{{${lng}}}`,
      price: `${getRandomIntInclusive(0, PRICE_LIMIT)}`,
      type: `${getRandomArrayElement(TYPE_OF_REALTY)}`,
      rooms: `${getRandomIntInclusive(0, ROOMS_LIMIT)}`,
      guests: `${getRandomIntInclusive(0, NUMBER_GUESTS_LIMIT)}`,
      checkin: `${getRandomArrayElement(CHECKIN)}`,
      checkout: `${getRandomArrayElement(CHECKOUT)}`,
      features: shuffleRandomLength(FEATURES_OFFERS),
      description: `${getRandomArrayElement(DESCRITION_OFFERS)}`,
      photos: shuffleRandomLength(PHOTOS_OFFERS),
    },
    location: {
      lat: lat,
      lng: lng,
    },
  };
};

const creatListAdvertisement = Array.from(
  { length: LIST_ADVERTISEMENT_LENGTH },
  createAdvertisement
);

creatListAdvertisement();
