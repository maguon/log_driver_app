import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actionTypes/index'

const initialState = {
    data: {
        truckImageList: [],
    },
    getTruckImage: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}


export default handleActions({
    [(actionTypes.truckImageActionTypes.GET_TruckImage_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckImageList: data.truckImageList
            },
            getTruckImage: {
                ...state.getTruckImage,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.truckImageActionTypes.GET_TruckImage_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckImage: {
                ...state.getTruckImage,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.truckImageActionTypes.GET_TruckImage_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckImage: {
                ...state.getTruckImage,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.truckImageActionTypes.GET_TruckImage_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getTruckImage: {
                ...initialState.getTruckImage,
                isResultStatus: 1
            }
        }
    }
}, initialState)