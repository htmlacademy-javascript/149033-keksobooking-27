
import {creatListAd} from './data.js';
import {creatAd} from './card.js';
//import { map, START_LATITUDE, START_LONGITUDE, mainPinIcon, pinIcon} from './init-map.js';
import {
  setAdFormOn,
  setMapFilterOn,
} from './toggle-page-status.js';
const START_LAT_LNG = {
  lat: 35.6804,
  lng: 139.7690
};

const START_ZOOM = 13;
const MAIN_PIN_WIDTH_LENGTH = [52, 52];
const MAIN_PIN_ANCHOR_XY = [26, 52];
const PIN_WIDTH_LENGTH = [40, 40];
const PIN_ANCHOR_XY = [20, 40];
const URL_TEMPLATE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT_MAP = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';


const initMap = () => {
  const setFormFilterOn = () => {
    setAdFormOn();
    setMapFilterOn();
  };

  const currentMap = L.map('map-canvas');
  currentMap.on('load', setFormFilterOn);
  currentMap.setView(START_LAT_LNG, START_ZOOM);

  const layerMap = L.tileLayer(
    URL_TEMPLATE, {
      attribution:
      COPYRIGHT_MAP,
    });

  layerMap.addTo(currentMap);
  return currentMap;
};

const map = initMap();

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


/////////////////
const creatMainMarker = (currentMap, currentLatLng, icon) => {
  const address = document.querySelector('#address');
  address.setAttribute('readonly', 'readonly');
  const handlerMarkerOnMoveend = (evt) => {
    const {lng, lat} = evt.target.getLatLng();
    address.value = `${lng.toFixed(5)}, ${lat.toFixed(5)}`;
  };
  const mainMarker = L.marker(
    currentLatLng,
    {
      draggable: true,
      icon: icon,
    },
  );
  mainMarker.on('moveend', handlerMarkerOnMoveend).addTo(currentMap);
};

creatMainMarker(map, START_LAT_LNG, mainPinIcon);

const listAd = creatListAd();

const creatMarkers = (currentMap, icon, ads) => {
  const markerGroup = L.layerGroup().addTo(currentMap);
  const creatMarker = (ad) => {
    L.marker(
      ad.location,
      {
        icon: icon,
      },
    ).addTo(markerGroup).bindPopup(creatAd(ad));
  };
  ads.forEach((ad) => {
    creatMarker(ad);
  });
};


creatMarkers(map, pinIcon, listAd);
