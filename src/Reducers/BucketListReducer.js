import * as actionTypes from '../Actions/ActionTypes';

const bucketListReducer = (state = {
    bucketlists: []
}, action) => {
    switch(action.type){
        case actionTypes.NEW_BUCKET:
        case actionTypes.LIST_BUCKETS:
            state = {
                ...state,
                bucketlists: action.payload
            }
            break;
        default:
            break

    }
    return state
}

export default bucketListReducer;