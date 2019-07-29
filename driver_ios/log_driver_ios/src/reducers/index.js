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
import searchCarReducer from './modules/SearchCarReducer'

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
    searchCarReducer
})
