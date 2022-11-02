import {creatAd} from './card.js';
import {initMap} from './init-map.js';

const MAIN_PIN_WIDTH_LENGTH = [52, 52];
const MAIN_PIN_ANCHOR_XY = [26, 52];
const PIN_WIDTH_LENGTH = [40, 40];
const PIN_ANCHOR_XY = [20, 40];

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

const creatMarkers = (currentMap, mainIcon, ads) => {
  const markerGroup = L.layerGroup().addTo(currentMap);
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
};

const creatMap = (ads) => {
  const latLng = map.getCenter();
  creatMainMarker(map, latLng , mainPinIcon);
  creatMarkers(map, pinIcon, ads);
};

export {creatMap};

