import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import homeReducer from '../android/views/blockInitial/home/HomeReducer'
import truckInfoReducer from '../android/views/truckInfo/TruckInfoReducer'
import trailerInfoReducer from '../android/views/trailerInfo/TrailerInfoReducer'
import driverInfoReducer from '../android/views/driverInfo/DriverInfoReducer'
import userReducer from '../android/views/login/UserReducer'
import workReducer from '../android/views/blockInitial/work/WorkReducer'
import fuelFillingRecordReducer from '../android/views/fuelFillingRecord/FuelFillingRecordReducer'
import cityRouteListReducer from './CityRouteListReducer'
import fuelFillingApplyReducer from '../android/views/fuelFillingApply/FuelFillingApplyReducer'
import instructReducer from '../android/views/instruct/InstructReducer'
import branchInstructReducer from '../android/views/branchInstruct/BranchInstructReducer'
import instructExecutingReducer from '../android/views/instructExecuting/InstructExecutingReducer'
import branchInstructExecutingReducer from '../android/views/branchInstructExecuting/BranchInstructExecutingReducer'
import initializationReducer from '../android/views/initialization/InitializationReducer'
import PasswordReducer from '../android/views/passWord/PasswordReducer'
import retrievePasswordReducer from './RetrievePasswordReducer'
import settingReducer from '../android/views/blockInitial/setting/SettingReducer'
import applyAccidentImageReducer from '../android/views/applyAccidentImage/ApplyAccidentImageReducer'
import imageForAccidentReducer from './ImageForAccidentReducer'
import applyAccidentReducer from '../android/views/applyAccident/ApplyAccidentReducer'
import selectAddressReducer from './SelectAddressReducer'
import truckReducer from '../android/views/blockInitial/truck/TruckReducer'
import selectAccidentTypeReducer from './SelectAccidentTypeReducer'
import accidentListReducer from '../android/views/accidentList/AccidentListReducer'
import accidentEditorReducer from './AccidentEditorReducer'
import accidentResponsibilityListReducer from '../android/views/accidentResponsibilityList/AccidentResponsibilityListReducer'
import cleanRelListReducer from '../android/views/cleanRelList/CleanRelListReducer'
import selectCityReducer from './SelectCityReducer'
import selectReceiveReducer from './SelectReceiveReducer'
import demageListReducer from '../android/views/demageList/DemageListReducer'
import selectDriverReducer from './selectDriverReducer'
import selectCarReducer from './selectCarReducer'
import applyDamageImageReducer from '../android/views/applyDemageImage/ApplyDamageImageReducer'
import applyDamageReducer from '../android/views/applyDemage/applyDamageReducer'
import carInfoForDemageReducer from './carInfoForDemageReducer'
import demageEditorReducer from './demageEditorReducer'
import demageOpResultReducer from './demageOpResultReducer'
import imageListForDemageReducer from './imageListForDemageReducer'
import recordForDemageReducer from './recordForDemageReducer'
import demageResponsibilityListReducer from '../android/views/demageResponsibilityList/DemageResponsibilityListReducer'
import demageResponsibilityListOperationReducer from './DemageResponsibilityListOperationReducer'
import demageListOperationReducer from './DemageListOperationReducer'
import taskLoanListReducer from '../android/views/taskLoanList/taskLoanListReducer'
import taskLoanRelListReducer from '../android/views/taskLoanRelList/taskLoanRelListReducer'
import carsReducer from '../android/views/cars/carsReducer'
import carInfoReducer from '../android/views/carInfo/carInfoReducer'
import searchCarReducer from '../android/views/select/searchCar/SearchCarReducer'
import addCarReducer from '../android/views/createCar/addCarReducer'
import cityReducer from '../android/views/select/city/cityReducer'
import entrustReducer from '../android/views/select/entrust/entrustReducer'
import makeReducer from '../android/views/select/make/makeReducer'
import receiveReducer from '../android/views/select/receive/receiveReducer'
import addCarImageReducer from '../android/views/uploadImageForCreateCar/addCarImageReducer'



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
    carsReducer,
    searchCarReducer,
    carInfoReducer,
    addCarReducer,
    cityReducer,
    entrustReducer,
    makeReducer,
    receiveReducer,
    addCarImageReducer,
    
    applyAccidentImageReducer,
    imageForAccidentReducer,
    applyAccidentReducer,
    selectAddressReducer,
    truckReducer,
    selectAccidentTypeReducer,
    accidentListReducer,
    accidentEditorReducer,
    accidentResponsibilityListReducer,
    cleanRelListReducer,
    selectCityReducer,
    selectReceiveReducer,
    demageListReducer,
    selectDriverReducer,
    selectCarReducer,
    applyDamageImageReducer,
    applyDamageReducer,
    carInfoForDemageReducer,
    demageEditorReducer,
    demageOpResultReducer,
    imageListForDemageReducer,
    recordForDemageReducer,
    demageResponsibilityListReducer,
    demageResponsibilityListOperationReducer,
    demageListOperationReducer,
    taskLoanListReducer,
    taskLoanRelListReducer
})