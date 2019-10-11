import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        CashETC: [],
        isComplete: false
    },
    getCashETC: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
    getCashETCMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.cashETCType.get_CashETC_success)]: (state, action) => {
        const { payload: { CashETC, isComplete } } = action

        return {
            ...state,
            data: {
                CashETC,
                isComplete,
            },
            getCashETC: {
                ...state.getCashETC,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.cashETCType.get_CashETC_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCashETC: {
                ...state.getCashETC,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.cashETCType.get_CashETC_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCashETC: {
                ...state.getCashETC,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.cashETCType.get_CashETC_waiting)]: (state, action) => {
        return {
            ...initialState,
            getCashETC: {
                ...initialState.getCashETC,
                isResultStatus: 1
            }
        }
    },


    [actionTypes.cashETCType.get_CashETCMore_success]: (state, action) => {
        const { payload: { CashETC, isComplete } } = action
        return {
            ...state,
            data: {
                ...state.data,
                CashETC: [...state.data.CashETC, ...CashETC],
                isComplete
            },
            getCashETC: {
                ...initialState.getCashETC,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.cashETCType.get_CashETCMore_waiting]: (state, action) => {
        return {
            ...state,
            getCashETCMore: {
                ...initialState.getCashETCMore,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.cashETCType.get_CashETCMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCashETCMore: {
                ...initialState.getCashETCMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.cashETCType.get_CashETCMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCashETCMore: {
                ...initialState.getCashETCMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.cashETCType.clean_CashETC]: (state, action) => {
        return {
            ...initialState
        }
    }
}, initialState)
