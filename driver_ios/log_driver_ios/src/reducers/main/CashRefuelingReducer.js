import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        CashRefueling: [],
        isComplete: false
    },
    getCashRefueling: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
    getCashRefuelingMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.cashRefuelingType.get_CashRefueling_success)]: (state, action) => {
        const { payload: { CashRefueling, isComplete } } = action

        return {
            ...state,
            data: {
                CashRefueling,
                isComplete,
            },
            getCashRefueling: {
                ...state.getCashRefueling,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.cashRefuelingType.get_CashRefueling_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCashRefueling: {
                ...state.getCashRefueling,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.cashRefuelingType.get_CashRefueling_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCashRefueling: {
                ...state.getCashRefueling,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.cashRefuelingType.get_CashRefueling_waiting)]: (state, action) => {
        return {
            ...initialState,
            getCashRefueling: {
                ...initialState.getCashRefueling,
                isResultStatus: 1
            }
        }
    },


    [actionTypes.cashRefuelingType.get_CashRefuelingMore_success]: (state, action) => {
        const { payload: { CashRefueling, isComplete } } = action
        return {
            ...state,
            data: {
                ...state.data,
                CashRefueling: [...state.data.CashRefueling, ...CashRefueling],
                isComplete
            },
            getCashRefuelingMore: {
                ...initialState.getCashRefuelingMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.cashRefuelingType.get_CashRefuelingMore_waiting]: (state, action) => {
        return {
            ...state,
            getCashRefuelingMore: {
                ...initialState.getCashRefuelingMore,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.cashRefuelingType.get_CashRefuelingMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCashRefuelingMore: {
                ...initialState.getCashRefuelingMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.cashRefuelingType.get_CashRefuelingMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCashRefuelingMore: {
                ...initialState.getCashRefuelingMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.cashRefuelingType.clean_CashRefueling]: (state, action) => {
        return {
            ...initialState
        }
    }
}, initialState)
