//import {creatListAd} from './data.js';
import './form.js';
import {setPageOff} from './toggle-page-status.js';
import './filter.js';
import {creatMainMarkerOnMap, creatMarkersOnMap} from './map.js';
import {getListAd} from './dataRequest.js';
setPageOff();
creatMainMarkerOnMap();
getListAd(creatMarkersOnMap);
