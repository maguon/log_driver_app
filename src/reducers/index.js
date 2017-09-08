import { combineReducers } from 'redux'
import homeReducer from './HomeReducer'
import truckInfoReducer from './TruckInfoReducer'
import userReducer from './UserReducer'

export default combineReducers({
    homeReducer,
    truckInfoReducer,
    userReducer
})