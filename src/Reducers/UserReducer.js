import * as actionTypes from '../Actions/ActionTypes';

const userReducer = (state = {
    user: {}, 
    redirectToHome: false
}, action) => {
    switch(action.type){
        case actionTypes.LOGIN_USER:
            state = {
                ...state,
                user: action.payload
            }
            break;
        case actionTypes.LOGIN_REDIRECT:
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

export default userReducer;