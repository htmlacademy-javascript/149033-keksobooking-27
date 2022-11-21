import { setPageOn } from './toggle-page-status.js';

const StartLatLng = {
  LAT: '35.6804',
  LNG: '139.7690'
};
const START_ZOOM = 13;
const URL_TEMPLATE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT_MAP = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const initialingTheMap = () => {
  const currentMap = L.map('map-canvas');
  currentMap.setView([StartLatLng.LAT,StartLatLng.LNG], START_ZOOM);
  const layerMap = L.tileLayer(
    URL_TEMPLATE, {
      attribution:
      COPYRIGHT_MAP,
    });
  layerMap.on('load', setPageOn);
  layerMap.addTo(currentMap);
  return currentMap;
};

export { initialingTheMap };
