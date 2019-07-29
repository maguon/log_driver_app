import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        driverInfo: {}
    },
    getDriverInfo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.truckActionType.GET_DriverInfoAtTruck_SUCCESS)]: (state, action) => {
        const { payload: { driverInfo } } = action
        return {
            ...state,
            data: {
                driverInfo
            },
            getDriverInfo: {
                ...state.getDriverInfo,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.truckActionType.GET_DriverInfoAtTruck_FAILED)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getDriverInfo: {
                ...state.getDriverInfo,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.truckActionType.GET_DriverInfoAtTruck_ERROR)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getDriverInfo: {
                ...state.getDriverInfo,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.truckActionType.GET_DriverInfoAtTruck_WAITING)]: (state, action) => {
        return {
            ...state,
            getDriverInfo: {
                ...initialState.getDriverInfo,
                isResultStatus: 1
            }
        }
    }
}, initialState)
