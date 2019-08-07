import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        trailerRepairList: []
    },
    getTrailerRepairList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [(actionTypes.trailerRepairListActionType.GET_TrailerRepairRelList_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                trailerRepairList: data
            },
            getTrailerRepairList: {
                ...state.getTrailerRepairList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.trailerRepairListActionType.GET_TrailerRepairRelList_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTrailerRepairList: {
                ...state.getTrailerRepairList,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.trailerRepairListActionType.GET_TrailerRepairRelList_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTrailerRepairList: {
                ...state.getTrailerRepairList,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.trailerRepairListActionType.GET_TrailerRepairRelList_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getTrailerRepairList: {
                ...initialState.getTrailerRepairList,
                isResultStatus: 1
            }
        }
    },
},initialState)
