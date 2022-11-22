import { isValidTypeImg } from './valid-arguments.js';
const DEFAULT_PREVIEW = 'img/muffin-grey.svg';
const adFormElement = document.querySelector('.ad-form');
const fileAvatarElement = adFormElement.querySelector('#avatar');
const previewAvatarElement = adFormElement.querySelector('.ad-form-header__preview');
const uploaderImgElement = adFormElement.querySelector('#images');
const photoAdFormElement = adFormElement.querySelector('.ad-form__photo');

const createdElementImg = (element) => {
  element.innerHTML = '';
  const img = document.createElement('img');
  img.style.maxWidth = '100%';
  img.style.height = 'auto';
  element.append(img);
  return img;
};

const imgChangeHandler = (inputImg, previewImg) => {
  const file = inputImg.files[0];
  const fileName = file.name.toLowerCase();
  if (file && isValidTypeImg(fileName)) {
    const imgElement = previewImg.querySelector('img') ?? createdElementImg(previewImg);
    imgElement.src = URL.createObjectURL(file);
  }
};
const fileAvatarElementChangeHandler = () => {
  imgChangeHandler(fileAvatarElement, previewAvatarElement);
};
const uploaderImgElementChangeHandler = () => {
  imgChangeHandler(uploaderImgElement, photoAdFormElement);
};

const setOnImgChangeHandler = () => {
  fileAvatarElement.addEventListener('change', fileAvatarElementChangeHandler);
  uploaderImgElement.addEventListener('change', uploaderImgElementChangeHandler);
};

const resetImgAvatar = () => {
  previewAvatarElement.querySelector('img').src = DEFAULT_PREVIEW;
  photoAdFormElement.innerHTML = '';

};
export { setOnImgChangeHandler, resetImgAvatar };
