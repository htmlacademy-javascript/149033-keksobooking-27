import { creatListAdvertisement } from './data.js';

const card = document.querySelector('#card').content;
const advertismentTemplate = card.querySelector('.popup');

const mapCanvas = document.querySelector('#map-canvas');

const advertisements = creatListAdvertisement();

const fragment = document.createDocumentFragment();

const offerTypeInRU = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};

const isValidNode = (nodeItem, arg) => arg ?? nodeItem.remove();

const setPopupFuture = (popup, features) => {
  const featuresTemplate = popup.querySelector('.popup__features');
  featuresTemplate.innerHTML = '';
  features.forEach((item) => {
    const featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add(`popup__feature--${item}`);
    featuresTemplate.append(featureItem);
  });
};

const setPopupPhoto = (popup, photos) => {
  const popupPhotos = popup.querySelector('.popup__photos');
  const popupPhoto = popup.querySelector('.popup__photo');

  photos.forEach((photo) => {
    const photoTemp = popupPhoto.cloneNode(true);
    photoTemp.setAttribute('src', photo);
    popupPhotos.append(photoTemp);
  });
  popupPhoto.remove();
};

const creatAdvertisement = (advertisement) => {
  const popup = advertismentTemplate.cloneNode(true);
  const offer = advertisement.offer;
  const author = advertisement.author;

  popup.querySelector('.popup__avatar').setAttribute('src', author.avatar);
  popup.querySelector('.popup__title').textContent = offer.title;
  popup.querySelector('.popup__text--address').textContent = offer.address;
  popup.querySelector('.popup__title').textContent = offer.title;
  popup.querySelector('.popup__text--address').textContent = offer.address;
  popup.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  popup.querySelector('.popup__type').textContent = offerTypeInRU[offer.type];
  popup.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  popup.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  setPopupFuture(popup, offer.features);
  setPopupPhoto(popup, offer.photos);
  popup.querySelector('.popup__description').textContent = offer.description;
  return popup;
};

// const creatAdvertisements = (advertisementItems) => {
//   console.log();
//   creatAdvertisement(advertisementItem));
//   return list1;

// };


console.log(creatAdvertisements(advertisements));

fragment.append(creatAdvertisements(advertisements));
//fragment.append(creatAdvertisements(advertisements));
mapCanvas.append(fragment.childNodes[1]);

// advertisements.forEach((element) => {
//   const advertisement = advertismentTemplate.cloneNode(true);

//   const {
//     title,
//     address,
//     price,
//     type,
//     rooms,
//     guests,
//     checkin,
//     checkout,
//     features,
//     description,
//     photos,
//   } = element.offer;

//   const popupTitle = advertisement.querySelector('.popup__title');
//   popupTitle.textContent = isValidNode(popupTitle, title);

//   const popupAddress = advertisement.querySelector('.popup__text--address');
//   popupAddress.textContent = isValidNode(popupAddress, address);

//   const popupPrice = advertisement.querySelector('.popup__text--price');
//   popupPrice.textContent = `${isValidNode(popupPrice,price)} ₽/ночь`;

//   const popupType = advertisement.querySelector('.popup__type');
//   popupType.textContent = isValidNode(popupType,offerTypeInRU[type]);

//   const popupCapacity = advertisement.querySelector('.popup__text--capacity');
//   isValidNode(popupCapacity,rooms);
//   isValidNode(popupCapacity,guests);
//   popupCapacity.textContent = `${rooms} комнаты для ${guests} гостей`;

//   const popupTime = advertisement.querySelector('.popup__text--time');
//   isValidNode(popupTime,checkin);
//   isValidNode(popupTime,checkout);
//   popupTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;

//   const featuresTemplate = advertisement.querySelector('.popup__features');
//   featuresTemplate.innerHTML = '';
//   features.forEach((item) => {
//     const featureItem = document.createElement('li');
//     featureItem.classList.add('popup__features');
//     featureItem.classList.add(`popup__features--${item}`);
//     featureItem.textContent = item;
//     if(item !== undefined) {
//       featuresTemplate.append(featureItem);
//     }
//   });

//   const popupDescription = advertisement.querySelector('.popup__description');
//   popupDescription.textContent = isValidNode(popupDescription,description);

//   const popupPhotos = advertisement.querySelector('.popup__photos');
//   const popupPhoto = advertisement.querySelectorAll('.popup__photo');

//   photos.forEach((photo) => {
//     const photoTemp = popupPhoto[0].cloneNode(true);
//     photoTemp.setAttribute('src', photo);
//     popupPhotos.append(photoTemp);
//   });
//   popupPhotos.children[0].remove();

//   const popupAvatar = advertisement.querySelector('.popup__avatar');
//   isValidNode(popupAvatar,element.author.avatar);
//   popupAvatar.setAttribute('src', element.author.avatar);

//   fragment.append(advertisement);
// });
