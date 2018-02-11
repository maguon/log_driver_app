import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
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
import PasswordReducer from './PasswordReducer'
import retrievePasswordReducer from './RetrievePasswordReducer'
import settingReducer from './SettingReducer'
import applyAccidentImageReducer from './ApplyAccidentImageReducer'
import imageEditorForAccidentReducer from './ImageEditorForAccidentReducer'
import applyAccidentReducer from './ApplyAccidentReducer'
import selectAddressReducer from './SelectAddressReducer'
import truckReducer from './TruckReducer'
import selectAccidentTypeReducer from './SelectAccidentTypeReducer'

export default combineReducers({
    form: formReducer,
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
    initializationReducer,
    PasswordReducer,
    retrievePasswordReducer,
    settingReducer,

    applyAccidentImageReducer,
    imageEditorForAccidentReducer,
    applyAccidentReducer,
    selectAddressReducer,
    truckReducer,
    selectAccidentTypeReducer
})