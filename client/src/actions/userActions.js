import axios from 'axios';
import {ADD_USER,USERS_LOADING,FIND_USER,BOOK_TKT,SET_CURRENT_USER,GET_ERRORS,GET_BUSES} from './types';

export const addUser = (user) => dispatch => {
    console.log("in userActions");
    console.log(user);
    axios
        .post('https://easygo-t22.herokuapp.com/signup/',user)
        .then(res => 
            dispatch({
                type : ADD_USER,
                payload : res.data
            })
        );
};

export const findUser = (userData) => dispatch => {
    axios
      .post('https://easygo-t22.herokuapp.com/login/', userData)
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

export const bookTkt = (info) => dispatch => {
    console.log(info);
    axios
        .post('https://easygo-t22.herokuapp.com/book_tickets/',info)
        .then(res => 
            dispatch({
                type : BOOK_TKT,
                payload : res.data
            })
        );
};

export const getBuses = (info) => dispatch => {
    console.log(info);
    axios
        .get('https://easygo-t22.herokuapp.com/book_tickets/bus_list',info)
        .then(res => 
            dispatch({
                type : GET_BUSES,
                payload : res.data
            })
        );
};






export const setUsersLoading = () => {
    return{
        type : USERS_LOADING
    };
};
