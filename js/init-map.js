import {
  setAdFormOn,
  setMapFilterOn,
} from './toggle-page-status.js';

const START_LATITUDE = 35.6804;
const START_LONGITUDE = 139.7690;
const START_ZOOM = 13;
const MAIN_PIN_WIDTH_LENGTH = [52, 52];
const MAIN_PIN_ANCHOR_XY = [26, 52];
const PIN_WIDTH_LENGTH = [40, 40];
const PIN_ANCHOR_XY = [20, 40];
const URL_TEMPLATE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT_MAP = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

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

const setMapOn = () => {
  setAdFormOn();
  setMapFilterOn();
};

const map = L.map('map-canvas')
  .on('load', setMapOn)
  .setView(
    {
      lat: START_LATITUDE,
      lng: START_LONGITUDE,
    },
    START_ZOOM
  );

L.tileLayer(URL_TEMPLATE, {
  attribution:
    COPYRIGHT_MAP,
}).addTo(map);

export { map, START_LATITUDE, START_LONGITUDE, mainPinIcon, pinIcon};
