import {creatAd} from './card.js';
import {initMap} from './init-map.js';

const MAIN_PIN_WIDTH_LENGTH = [52, 52];
const MAIN_PIN_ANCHOR_XY = [26, 52];
const PIN_WIDTH_LENGTH = [40, 40];
const PIN_ANCHOR_XY = [20, 40];
const address = document.querySelector('#address');
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
const styleError = {
  backgroundColor: 'white',
  color: 'red',
  position: 'absolute',
  width: '100%',
  textAlign: 'center',
  zIndex: '999',
};

const errorMessageMarkers = (err) => {
  const mapCanvas = document.querySelector('.map__canvas');
  const div = document.createElement('div');
  Object.assign(div.style, styleError);
  div.textContent = `${err}`;
  const toggleError = () => div.classList.toggle('hidden');
  setInterval(toggleError, 2000);
  mapCanvas.append(div);
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
  document.querySelector('#address').value = Object.values(currentLatLng);

  return mainMarker;
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
  return markerGroup;
};

const latLng = map.getCenter();
const zoom = map.STARING_ZOOM;
const getCenterMap = () => map.getCenter();
const creatMainMarkerOnMap = () => creatMainMarker(map, latLng , mainPinIcon);
const creatMarkersOnMap = (ads) => creatMarkers(map, pinIcon, ads);


const mainMarkerCurrent = creatMainMarker(map, latLng , mainPinIcon);
mainMarkerCurrent.addTo(map);
const handlerMarkerOnMoveend = (evt) => {
  const {lng, lat} = evt.target.getLatLng();
  address.value = `${lng.toFixed(5)},${lat.toFixed(5)}`;
};
mainMarkerCurrent.on('moveend', handlerMarkerOnMoveend).addTo(map);
const resetMainPinMarker = () => {
  map.closePopup();
  map.setView(new L.LatLng(latLng.lat, latLng.lng), zoom);
  mainMarkerCurrent.setLatLng(L.latLng(latLng));

};

export {creatMainMarkerOnMap, creatMarkersOnMap, errorMessageMarkers, getCenterMap, resetMainPinMarker};

