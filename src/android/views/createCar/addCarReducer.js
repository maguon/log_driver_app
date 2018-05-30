import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes/index'

const initialState = {
    data: {
        carId: 0,
        status: 0,
        vin: ''
    },
    createCar: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
    modifyCar: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [actionTypes.addCarTypes.ADD_Car_SUCCESS]: (state, action) => {
        const { payload: { carId, vin } } = action
        return {
            ...state,
            data: {
                carId,
                vin,
                status: 1
            },
            addCar: {
                ...initialState.addCar,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.addCarTypes.ADD_Car_FAILED]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            addCar: {
                ...initialState.addCar,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.addCarTypes.ADD_Car_WAITING]: (state, action) => {
        return {
            ...state,
            addCar: {
                ...initialState.addCar,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.addCarTypes.ADD_Car_ERROR]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            addCar: {
                ...initialState.addCar,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.addCarTypes.modify_car_success]: (state, action) => {
        return {
            ...state,
            modifyCar: {
                ...initialState.modifyCar,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.addCarTypes.modify_car_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            modifyCar: {
                ...initialState.modifyCar,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.addCarTypes.modify_car_waiting]: (state, action) => {
        return {
            ...state,
            modifyCar: {
                ...initialState.modifyCar,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.addCarTypes.modify_car_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            modifyCar: {
                ...initialState.modifyCar,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [actionTypes.addCarTypes.clean_addCar]: (state, action) => {
        return {
            ...initialState
        }
    }
}, initialState)