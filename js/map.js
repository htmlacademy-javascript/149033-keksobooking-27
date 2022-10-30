import {
  setAdFormOn,
  setMapFilterOn,
} from './togglePageStatus.js';
import {creatListAd} from './data.js';
import {creatAd} from './card.js';

const START_LATITUDE = 35.6804;
const START_LONGITUDE = 139.7690;

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const map = L.map('map-canvas')
  .on('load', () => {
    setAdFormOn();
    setMapFilterOn();
  })
  .setView(
    {
      lat: START_LATITUDE,
      lng: START_LONGITUDE,
    },
    13
  );

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker(
  {
    lat: START_LATITUDE,
    lng: START_LONGITUDE,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).on('moveend', (evt) => {
  const {lng, lat} = evt.target.getLatLng();
  const address = document.querySelector('#address');
  address.setAttribute('readonly', 'readonly');
  address.value = `${lng.toFixed(5)}, ${lat.toFixed(5)}`;
}).addTo(map);

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

