import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        truckRepairList: []
    },
    getTruckRepairList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

export default handleActions({
    [(actionTypes.truckRepairListActionType.GET_TruckRepairRelList_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckRepairList: data
            },
            getTruckRepairList: {
                ...state.getTruckRepairList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.truckRepairListActionType.GET_TruckRepairRelList_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckRepairList: {
                ...state.getTruckRepairList,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.truckRepairListActionType.GET_TruckRepairRelList_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckRepairList: {
                ...state.getTruckRepairList,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.truckRepairListActionType.GET_TruckRepairRelList_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getTruckRepairList: {
                ...initialState.getTruckRepairList,
                isResultStatus: 1
            }
        }
    },
},initialState)
