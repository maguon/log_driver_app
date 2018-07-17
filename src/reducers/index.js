import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import homeReducer from '../android/views/blockInitial/home/HomeReducer'
import driverInfoReducer from '../android/views/driverInfo/DriverInfoReducer'
import loginReducer from '../android/complatedViews/login/LoginReducer'
import workReducer from '../android/views/blockInitial/work/WorkReducer'
import fuelFillingRecordReducer from '../android/complatedViews/fuelFillingRecord/FuelFillingRecordReducer'
import cityRouteListReducer from '../android/complatedViews/select/cityRouteList/CityRouteListReducer'
import fuelFillingApplyReducer from '../android/complatedViews/fuelFillingApply/FuelFillingApplyReducer'
import instructReducer from '../android/views/instruct/InstructReducer'
import branchInstructReducer from '../android/views/branchInstruct/BranchInstructReducer'
import instructExecutingReducer from '../android/views/instructExecuting/InstructExecutingReducer'
import branchInstructExecutingReducer from '../android/views/branchInstructExecuting/BranchInstructExecutingReducer'
import initializationReducer from '../android/views/initialization/InitializationReducer'
import retrievePasswordReducer from './RetrievePasswordReducer'
import applyAccidentImageReducer from '../android/views/applyAccidentImage/ApplyAccidentImageReducer'
import imageForAccidentReducer from '../android/complatedComponents/accidentInfo/imageListForAccident/ImageForAccidentReducer'
import applyAccidentReducer from '../android/views/applyAccident/ApplyAccidentReducer'
import selectAddressReducer from '../android/complatedViews/select/address/AddressReducer'
import truckReducer from '../android/views/blockInitial/truck/TruckReducer'
import selectAccidentTypeReducer from '../android/complatedViews/select/accidentTypeList/AccidentTypeReducer'
import cleanRelListReducer from '../android/complatedViews/cleanRelList/CleanRelListReducer'
import selectCityReducer from './SelectCityReducer'
import selectReceiveReducer from './SelectReceiveReducer'
import selectDriverReducer from './selectDriverReducer'
import selectCarReducer from './selectCarReducer'
import carInfoForDemageReducer from './carInfoForDemageReducer'
import demageEditorReducer from './demageEditorReducer'
import demageOpResultReducer from './demageOpResultReducer'
import imageListForDemageReducer from '../android/components/demageInfo/imageListForDemageReducer'
import recordForDemageReducer from './recordForDemageReducer'
import demageResponsibilityListReducer from '../android/complatedViews/demageResponsibilityList/DemageResponsibilityListReducer'
import demageResponsibilityListOperationReducer from './DemageResponsibilityListOperationReducer'
import demageListOperationReducer from './DemageListOperationReducer'
import taskLoanListReducer from '../android/complatedViews/taskLoanList/taskLoanListReducer'
import taskLoanRelListReducer from '../android/complatedViews/taskLoanRelList/taskLoanRelListReducer'
import carsReducer from '../android/views/cars/carsReducer'
import carInfoReducer from '../android/views/carInfo/carInfoReducer'
import searchCarReducer from '../android/views/select/searchCar/SearchCarReducer'
import addCarReducer from '../android/views/createCar/addCarReducer'
import cityReducer from '../android/views/select/city/cityReducer'
import entrustReducer from '../android/views/select/entrust/entrustReducer'
import makeReducer from '../android/views/select/make/makeReducer'
import receiveReducer from '../android/views/select/receive/receiveReducer'
import addCarImageReducer from '../android/views/uploadImageForCreateCar/addCarImageReducer'
import baseAddrListReducer from '../android/complatedViews/select/baseAddrList/baseAddrListReducer'

//notUsed
import demageListReducer from '../android/notUsed/demageList/DemageListReducer'
import applyDamageImageReducer from '../android/notUsed/applyDemageImage/ApplyDamageImageReducer'
import applyDamageReducer from '../android/notUsed/applyDemage/applyDamageReducer'

//truckBlock-views-complated 
import accidentListReducer from '../android/complatedViews/accidentList/AccidentListReducer'
import accidentResponsibilityListReducer from '../android/complatedViews/accidentResponsibilityList/AccidentResponsibilityListReducer'

// <<<End

//truckBlock-components-complated 
import truckInfoReducer from '../android/complatedViews/truck/truckInfo/truckInfoReducer'
import truckRepairListReducer from '../android/complatedViews/truck/truckRepairList/truckRepairListReducer'
import truckInsuranceReducer from '../android/complatedViews/truck/truckInsurance/truckInsuranceReducer'
import truckImageReducer from '../android/complatedViews/truck/truckImage/truckImageReducer'
import trailerInfoReducer from '../android/complatedViews/trailer/trailerInfo/trailerInfoReducer'
import trailerInsuranceReducer from '../android/complatedViews/trailer/trailerInsurece/trailerInsuranceReducer'
import trailerRepairListReducer from '../android/complatedViews/trailer/trailerRepairList/trailerRepairListReducer'
import trailerImageReducer from '../android/complatedViews/trailer/trailerImage/trailerImageReducer'

import accidentEditorReducer from '../android/complatedComponents/accidentInfo/addcidentEditor/AccidentEditorReducer'

// <<<End


//settingBlock-views-complated 
import updatePasswordReducer from '../android/complatedViews/updatePassword/updatePasswordReducer'
import personalCenterReducer from '../android/complatedViews/personalCenter/personalCenterReducer'

// <<<End

export default combineReducers({
    form: formReducer,

    //settingBlock-views-complated 
    updatePasswordReducer,
    personalCenterReducer,

    // <<<End
    homeReducer,
    //component
    truckInfoReducer,
    truckRepairListReducer,
    truckInsuranceReducer,
    truckImageReducer,
    trailerInfoReducer,
    trailerInsuranceReducer,
    trailerRepairListReducer,
    trailerImageReducer,

    // <<<End
    driverInfoReducer,
    loginReducer,
    workReducer,
    fuelFillingRecordReducer,
    cityRouteListReducer,
    fuelFillingApplyReducer,
    instructReducer,
    branchInstructReducer,
    instructExecutingReducer,
    branchInstructExecutingReducer,
    initializationReducer,

    retrievePasswordReducer,
    //settingReducer,
    carsReducer,
    searchCarReducer,
    carInfoReducer,
    addCarReducer,
    cityReducer,
    entrustReducer,
    makeReducer,
    receiveReducer,
    addCarImageReducer,
    baseAddrListReducer,
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