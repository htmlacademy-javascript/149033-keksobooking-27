const adFormElement = document.querySelector('.ad-form');
const mapFilterElement = document.querySelector('.map__filters');

const setAdFormDisabled = (flagDisabled) => {
  adFormElement.classList.toggle('.ad-form--disabled');
  [...adFormElement.children].forEach((item) => {
    item.disabled = flagDisabled;
  });
};

const setMapFilterDisabled = (flagDisabled) => {
  mapFilterElement.classList.toggle('.ad-form--disabled');
  [...mapFilterElement.children].forEach((item) => {
    item.disabled = flagDisabled;
  });
};

const setAdFormOff = () => setAdFormDisabled(true);
const setAdFormOn = () => setAdFormDisabled(false);
const setMapFilterOff = () => setMapFilterDisabled(true);
const setMapFilterOn = () => setMapFilterDisabled(false);
const setPageOn = () => {
  setAdFormOn();
  setMapFilterOn();
};
const setPageOff = () => {
  setAdFormOff();
  setMapFilterOff();
};


export { setPageOn, setPageOff };
