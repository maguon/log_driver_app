import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actionTypes/index'

const initialState = {
    data: {
        cashTollList: [],
        isComplete: false
    },
    getCashTollList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
    getCashTollListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.cashToll.get_cashTollList_success)]: (state, action) => {
        const { payload: { cashTollList, isComplete } } = action
        return {
            ...state,
            data: {
                cashTollList,
                isComplete
            },
            getCashTollList: {
                ...state.getCashTollList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.cashToll.get_cashTollList_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCashTollList: {
                ...state.getCashTollList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.cashToll.get_cashTollList_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCashTollList: {
                ...state.getCashTollList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.cashToll.get_cashTollList_waiting)]: (state, action) => {
        return {
            ...initialState,
            getCashTollList: {
                ...initialState.getCashTollList,
                isResultStatus: 1
            }
        }
    },


    [actionTypes.cashToll.get_cashTollListMore_success]: (state, action) => {
        const { payload: { cashTollList, isComplete } } = action
        return {
            ...state,
            data: {
                cashTollList: [...state.data.cashTollList, ...cashTollList],
                isComplete
            },
            getCashTollListMore: {
                ...initialState.getCashTollListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.cashToll.get_cashTollListMore_waiting]: (state, action) => {
        return {
            ...state,
            getCashTollListMore: {
                ...initialState.getCashTollListMore,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.cashToll.get_cashTollListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCashTollListMore: {
                ...initialState.getCashTollListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.cashToll.get_cashTollListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCashTollListMore: {
                ...initialState.getCashTollListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)