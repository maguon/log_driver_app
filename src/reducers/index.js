import { combineReducers } from 'redux'
import homeReducer from './HomeReducer'
import truckInfoReducer from './TruckInfoReducer'
import trailerInfoReducer from './TrailerInfoReducer'
import driverInfoReducer from './DriverInfoReducer'
import userReducer from './UserReducer'
import workReducer from './WorkReducer'
import fuelFillingRecordReducer from './FuelFillingRecordReducer'
import cityRouteListReducer from './CityRouteListReducer'
import fuelFillingApplyReducer from './FuelFillingApplyReducer'
import instructReducer from './InstructReducer'
import branchInstructReducer from './BranchInstructReducer'
import instructExecutingReducer from './InstructExecutingReducer'
import branchInstructExecutingReducer from './BranchInstructExecutingReducer'
import initializationReducer from './InitializationReducer'

export default combineReducers({
    homeReducer,
    truckInfoReducer,
    trailerInfoReducer,
    driverInfoReducer,
    userReducer,
    workReducer,
    fuelFillingRecordReducer,
    cityRouteListReducer,
    fuelFillingApplyReducer,
    instructReducer,
    branchInstructReducer,
    instructExecutingReducer,
    branchInstructExecutingReducer,
    initializationReducer
})