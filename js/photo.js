import { isVildTypeImg } from './valid-arguments.js';
const DEFAULT_PREVIEW = 'img/muffin-grey.svg';
const adForm = document.querySelector('.ad-form');
const fileAvatar = adForm.querySelector('#avatar');
const previewAvatar = adForm.querySelector('.ad-form-header__preview');
const uploaderImg = adForm.querySelector('#images');
const photoAdForm = adForm.querySelector('.ad-form__photo');

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
  if (file && isVildTypeImg(fileName)) {
    const img = previewImg.querySelector('img') ?? createdElementImg(previewImg);
    img.src = URL.createObjectURL(file);
  }
};
const fileAvatarChangeHandler = () => {
  imgChangeHandler(fileAvatar, previewAvatar);
};
const uploaderImgChangeHandler = () => {
  imgChangeHandler(uploaderImg, photoAdForm);
};

const setOnImgChangeHandler = () => {
  fileAvatar.addEventListener('change', fileAvatarChangeHandler);
  uploaderImg.addEventListener('change', uploaderImgChangeHandler);
};

const resetImgAvatar = () => {
  previewAvatar.querySelector('img').src = DEFAULT_PREVIEW;
  photoAdForm.innerHTML = '';

};
export { setOnImgChangeHandler, resetImgAvatar };
