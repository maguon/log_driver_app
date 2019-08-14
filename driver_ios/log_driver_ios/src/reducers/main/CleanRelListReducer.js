import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        cleanRelList: [],
        isComplete: false
    },
    getCleanRelList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
    getCleanRelListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.cleanRelListActionType.get_cleanRelList_success)]: (state, action) => {
        const { payload: { cleanRelList, isComplete } } = action
        return {
            ...state,
            data: {
                cleanRelList,
                isComplete
            },
            getCleanRelList: {
                ...state.getCleanRelList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.cleanRelListActionType.get_cleanRelList_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCleanRelList: {
                ...state.getCleanRelList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.cleanRelListActionType.get_cleanRelList_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCleanRelList: {
                ...state.getCleanRelList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.cleanRelListActionType.get_cleanRelList_waiting)]: (state, action) => {
        return {
            ...initialState,
            getCleanRelList: {
                ...initialState.getCleanRelList,
                isResultStatus: 1
            }
        }
    },


    [actionTypes.cleanRelListActionType.get_cleanRelListMore_success]: (state, action) => {
        const { payload: { cleanRelList, isComplete } } = action
        return {
            ...state,
            data: {
                cleanRelList: [...state.data.cleanRelList, ...cleanRelList],
                isComplete
            },
            getCleanRelListMore: {
                ...initialState.getCleanRelListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.cleanRelListActionType.get_cleanRelListMore_waiting]: (state, action) => {
        return {
            ...state,
            getCleanRelListMore: {
                ...initialState.getCleanRelListMore,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.cleanRelListActionType.get_cleanRelListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCleanRelListMore: {
                ...initialState.getCleanRelListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.cleanRelListActionType.get_cleanRelListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCleanRelListMore: {
                ...initialState.getCleanRelListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)
