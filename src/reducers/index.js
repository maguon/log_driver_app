import { combineReducers } from 'redux'
import homeReducer from './HomeReducer'
import truckInfoReducer from './TruckInfoReducer'

export default combineReducers({
    homeReducer,
    truckInfoReducer
})