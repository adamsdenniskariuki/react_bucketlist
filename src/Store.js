import {createStore, combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'
import userReducer from './Reducers/UserReducer';
import appReducer from './Reducers/AppReducer';
import registerReducer from './Reducers/RegisterReducer';
import bucketListReducer from './Reducers/BucketListReducer';

const composeEnhancers = composeWithDevTools({});

const store = createStore(combineReducers({
    userReducer, 
    appReducer, 
    registerReducer,
    bucketListReducer
}), composeEnhancers(applyMiddleware(logger)))

export default store