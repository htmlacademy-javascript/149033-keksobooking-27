//import {creatListAd} from './data.js';
import {getListAd} from './dataRequest.js';
import './form.js';
import {setPageOff} from './toggle-page-status.js';
import './filter.js';
import {creatMainMarkerOnMap, creatMarkersOnMap} from './map.js';

setPageOff();
creatMainMarkerOnMap();
getListAd(creatMarkersOnMap);
