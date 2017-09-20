import { combineReducers } from 'redux'
import homeReducer from './HomeReducer'
import truckInfoReducer from './TruckInfoReducer'
import trailerInfoReducer from './TrailerInfoReducer'
import driverInfoReducer from './DriverInfoReducer'
import userReducer from './UserReducer'
import fuelFillingRecordReducer from './FuelFillingRecordReducer'
import cityRouteListReducer from './CityRouteListReducer'

export default combineReducers({
    homeReducer,
    truckInfoReducer,
    trailerInfoReducer,
    driverInfoReducer,
    userReducer,
    fuelFillingRecordReducer,
    cityRouteListReducer
})