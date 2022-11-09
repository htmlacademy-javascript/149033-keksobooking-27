//import {creatListAd} from './data.js';
import {initForm, onSubmitAdForm, onResetAdForm} from './form.js';
import {setPageOff} from './toggle-page-status.js';
import './filter.js';
import {creatMainMarkerOnMap, creatMarkersOnMap, errorMessageMarkers, getCenterMap} from './map.js';
import {getListAd, sendAdForm} from './dataRequest.js';

initForm();
setPageOff();
creatMainMarkerOnMap();
getListAd(creatMarkersOnMap,errorMessageMarkers);

onSubmitAdForm(sendAdForm, getCenterMap());
onResetAdForm(getCenterMap());

