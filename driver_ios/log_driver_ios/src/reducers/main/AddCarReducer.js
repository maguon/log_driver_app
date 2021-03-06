import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

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
    [actionTypes.addCarType.ADD_Car_SUCCESS]: (state, action) => {
        const { payload: { carId, vin } } = action
        return {
            ...state,
            data: {
                carId,
                vin,
                status: 1
            },
            createCar: {
                ...initialState.createCar,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.addCarType.ADD_Car_FAILED]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            createCar: {
                ...initialState.createCar,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.addCarType.ADD_Car_WAITING]: (state, action) => {
        return {
            ...state,
            createCar: {
                ...initialState.createCar,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.addCarType.ADD_Car_ERROR]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            createCar: {
                ...initialState.createCar,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.addCarType.modify_car_success]: (state, action) => {
        return {
            ...state,
            modifyCar: {
                ...initialState.modifyCar,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.addCarType.modify_car_failed]: (state, action) => {
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
    [actionTypes.addCarType.modify_car_waiting]: (state, action) => {
        return {
            ...state,
            modifyCar: {
                ...initialState.modifyCar,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.addCarType.modify_car_error]: (state, action) => {
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

    [actionTypes.addCarType.clean_addCar]: (state, action) => {
        return {
            ...initialState
        }
    }
}, initialState)
