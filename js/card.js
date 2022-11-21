const cardPopupElement = document.querySelector('#card').content.querySelector('.popup');

const offerTypeInRU = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const renderFuture = (cardElement, features) => {
  const popupFeatureElement = cardElement.querySelector('.popup__features');
  popupFeatureElement.innerHTML = '';
  if (features && features.length) {
    features.forEach((item) => {
      const featureItemElement = document.createElement('li');
      featureItemElement.classList.add('popup__feature');
      featureItemElement.classList.add(`popup__feature--${item}`);
      popupFeatureElement.append(featureItemElement);
    });
  }
};

const renderPhoto = (cardElement, photos) => {
  const popupPhotosElement = cardElement.querySelector('.popup__photos');
  const popupPhotoElement = cardElement.querySelector('.popup__photo');
  if (!(photos && photos.length)) {
    return popupPhotosElement.remove();
  }
  photos.forEach((photo) => {
    const photoTemp = popupPhotoElement.cloneNode(true);
    photoTemp.setAttribute('src', photo);
    popupPhotosElement.append(photoTemp);
  });
  popupPhotoElement.remove();
};

const renderDiscription = (cardElement, description) => {
  const popupDescriptionElement = cardElement.querySelector('.popup__description');
  if (!(description && description.length)) {
    return popupDescriptionElement.remove();
  }
  popupDescriptionElement.textContent = description;
};

const renderAvatar = (cardElement, avatar) => {
  const popupAvatarElement = cardElement.querySelector('.popup__avatar');
  if (avatar) {
    return popupAvatarElement.setAttribute('src', avatar);
  }
  popupAvatarElement.remove();
};

const renderTitle = (cardElement, title) => {
  const popupTitleElement = cardElement.querySelector('.popup__title');
  if (!title) {
    return popupTitleElement.remove();
  }
  popupTitleElement.textContent = title;
};

const renderAddress = (cardElement, address) => {
  const popupAddressElement = cardElement.querySelector('.popup__text--address');
  if (!address) {
    return popupAddressElement.remove();
  }
  popupAddressElement.textContent = address;
};

const renderPrice = (cardElement, price) => {
  const popupPriceElement = cardElement.querySelector('.popup__text--price');
  if (!price) {
    return popupPriceElement.remove();
  }
  popupPriceElement.firstChild.textContent = `${price} `;
};

const renderType = (cardElement, type) => {
  const popupTypeElement = cardElement.querySelector('.popup__type');
  if (!type) {
    return popupTypeElement.remove();
  }
  popupTypeElement.textContent = offerTypeInRU[type];
};
const renderCapacity = (cardElement, rooms, guests) => {
  const popupCapacityElement = cardElement.querySelector('.popup__text--capacity');
  if (!(rooms && guests)) {
    return popupCapacityElement.remove();
  }
  popupCapacityElement.textContent = `${rooms} комнаты для ${guests} гостей`;
};
const renderTime = (cardElement, checkin, checkout) => {
  const popupTimeElement = cardElement.querySelector('.popup__text--time');
  if (!(checkin && checkout)) {
    return popupTimeElement.remove();
  }
  popupTimeElement.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
};

const creatAd = ({
  offer: { title, address, price, type, rooms, guests, checkin, checkout, features, photos, description },
  author: { avatar },
}) => {
  const cardElement = cardPopupElement.cloneNode(true);
  renderAvatar(cardElement, avatar);
  renderTitle(cardElement, title);
  renderAddress(cardElement, address);
  renderPrice(cardElement, price);
  renderType(cardElement, type);
  renderCapacity(cardElement, rooms, guests);
  renderTime(cardElement, checkin, checkout);

  renderFuture(cardElement, features);
  renderPhoto(cardElement, photos);
  renderDiscription(cardElement, description);
  return cardElement;
};

export { creatAd };
