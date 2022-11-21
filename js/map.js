import { creatAd } from './card.js';
import { initialingTheMap } from './init-map.js';
import { getFilteredAds } from './filter.js';
import { debounce } from './util.js';
const MAIN_PIN_WIDTH_LENGTH = [52, 52];
const MAIN_PIN_ANCHOR_XY = [26, 52];
const PIN_WIDTH_LENGTH = [40, 40];
const PIN_ANCHOR_XY = [20, 40];
const DELAY_TIME = 2000;
const NUMBER_OF_DECIMAL_PLACES = 5;
const address = document.querySelector('#address');
const map = initialingTheMap();

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: MAIN_PIN_WIDTH_LENGTH,
  iconAnchor: MAIN_PIN_ANCHOR_XY,
});

const pinIcon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: PIN_WIDTH_LENGTH,
  iconAnchor: PIN_ANCHOR_XY,
});
const styleError = `
  background-color: white;
  color: red;
  position: absolute;
  width: 100%;
  text-align: center;
  z-index: 999 `;

const showErrorMessageMarkers = (err) => {
  const mapCanvas = document.querySelector('.map__canvas');
  const errorElement = document.createElement('div');
  errorElement.style.cssText = styleError;
  errorElement.textContent = `${err}`;
  const toggleError = () => errorElement.classList.toggle('hidden');
  setInterval(toggleError, DELAY_TIME);
  mapCanvas.append(errorElement);
};

const creatMainMarker = (currentMap, currentLatLng, icon) => {

  address.setAttribute('readonly', 'readonly');

  const mainMarker = L.marker(
    currentLatLng,
    {
      draggable: true,
      icon: icon,
    },
  );
  document.querySelector('#address').value = `${currentLatLng.lat.toFixed(NUMBER_OF_DECIMAL_PLACES)}, ${currentLatLng.lng.toFixed(NUMBER_OF_DECIMAL_PLACES)}`;

  return mainMarker;
};

let markerGroup;
const removeMarkerGroup = (markerGroupCurrent) => map.removeLayer(markerGroupCurrent);
const creatMarkers = (currentMap, mainIcon, ads) => {
  if(markerGroup) {
    removeMarkerGroup(markerGroup);
  }
  markerGroup = L.layerGroup().addTo(currentMap);
  const creatMarker = (ad) => {
    L.marker(
      ad.location,
      {
        icon: mainIcon,
      },
    ).addTo(markerGroup).bindPopup(creatAd(ad));
  };
  ads.forEach((ad) => {
    creatMarker(ad);
  });
  return markerGroup;
};

const latLng = map.getCenter();
const zoom = map.STARING_ZOOM;
const getCenterMap = () => map.getCenter();
const creatMainMarkerOnMap = () => creatMainMarker(map, latLng , mainPinIcon);
const filterElement = document.querySelector('.map__filters');

const setFilteredAdsOnMap = (ads) => {
  creatMarkers(map, pinIcon, getFilteredAds(ads));
};

const creatMarkersOnMap = (ads) => {
  creatMarkers(map, pinIcon, getFilteredAds(ads));
  filterElement.addEventListener('change', debounce( () => setFilteredAdsOnMap(ads) ));
};

const mainMarkerCurrent = creatMainMarker(map, latLng , mainPinIcon);
mainMarkerCurrent.addTo(map);
const markerMoveendHandler = (evt) => {
  const {lng, lat} = evt.target.getLatLng();
  address.value = `${lng.toFixed(5)},${lat.toFixed(5)}`;
};
mainMarkerCurrent.on('moveend', markerMoveendHandler).addTo(map);
const resetMainPinMarker = () => {
  map.closePopup();
  map.setView(new L.LatLng(latLng.lat, latLng.lng), zoom);
  mainMarkerCurrent.setLatLng(L.latLng(latLng));
};

export { creatMainMarkerOnMap, creatMarkersOnMap, showErrorMessageMarkers, getCenterMap, resetMainPinMarker };

