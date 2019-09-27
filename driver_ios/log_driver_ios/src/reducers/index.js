import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form';
import initializationReducer from './main/InitializationReducer'
import communicationSettingReducer from './main/CommunicationSettingReducer'
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
import accidentEditorReducer from './main/AccidentEditorReducer'
import addCarImageReducer from './main/AddCarImageReducer'
import addCarReducer from './main/AddCarReducer'
import baseAddrListReducer from './main/BaseAddrListReducer'
import makeReducer from './main/MakeReducer'
import cityReducer from './main/CityReducer'
import entrustReducer from './main/EntrustReducer'
import receiveReducer from './main/ReceiveReducer'
import datePickerReducer from './main/DatePickerReducer'

import truckDetailReducer from './main/TruckDetailReducer'
import truckImageReducer from './main/TruckImageReducer'
import truckRepairListReducer from './main/TruckRepairListReducer'
import truckInsuranceReducer from './main/TruckInsuranceReducer'

import trailerInfoReducer from './main/TrailerInfoReducer'
import trailerImageReducer from './main/TrailerImageReducer'
import trailerInsuranceReducer from './main/TrailerInsuranceReducer'
import trailerRepairListReducer from './main/TrailerRepairListReducer'

import driverInfoReducer from './main/DriverInfoReducer'

import applyAccidentReducer from './main/ApplyAccidentReducer'
import applyAccidentImageReducer from './main/ApplyAccidentImageReducer'
import accidentTypeReducer from './main/AccidentTypeReducer'
import cityRouteListReducer from './main/CityRouteListReducer'

import accidentResponsibilityListReducer from './main/AccidentResponsibilityListReducer'
import peccancyListReducer from './main/PeccancyListReducer'
import overuseDieselOilListReducer from './main/OveruseDieselOilListReducer'
import overuseDieselOilInfoReducer from './main/OveruseDieselOilInfoReducer'
import notSettleListReducer from './main/NotSettleListReducer'
import fuelFillingApplyReducer from './main/FuelFillingApplyReducer'
import fuelFillingRecordReducer from './main/FuelFillingRecordReducer'
import cleanRelListReducer from './main/CleanRelListReducer'
import receiveForCleanRelReducer from './main/ReceiveForCleanRelReducer'
import selectReceiveReducer from './main/SelectReceiveReducer'
import selectCityReducer from './main/SelectCityReducer'
import selectCarReducer from './main/SelectCarReducer'
import routeTaskFeeReducer from './main/RouteTaskFeeReducer'
import taskLoanListReducer from './main/TaskLoanListReducer'
import taskLoanRelListReducer from './main/TaskLoanRelListReducer'
import salaryReducer from './main/SalaryReducer'
import salaryListReducer from './main/SalaryListReducer'
import demageListReducer from './main/DemageListReducer'
import demageResponsibilityListReducer from './main/DemageResponsibilityListReducer'
import carInfoForDemageReducer from './main/CarInfoForDemageReducer'
import recordForDemageReducer from './main/RecordForDemageReducer'
import demageOpResultReducer from './main/DemageOpResultReducer'
import imageListForDemageReducer from './main/ImageListForDemageReducer'
import demageListOperationReducer from './main/DemageListOperationReducer'
import demageResponsibilityListOperationReducer from './main/DemageResponsibilityListOperationReducer'
import ApplyDamageImageReducer from './main/ApplyDamageImageReducer'
import ApplyDamageReducer from './main/ApplyDamageReducer'
import selectDriverReducer from './main/SelectDriverReducer'
import demageEditorReducer from './main/DemageEditorReducer'
import addressReducer from './main/AddressReducer'

import workReducer from './main/WorkReducer'
import instructReducer from './main/InstructReducer'
import branchInstructReducer from './main/BranchInstructReducer'
import cleanFeeListReducer from './main/CleanFeeListReducer'

import changeMobileNoReducer from './main/ChangeMobileNoReducer'
import personalCenterReducer from './main/PersonalCenterReducer'
import updatePasswordReducer from './main/UpdatePasswordReducer'
import changeMobileVCodeReducer from './main/ChangeMobileVCodeReducer'

export default combineReducers({
    form: formReducer,
    initializationReducer,
    communicationSettingReducer,
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
    accidentEditorReducer,
    addCarImageReducer,
    addCarReducer,
    baseAddrListReducer,
    makeReducer,
    cityReducer,
    entrustReducer,
    receiveReducer,
    datePickerReducer,

    truckDetailReducer,
    truckImageReducer,
    truckRepairListReducer,
    truckInsuranceReducer,

    trailerInfoReducer,
    trailerImageReducer,
    trailerInsuranceReducer,
    trailerRepairListReducer,
    driverInfoReducer,

    applyAccidentReducer,
    applyAccidentImageReducer,
    accidentTypeReducer,
    cityRouteListReducer,

    accidentResponsibilityListReducer,
    peccancyListReducer,
    overuseDieselOilListReducer,
    overuseDieselOilInfoReducer,
    notSettleListReducer,
    fuelFillingApplyReducer,
    fuelFillingRecordReducer,
    cleanRelListReducer,
    receiveForCleanRelReducer,
    selectReceiveReducer,
    selectCityReducer,
    selectCarReducer,
    routeTaskFeeReducer,
    taskLoanListReducer,
    taskLoanRelListReducer,
    salaryReducer,
    salaryListReducer,
    demageListReducer,
    demageResponsibilityListReducer,
    carInfoForDemageReducer,
    recordForDemageReducer,
    demageOpResultReducer,
    imageListForDemageReducer,
    demageListOperationReducer,
    demageResponsibilityListOperationReducer,
    ApplyDamageReducer,
    ApplyDamageImageReducer,
    selectDriverReducer,
    demageEditorReducer,
    addressReducer,

    workReducer,
    instructReducer,
    branchInstructReducer,
    cleanFeeListReducer,

    changeMobileNoReducer,
    personalCenterReducer,
    updatePasswordReducer,
    changeMobileVCodeReducer
})
