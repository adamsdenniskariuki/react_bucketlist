import * as actionTypes from '../Actions/ActionTypes';

const appReducer = (state = {
    bucketlists: [], 
    loginRequired: false,
    modalOpen: false,
    modalSize: "tiny",
    modalName: "App Modal",
    modalHeader: "",
    modalContent: {}

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
        case actionTypes.APP_MODAL_OPEN:
            state = {
                ...state,
                modalOpen: action.payload
            }
            break;
        case actionTypes.APP_MODAL_SIZE:
            state = {
                ...state,
                modalSize: action.payload
            }
            break;
        case actionTypes.APP_MODAL_NAME:
            state = {
                ...state,
                modalName: action.payload
            }
            break;
        case actionTypes.APP_MODAL_HEADER:
            state = {
                ...state,
                modalHeader: action.payload
            }
            break;
        case actionTypes.APP_MODAL_CONTENT:
            state = {
                ...state,
                modalContent: action.payload
            }
            break;
        default:
            break

    }
    return state
}

export default appReducer;