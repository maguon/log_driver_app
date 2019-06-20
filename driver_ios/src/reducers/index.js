import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form';
import initializationReducer from './main/InitializationReducer'



export default combineReducers({
    form: formReducer,
    initializationReducer,

})
