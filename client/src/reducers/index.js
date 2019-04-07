import { combineReducers } from 'redux';
import userReducer from './userReducer';
import bookReducer from './bookReducer';
import busReducer from './busReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    user : userReducer,
    tkt : bookReducer,
    bus : busReducer,
    auth : authReducer,
    error : errorReducer
});