import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actionTypes/index'

const initialState = {
    data: {
        truckInfo: {}
    },
    getTruckInfo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}


export default handleActions({
    [(actionTypes.truckInfoTypes.GET_TruckInfo_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckInfo: data
            },
            getTruckInfo: {
                ...state.getTruckInfo,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInfo_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckInfo: {
                ...state.getTruckInfo,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInfo_Unbind)]: (state, action) => {
        return {
            ...state,
            getTruckInfo: {
                ...state.getTruckInfo,
                isResultStatus: 5
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInfo_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckInfo: {
                ...state.getTruckInfo,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInfo_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getTruckInfo: {
                ...initialState.getTruckInfo,
                isResultStatus: 1
            }
        }
    }
}, initialState)