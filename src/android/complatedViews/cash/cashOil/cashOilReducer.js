import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actionTypes/index'

const initialState = {
    data: {
        cashOilList: [],
        isComplete: false
    },
    getCashOilList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
    getCashOilListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.cashOil.get_cashOilList_success)]: (state, action) => {
        const { payload: { cashOilList, isComplete } } = action
        return {
            ...state,
            data: {
                cashOilList,
                isComplete
            },
            getCashOilList: {
                ...state.getCashOilList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.cashOil.get_cashOilList_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCashOilList: {
                ...state.getCashOilList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.cashOil.get_cashOilList_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCashOilList: {
                ...state.getCashOilList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.cashOil.get_cashOilList_waiting)]: (state, action) => {
        return {
            ...initialState,
            getCashOilList: {
                ...initialState.getCashOilList,
                isResultStatus: 1
            }
        }
    },


    [actionTypes.cashOil.get_cashOilListMore_success]: (state, action) => {
        const { payload: { cashOilList, isComplete } } = action
        return {
            ...state,
            data: {
                cashOilList: [...state.data.cashOilList, ...cashOilList],
                isComplete
            },
            getCashOilListMore: {
                ...initialState.getCashOilListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.cashOil.get_cashOilListMore_waiting]: (state, action) => {
        return {
            ...state,
            getCashOilListMore: {
                ...initialState.getCashOilListMore,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.cashOil.get_cashOilListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCashOilListMore: {
                ...initialState.getCashOilListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.cashOil.get_cashOilListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCashOilListMore: {
                ...initialState.getCashOilListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)