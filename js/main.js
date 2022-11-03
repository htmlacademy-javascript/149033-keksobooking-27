import {creatListAd} from './data.js';
import './form.js';
import {setPageOff} from './toggle-page-status.js';
import './filter.js';
import {creatMap} from './map.js';

setPageOff();
creatMap(creatListAd());

