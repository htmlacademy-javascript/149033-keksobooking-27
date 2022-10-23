const adForm = document.querySelector('.ad-form');

const setAdFormDisabled = (flagDisabled) => {
  adForm.classList.toggle('.ad-form--disabled');
  [...adForm.children].forEach((item) => {
    item.disabled = flagDisabled;
  });
};
const setAdFormOff = () => setAdFormDisabled(true);
const setAdFormOn = () => setAdFormDisabled(false);

export {setAdFormOff, setAdFormOn};
