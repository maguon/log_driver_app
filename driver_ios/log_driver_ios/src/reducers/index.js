import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form';
import initializationReducer from './main/InitializationReducer'
import loginReducer from './main/LoginReducer'
import taskListForHomeReducer from './layout/TaskListForHomeReducer'
import mileageInfoReducer from './layout/MileageInfoReducer'



export default combineReducers({
    form: formReducer,
    initializationReducer,
    loginReducer,
    taskListForHomeReducer,
    mileageInfoReducer,

})
