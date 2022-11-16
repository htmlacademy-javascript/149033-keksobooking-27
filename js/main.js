import {initialingTheForm, onSubmitAdForm, onResetAdForm} from './form.js';
import {setPageOff} from './toggle-page-status.js';
import './filter.js';
import {creatMainMarkerOnMap, creatMarkersOnMap, showErrorMessageMarkers, getCenterMap, resetMainPinMarker} from './map.js';
import {getListAd, sendAdForm} from './api.js';

initialingTheForm();
setPageOff();
creatMainMarkerOnMap();
getListAd(creatMarkersOnMap,showErrorMessageMarkers);
const restartGetListAd = () => getListAd(creatMarkersOnMap,showErrorMessageMarkers);

onSubmitAdForm(sendAdForm, getCenterMap(), resetMainPinMarker, restartGetListAd);
onResetAdForm(getCenterMap(), resetMainPinMarker, restartGetListAd);
