const LIMIT_ADS = 10;
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;

const filterForm = document.querySelector('.map__filters');
const housingTypeSelectElement = filterForm.querySelector('#housing-type');
const housingPriceSelectElement = filterForm.querySelector('#housing-price');
const housingRoomsSelectElement = filterForm.querySelector('#housing-rooms');
const housingGuestsSelectElement = filterForm.querySelector('#housing-guests');
const getAnyPrice = () => true;
const getToLowPrice = (priceInterval) => priceInterval < LOW_PRICE;
const getBetweenLowAndHightPrice = (priceInterval) => priceInterval >= LOW_PRICE && priceInterval < HIGH_PRICE;
const getAboveHightPrice = (priceInterval) => priceInterval >= HIGH_PRICE;
const priceIntervals = {
  any: getAnyPrice,
  low: getToLowPrice,
  middle: getBetweenLowAndHightPrice,
  high: getAboveHightPrice
};
const isTypeSelected = (ad, type) => type === 'any' || ad.offer.type === type;
const isPriceSelected = (ad, priceInterval) => priceIntervals[priceInterval](ad.offer.price);

const isRoomsSelected = (ad, rooms) => rooms === 'any' || ad.offer.rooms === Number(rooms);
const isGuestsSelected = (ad, guests) => guests === 'any' || ad.offer.guests === Number(guests);
const isFeaturesSelected = (ad, features) => {
  if(!features.length) {
    return true;
  }
  if(!ad.offer.features) {
    return false;
  }
  return features.every((feature) => ad.offer.features.includes(feature));
};


const getFilteredAds = (ads) => {
  const type = housingTypeSelectElement.value;
  const price = housingPriceSelectElement.value;
  const rooms = housingRoomsSelectElement.value;
  const guests = housingGuestsSelectElement.value;
  const housingFeaturesElements = filterForm.querySelectorAll('.map__checkbox:checked');
  const features = Array.from(housingFeaturesElements).map((el) => el.value);

  const filteredAds = [];
  for(const ad of ads) {
    if (filteredAds.length >= LIMIT_ADS) {
      break;
    }
    if (
      isTypeSelected(ad, type) &&
      isPriceSelected(ad, price) &&
      isRoomsSelected(ad, rooms) &&
      isGuestsSelected(ad, guests) &&
      isFeaturesSelected(ad, features)
    ) {
      filteredAds.push(ad);
    }
  }
  return filteredAds;
};

export { getFilteredAds };
