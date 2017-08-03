import * as actionTypes from '../Actions/ActionTypes';

const appReducer = (state = {
    bucketlists: [], 
    loginRequired: false
}, action) => {
    switch(action.type){
        case actionTypes.APP_BUCKETS:
            state = {
                ...state,
                bucketlists: action.payload
            }
            break;
        case actionTypes.APP_REDIRECT:
            state = {
                ...state,
                loginRequired: action.payload
            }
            break;
        default:
            break

    }
    return state
}

export default appReducer;