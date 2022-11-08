//import {creatListAd} from './data.js';
import {initForm, onSubmitAdForm} from './form.js';
import {getListAd, sendAdForm} from './dataRequest.js';
import {setPageOff} from './toggle-page-status.js';
import './filter.js';
import {creatMainMarkerOnMap, creatMarkersOnMap, errorMessageMarkers} from './map.js';

initForm();
setPageOff();
creatMainMarkerOnMap();
getListAd(creatMarkersOnMap,errorMessageMarkers);

onSubmitAdForm(sendAdForm);
