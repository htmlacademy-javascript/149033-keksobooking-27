
import {creatListAd} from './data.js';
import {creatAd} from './card.js';
import { map, START_LATITUDE, START_LONGITUDE, mainPinIcon, pinIcon} from './init-map.js';

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

