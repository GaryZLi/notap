import { combineReducers } from 'redux';
import viewReducer from './view.js';

export default combineReducers({
    view: viewReducer,
});