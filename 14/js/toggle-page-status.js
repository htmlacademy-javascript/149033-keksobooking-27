const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');

const setAdFormDisabled = (flagDisabled) => {
  adForm.classList.toggle('.ad-form--disabled');
  [...adForm.children].forEach((item) => {
    item.disabled = flagDisabled;
  });
};

const setMapFilterDisabled = (flagDisabled) => {
  mapFilter.classList.toggle('.ad-form--disabled');
  [...mapFilter.children].forEach((item) => {
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


export {setPageOn, setPageOff,setAdFormOff, setAdFormOn, setMapFilterOff, setMapFilterOn};
