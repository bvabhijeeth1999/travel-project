import {
    ADD_USER,
    USERS_LOADING,
    FIND_USER,
    GET_BALANCE,
    UPDATE_BALANCE
} from '../actions/types';

const initialState = {
    users : [],
    loading: false,
    found : false,
    balance : '0'
}

export default function(state = initialState,action){
    switch(action.type){
        case ADD_USER:
            console.log('in reducer');
            console.log(action.payload);
            return {
                ...state,
                users : action.payload,
                loading : false
            };
        case USERS_LOADING:
            return{
                ...state,
                loading : true
            };
        case FIND_USER:
            console.log(action.payload);
            return{
                ...state,
                found : true
            }
        case GET_BALANCE:
            console.log('inside getbalance case');
            console.log(action.payload.balance);
            return{
                ...state,
                balance : action.payload.balance
            }
        case UPDATE_BALANCE:
            console.log('inside UPDATEbalance case');
            console.log(action.payload.balance);
            return{
                ...state,
                balance : action.payload.balance
            }
        default : 
            return state;
    }
}