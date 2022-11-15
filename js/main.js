import {initForm, onSubmitAdForm, onResetAdForm} from './form.js';
import {setPageOff} from './toggle-page-status.js';
import './filter.js';
import {creatMainMarkerOnMap, creatMarkersOnMap, errorMessageMarkers, getCenterMap, resetMainPinMarker} from './map.js';
import {getListAd, sendAdForm} from './api.js';

initForm();
setPageOff();
creatMainMarkerOnMap();
getListAd(creatMarkersOnMap,errorMessageMarkers);

onSubmitAdForm(sendAdForm, getCenterMap(), resetMainPinMarker);
onResetAdForm(getCenterMap(), resetMainPinMarker);
