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
const isSet = (arg) => arg ?? 'отсутствует описание';

advertisements.forEach((element) => {
  const advertisement = advertismentTemplate.cloneNode(true);

  const {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    features,
    description,
    photos,
  } = element.offer;

  advertisement.querySelector('.popup__title').textContent = isSet(title);
  advertisement.querySelector('.popup__text--address').textContent = isSet(address);
  advertisement.querySelector('.popup__text--price').textContent = `${isSet(price)} ₽/ночь`;
  advertisement.querySelector('.popup__type').textContent = isSet( offerTypeInRU[type] );
  advertisement.querySelector('.popup__text--capacity').textContent = `${isSet(rooms)} комнаты для ${isSet(guests)} гостей`;
  advertisement.querySelector('.popup__text--time').textContent = `Заезд после ${isSet(checkin)}, выезд до ${isSet(checkout)}`;

  const featuresTemplate = advertisement.querySelector('.popup__features');
  featuresTemplate.innerHTML = '';
  features.forEach((item) => {
    const featureItem = document.createElement('li');
    featureItem.classList.add('popup__features');
    featureItem.classList.add(`popup__features--${item}`);
    featureItem.textContent = isSet(item);
    featuresTemplate.append(featureItem);
  });

  advertisement.querySelector('.popup__description').textContent = isSet(description);
  const popupPhotos = advertisement.querySelector('.popup__photos');
  const popupPhoto = advertisement.querySelectorAll('.popup__photo');

  photos.forEach((photo) => {
    const photoTemp = popupPhoto[0].cloneNode(true);
    photoTemp.setAttribute('src', photo);
    popupPhotos.append(photoTemp);
  });
  popupPhotos.children[0].remove();

  if (element.author.avatar === undefined) {
    advertisement
      .querySelector('.popup__avatar')
      .setAttribute('alt', 'отсутвует описание');
  }
  advertisement
    .querySelector('.popup__avatar')
    .setAttribute('src', element.author.avatar);

  fragment.append(advertisement);
});

mapCanvas.append(fragment.childNodes[0]);
