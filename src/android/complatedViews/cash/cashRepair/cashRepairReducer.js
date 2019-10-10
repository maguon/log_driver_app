import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actionTypes/index'

const initialState = {
    data: {
        cashRepairList: [],
        isComplete: false
    },
    getCashRepairList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
    getCashRepairListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.cashRepair.get_cashRepairList_success)]: (state, action) => {
        const { payload: { cashRepairList, isComplete } } = action
        return {
            ...state,
            data: {
                cashRepairList,
                isComplete
            },
            getCashRepairList: {
                ...state.getCashRepairList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.cashRepair.get_cashRepairList_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCashRepairList: {
                ...state.getCashRepairList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.cashRepair.get_cashRepairList_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCashRepairList: {
                ...state.getCashRepairList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.cashRepair.get_cashRepairList_waiting)]: (state, action) => {
        return {
            ...initialState,
            getCashRepairList: {
                ...initialState.getCashRepairList,
                isResultStatus: 1
            }
        }
    },


    [actionTypes.cashRepair.get_cashRepairListMore_success]: (state, action) => {
        const { payload: { cashRepairList, isComplete } } = action
        return {
            ...state,
            data: {
                cashRepairList: [...state.data.cashRepairList, ...cashRepairList],
                isComplete
            },
            getCashRepairListMore: {
                ...initialState.getCashRepairListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.cashRepair.get_cashRepairListMore_waiting]: (state, action) => {
        return {
            ...state,
            getCashRepairListMore: {
                ...initialState.getCashRepairListMore,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.cashRepair.get_cashRepairListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCashRepairListMore: {
                ...initialState.getCashRepairListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.cashRepair.get_cashRepairListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCashRepairListMore: {
                ...initialState.getCashRepairListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)