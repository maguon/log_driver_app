import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        AFine: [],
        isComplete: false
    },
    getAFine: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
    getAFineMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.aFineActionType.get_AFine_success)]: (state, action) => {
        const { payload: { AFine, isComplete } } = action

        return {
            ...state,
            data: {
                AFine,
                isComplete,
            },
            getAFine: {
                ...state.getAFine,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.aFineActionType.get_AFine_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getAFine: {
                ...state.getAFine,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.aFineActionType.get_AFine_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getAFine: {
                ...state.getAFine,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.aFineActionType.get_AFine_waiting)]: (state, action) => {
        return {
            ...initialState,
            getAFine: {
                ...initialState.getAFine,
                isResultStatus: 1
            }
        }
    },


    [actionTypes.aFineActionType.get_AFineMore_success]: (state, action) => {
        const { payload: { AFine, isComplete } } = action
        return {
            ...state,
            data: {
                ...state.data,
                AFine: [...state.data.AFine, ...AFine],
                isComplete
            },
            getAFineMore: {
                ...initialState.getAFineMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.aFineActionType.get_AFineMore_waiting]: (state, action) => {
        return {
            ...state,
            getAFineMore: {
                ...initialState.getAFineMore,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.aFineActionType.get_AFineMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getAFineMore: {
                ...initialState.getAFineMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.aFineActionType.get_AFineMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getAFineMore: {
                ...initialState.getAFineMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.aFineActionType.clean_AFine]: (state, action) => {
        return {
            ...initialState
        }
    }
}, initialState)
