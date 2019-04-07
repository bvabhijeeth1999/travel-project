import {
    ADD_USER,
    USERS_LOADING,
    FIND_USER
} from '../actions/types';

const initialState = {
    users : [],
    loading: false,
    found : false
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
        default : 
            return state;
    }
}