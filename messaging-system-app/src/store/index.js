import {createStore, combineReducers} from 'redux';

import MessagingSystemReducer from './reducers/MessagingSystemReducer';

const rootReducer = combineReducers({
    MessagingSystemData: MessagingSystemReducer,
});

const store = createStore(rootReducer);

export default store;