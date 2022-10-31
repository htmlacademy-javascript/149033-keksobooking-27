import {
  setAdFormOn,
  setMapFilterOn,
} from './togglePageStatus.js';
import {creatListAd} from './data.js';
import {creatAd} from './card.js';

const START_LATITUDE = 35.6804;
const START_LONGITUDE = 139.7690;
const START_ZOOM = 13;
const MAIN_PIN_WIDTH_LENGTH = [52, 52];
const MAIN_PIN_ANCHOR_XY = [26, 52];
const PIN_WIDTH_LENGTH = [40, 40];
const PIN_ANCHOR_XY = [20, 40];

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

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const handlerMarkerOnMoveend = (evt) => {
  const {lng, lat} = evt.target.getLatLng();
  const address = document.querySelector('#address');
  address.setAttribute('readonly', 'readonly');
  address.value = `${lng.toFixed(5)}, ${lat.toFixed(5)}`;
};

L.marker(
  {
    lat: START_LATITUDE,
    lng: START_LONGITUDE,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).on('moveend', handlerMarkerOnMoveend).addTo(map);

const listAd = creatListAd();
const markerGroup = L.layerGroup().addTo(map);
const creatMarker = (ad) => {
  L.marker(
    ad.location,
    {
      icon: pinIcon,
    },
  ).addTo(markerGroup).bindPopup(creatAd(ad));
};
listAd.forEach((ad) => {
  creatMarker(ad);
});

