import { createStore } from 'redux';

import reducer from './modules/clima/reducer';

const store = createStore(reducer);

export default store;
