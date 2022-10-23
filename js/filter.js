const mapFilter = document.querySelector('.map__filters');

const setMapFilterDisabled = (flagDisabled) => {
  mapFilter.classList.toggle('.ad-form--disabled');
  [...mapFilter.children].forEach((item) => {
    item.disabled = flagDisabled;
  });
};
const setMapFilterOff = () => setMapFilterDisabled(true);
const setMapFilterOn = () => setMapFilterDisabled(false);

export {setMapFilterOff, setMapFilterOn};
