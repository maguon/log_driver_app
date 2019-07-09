import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form';
import initializationReducer from './main/InitializationReducer'
import loginReducer from './main/LoginReducer'
import taskListForHomeReducer from './layout/TaskListForHomeReducer'
import mileageInfoReducer from './layout/MileageInfoReducer'
import retrievePasswordReducer from './main/RetrievePasswordReducer'
import retrievePasswordVCodeReducer from './main/RetrievePasswordVCodeReducer'
import routeTaskListForHomeReducer from './layout/RouteTaskListForHomeReducer'
import instructExecutingReducer from './main/InstructExecutingReducer'

export default combineReducers({
    form: formReducer,
    initializationReducer,
    loginReducer,
    mileageInfoReducer,
    retrievePasswordReducer,
    retrievePasswordVCodeReducer,
    taskListForHomeReducer,
    routeTaskListForHomeReducer,
    instructExecutingReducer,
})
