
import { combineReducers } from 'redux'
// store user details
var initState = {
    service_id: null,
    token: false,
    type: ""
}

const loginDetailsReducer = (state = initState, action) => {
    if (action.type === 'SET_SERVICE_ID') {
        localStorage.setItem("service_id",action.service_id)
        return {
            ...state,
            service_id: action.service_id
        }
    }
    if (action.type === 'SET_TOKEN') {
        return {
            ...state,
            token: action.token
        }
    }
    if (action.type === 'SET_TYPE') {
        localStorage.setItem("userType",action.userType)
        return {
            ...state,
            userType: action.userType
        }
    }
    return state
}

const Reducer = combineReducers({
    loginDetails: loginDetailsReducer
})

export default Reducer;