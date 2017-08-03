import * as actionTypes from '../Actions/ActionTypes';

const registerReducer = (state = {
    newuser: {}, 
    redirectToHome: false
}, action) => {
    switch(action.type){
        case actionTypes.REGISTER_USER:
            state = {
                ...state,
                newuser: action.payload
            }
            break;
        case actionTypes.REGISTER_REDIRECT:
            state = {
                ...state,
                redirectToHome: action.payload
            }
            break;
        default:
            break

    }
    return state
}

export default registerReducer;