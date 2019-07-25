import axios from 'axios';
import {ADD_USER,USERS_LOADING,FIND_USER,BOOK_TKT,SET_CURRENT_USER,GET_ERRORS,GET_BUSES,ADD_BOOKING,GET_BOOKINGS,GET_BALANCE, UPDATE_BALANCE, DELETE_BOOKING,GET_SEATS} from './types';
export const addUser = (user) => dispatch => {
    console.log("in userActions");
    console.log(user);
    axios
        .post('/signup/',user)
        .then(res => 
            dispatch({
                type : ADD_USER,
                payload : res.data
            })
        );
};

export const findUser = (username,password,userData) => dispatch => {
    axios
      .post(`/login/${username}`, userData)
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
        .post('/book_tickets/')
        .then(res => 
            dispatch({
                type : BOOK_TKT,
                payload : res.data
            })
        );
};

export const getBuses = (source,destination,username,doj) => dispatch => {
    axios
        .get(`/book_tickets/bus_list/${username}/${source}/${destination}/${doj}`)
        .then(res => 
            dispatch({
                type : GET_BUSES,
                payload : res.data
            })
        );
};

export const addBooking = (info) => dispatch => {
    axios
    .post(`/book_tickets/bus_list/${info.username}/${info.source}/${info.destination}/${info.doj}`,info)
    .then(res => 
        dispatch({
            type : ADD_BOOKING,
            payload : res.data
        })
    );
}

export const getBookings = (username) => dispatch => {
    axios
        .get(`/mybook/${username}`)
        .then(res => 
            dispatch({
                type : GET_BOOKINGS,
                payload : res.data
            })
        );
};

export const getBalance = (username) => dispatch => {
    axios
        .get(`/mywallet/${username}`)
        .then(res => 
            dispatch({
                type : GET_BALANCE,
                payload : res.data
            })
        );
};

export const updateBalance = (username,newbalance) => dispatch => {
    axios
        .put(`/mywallet/${username}/${newbalance}`)
        .then(res => 
            dispatch({
                type : UPDATE_BALANCE,
                payload : res.data
            })
        );
};

export const deleteBooking = (username,id) => dispatch => {
    axios
        .delete(`/book_tickets/mybook/${username}/${id}`)
        .then(res => 
            dispatch({
                type : DELETE_BOOKING,
                payload : res.data
            })
        );
};

export const getNoOfSeats = (username,source,destination,id,doj) => dispatch => {
    axios  
        .get(`/book_tickets/bus_list/${username}/${source}/${destination}/${doj}/${id}`)
        .then(res => 
            dispatch({
                type : GET_SEATS,
                payload : res.data
            })
        );
};





export const setUsersLoading = () => {
    return{
        type : USERS_LOADING
    };
};
