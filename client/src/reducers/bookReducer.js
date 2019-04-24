import {
     ADD_BOOKING,
     GET_BOOKINGS,
     DELETE_BOOKING,
     GET_SEATS
} from '../actions/types';

const initialState = {
    user : '',
    bookings : [],
    seats : ''
}

export default function(state = initialState,action){
    switch(action.type){
        case ADD_BOOKING:
            console.log('inside add booking case');
            console.log(action.payload);
            return {
                ...state,
                bookings : action.payload
            };
        case GET_BOOKINGS:
            console.log('inside getbookings case of reducer');
            console.log(action.payload);
            return {
                ...state,
                bookings : action.payload
            };
        case DELETE_BOOKING:
            console.log('inside deletebooking case of reducer');
            console.log(action.payload);
            return {
                ...state,
               // bookings : action.payload
            }
        case GET_SEATS:
        return {
            ...state,
            seats : action.payload
        }
        default : 
            return state;
    }
}