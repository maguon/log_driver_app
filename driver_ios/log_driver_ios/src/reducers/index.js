import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form';
import initializationReducer from './main/InitializationReducer'
import loginReducer from './main/LoginReducer'
import homeReducer from './main/HomeReducer'
import taskListForHomeReducer from './modules/TaskListForHomeReducer'
import mileageInfoReducer from './modules/MileageInfoReducer'
import retrievePasswordReducer from './main/RetrievePasswordReducer'
import retrievePasswordVCodeReducer from './main/RetrievePasswordVCodeReducer'
import routeTaskListForHomeReducer from './modules/RouteTaskListForHomeReducer'
import instructExecutingReducer from './main/InstructExecutingReducer'
import taskForInstructExecutingReducer from './main/TaskForInstructExecutingReducer'
import carsReducer from './main/CarsReducer'
import branchInstructExecutingReducer from './main/BranchInstructExecutingReducer'
import truckReducer from './main/TruckReducer'
import accidentListReducer from './main/AccidentListReducer'
import searchCarReducer from './main/SearchCarReducer'
import carInfoReducer from './main/CarInfoReducer'
import imageForAccidentReducer from './main/ImageForAccidentReducer'
import truckDetailReducer from './main/TruckDetailReducer'
import truckImageReducer from './main/TruckImageReducer'
import truckRepairListReducer from './main/TruckRepairListReducer'
import truckInsuranceReducer from './main/TruckInsuranceReducer'
import trailerInfoReducer from './main/TrailerInfoReducer'
import trailerImageReducer from './main/TrailerImageReducer'
import trailerInsuranceReducer from './main/TrailerInsuranceReducer'
import trailerRepairListReducer from './main/TrailerRepairListReducer'
import driverInfoReducer from './main/DriverInfoReducer'

export default combineReducers({
    form: formReducer,
    initializationReducer,
    loginReducer,
    homeReducer,
    mileageInfoReducer,
    retrievePasswordReducer,
    retrievePasswordVCodeReducer,
    taskListForHomeReducer,
    routeTaskListForHomeReducer,
    instructExecutingReducer,
    taskForInstructExecutingReducer,
    carsReducer,
    branchInstructExecutingReducer,
    truckReducer,
    accidentListReducer,
    searchCarReducer,
    carInfoReducer,
    imageForAccidentReducer,


    truckDetailReducer,
    truckImageReducer,
    truckRepairListReducer,
    truckInsuranceReducer,

    trailerInfoReducer,
    trailerImageReducer,
    trailerInsuranceReducer,
    trailerRepairListReducer,

    driverInfoReducer,
})
