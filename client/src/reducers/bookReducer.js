import {
    BOOK_TKT
} from '../actions/types';

const initialState = {
    user : '',
    bookings : []
}

export default function(state = initialState,action){
    switch(action.type){
        case BOOK_TKT:
            return {
                ...state,
                bookings : action.payload
            };
        default : 
            return state;
    }
}