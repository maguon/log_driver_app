import * as homeTypes from '../android/views/blockInitial/home/HomeTypes'
import * as workTypes from '../android/views/blockInitial/work/WorkTypes'

//import * as trailerInfoTypes from '../android/views/trailerInfo/TrailerInfoTypes'
import * as driverInfoTypes from '../android/views/driverInfo/DriverInfoTypes'
import * as fuelFillingRecordTypes from '../android/complatedViews/fuelFillingRecord/FuelFillingRecordTypes'
import * as cityRouteListTypes from '../android/complatedViews/select/cityRouteList/CityRouteListTypes'
import * as fuelFillingApplyTypes from '../android/complatedViews/fuelFillingApply/FuelFillingApplyTypes'
import * as branchInstructTypes from '../android/views/branchInstruct/BranchInstructTypes'
import * as instructTypes from '../android/views/instruct/InstructTypes'
import * as instructExecutingTypes from '../android/views/instructExecuting/InstructExecutingTypes'
import * as branchInstructExecutingTypes from '../android/views/branchInstructExecuting/BranchInstructExecutingTypes'
import * as initializationTypes from '../android/views/initialization/InitializationTypes'
import * as loginTypes from '../android/complatedViews/login/LoginTypes'

import * as retrievePasswordTypes from './RetrievePasswordTypes'
//import * as settingTypes from '../android/views/blockInitial/setting/SettingTypes'

import * as applyAccidentImageTypes from '../android/views/applyAccidentImage/ApplyAccidentImageTypes'
import * as applyAccidentTypes from '../android/views/applyAccident/ApplyAccidentTypes'
import * as selectAddressTypes from '../android/complatedViews/select/address/AddressTypes'
import * as truckTypes from '../android/views/blockInitial/truck/TruckTypes'
import * as selectAccidentTypeActionTypes from '../android/complatedViews/select/accidentTypeList/AccidentTypeActionTypes'
import * as accidentListTypes from '../android/complatedViews/accidentList/AccidentListTypes'
import * as accidentEditorTypes from '../android/complatedComponents/accidentInfo/addcidentEditor/AccidentEditorTypes'
import * as imageForAccidentTypes from '../android/complatedComponents/accidentInfo/imageListForAccident/ImageForAccidentTypes'
import * as accidentResponsibilityListTypes from '../android/complatedViews/accidentResponsibilityList/AccidentResponsibilityListTypes'
import * as cleanRelListTypes from '../android/complatedViews/cleanRelList/CleanRelListTypes'
import * as selectCityActionTypes from './SelectCityActionTypes'
import * as selectReceiveActionTypes from './SelectReceiveActionTypes'
import * as demageListTypes from '../android/notUsed/demageList/DemageListTypes'
import * as selectCarActionTypes from './selectCarActionTypes'
import * as selectDriverActionTypes from './selectDriverActionTypes'
import * as applyDamageTypes from '../android/notUsed/applyDemage/ApplyDamageTypes'
import * as applyDamageImageTypes from '../android/notUsed/applyDemageImage/ApplyDamageImageTypes'
import * as carInfoForDemageTypes from './CarInfoForDemageTypes'
import * as demageEditorTypes from './DemageEditorTypes'
import * as demageOpResultTypes from './DemageOpResultTypes'
import * as imageListForDemageTypes from '../android/components/demageInfo/ImageListForDemageTypes'
import * as recordForDemageTypes from './RecordForDemageTypes'
import * as demageResponsibilityListTypes from '../android/complatedViews/demageResponsibilityList/DemageResponsibilityListTypes'
import * as demageResponsibilityListOperationTypes from './DemageResponsibilityListOperationTypes'
import * as demageListOperationTypes from './DemageListOperationTypes'
import * as taskLoanListTypes from '../android/complatedViews/taskLoanList/taskLoanListTypes'
import * as taskLoanRelListTypes from '../android/complatedViews/taskLoanRelList/taskLoanRelListTypes'
import * as carsTypes from '../android/views/cars/CarsTypes'
import * as carInfoTypes from '../android/views/carInfo/CarInfoTypes'
import * as addCarTypes from '../android/views/createCar/AddCarTypes'
import * as cityTypes from '../android/views/select/city/CityTypes'
import * as makeTypes from '../android/views/select/make/MakeTypes'
import * as receiveTypes from '../android/views/select/receive/ReceiveTypes'
import * as entrustTypes from '../android/views/select/entrust/EntrustTypes'
import * as addCarImageTypes from '../android/views/uploadImageForCreateCar/AddCarImageTypes'

import * as baseAddrListTypes from '../android/complatedViews/select/baseAddrList/baseAddrListTypes'

//component
import * as truckInfoTypes from '../android/complatedViews/truck/truckInfo/truckInfoActionTypes'
import * as truckRepairListActionTypes from '../android/complatedViews/truck/truckRepairList/truckRepairListActionTypes'
import * as truckInsuranceActionTypes from '../android/complatedViews/truck/truckInsurance/truckInsuranceActionTypes'
import * as truckImageActionTypes from '../android/complatedViews/truck/truckImage/truckImageActionTypes'
import * as trailerInfoActionTypes from '../android/complatedViews/trailer/trailerInfo/trailerInfoActionTypes'
import * as trailerInsuranceActionTypes from '../android/complatedViews/trailer/trailerInsurece/trailerInsuranceActionTypes'
import * as trailerRepairListActionTypes from '../android/complatedViews/trailer/trailerRepairList/trailerRepairListActionTypes'
import * as trailerImageActionTypes from '../android/complatedViews/trailer/trailerImage/trailerImageActionTypes'

//settingBlock-views-complated 
import * as updatePassword from '../android/complatedViews/updatePassword/updatePasswordActionTypes'
import * as personalCenter from '../android/complatedViews/personalCenter/personalCenterTypes'

// <<<End

export {
    //settingBlock-views-complated 
    updatePassword,
    personalCenter,
    // <<<End
    //component
    truckInfoTypes,
    truckRepairListActionTypes,
    truckInsuranceActionTypes,
    truckImageActionTypes,
    trailerInfoActionTypes,
    trailerInsuranceActionTypes,
    trailerRepairListActionTypes,
    trailerImageActionTypes,
    // <<<End
    //view
    homeTypes,
    workTypes,

    //trailerInfoTypes,
    driverInfoTypes,
    fuelFillingRecordTypes,
    cityRouteListTypes,
    fuelFillingApplyTypes,
    instructTypes,
    branchInstructTypes,
    instructExecutingTypes,
    branchInstructExecutingTypes,
    initializationTypes,
    loginTypes,
    // passwordTypes,
    retrievePasswordTypes,
    //settingTypes,



    baseAddrListTypes,
    carInfoTypes,
    addCarTypes,
    cityTypes,
    makeTypes,
    receiveTypes,
    entrustTypes,
    addCarImageTypes,

    applyAccidentImageTypes,
    applyAccidentTypes,
    selectAddressTypes,
    truckTypes,
    selectAccidentTypeActionTypes,
    accidentListTypes,
    accidentEditorTypes,
    imageForAccidentTypes,
    accidentResponsibilityListTypes,
    cleanRelListTypes,
    selectCityActionTypes,
    selectReceiveActionTypes,
    demageListTypes,
    selectDriverActionTypes,
    selectCarActionTypes,
    applyDamageTypes,
    applyDamageImageTypes,
    carInfoForDemageTypes,
    demageEditorTypes,
    demageOpResultTypes,
    imageListForDemageTypes,
    recordForDemageTypes,
    demageResponsibilityListTypes,
    demageResponsibilityListOperationTypes,
    demageListOperationTypes,
    taskLoanListTypes,
    taskLoanRelListTypes,
    carsTypes
}   