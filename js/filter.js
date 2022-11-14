const LIMIT_ADS = 10;
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;

const filterForm = document.querySelector('.map__filters');
const housingTypeSelect = filterForm.querySelector('#housing-type');
const housingPriceSelect = filterForm.querySelector('#housing-price');
const housingRoomsSelect = filterForm.querySelector('#housing-rooms');
const housingGuestsSelect = filterForm.querySelector('#housing-guests');

const isTypeSelected = (ad, type) => type === 'any' || ad.offer.type === type;
const isPriceSelected = (ad, price) => {
  switch (price) {
    case 'any':
      return true;
    case 'low':
      return ad.offer.price < LOW_PRICE;
    case 'middle':
      return ad.offer.price >= LOW_PRICE && ad.offer.price < HIGH_PRICE;
    case 'high':
      return ad.offer.price >= HIGH_PRICE;
  }
};
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
  const type = housingTypeSelect.value;
  const price = housingPriceSelect.value;
  const rooms = housingRoomsSelect.value;
  const guests = housingGuestsSelect.value;
  const housingFeatures = filterForm.querySelectorAll('.map__checkbox:checked');
  const features = Array.from(housingFeatures).map((el) => el.value);

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

export {getFilteredAds};
