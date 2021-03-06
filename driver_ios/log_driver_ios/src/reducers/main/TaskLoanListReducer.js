import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        taskLoanList: [],
        isComplete: false
    },
    getTaskLoanList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
    getTaskLoanListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.taskLoanListActionType.get_taskLoanList_success)]: (state, action) => {
        const { payload: { taskLoanList, isComplete } } = action
        return {
            ...state,
            data: {
                taskLoanList,
                isComplete
            },
            getTaskLoanList: {
                ...state.getTaskLoanList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.taskLoanListActionType.get_taskLoanList_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getTaskLoanList: {
                ...state.getTaskLoanList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.taskLoanListActionType.get_taskLoanList_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getTaskLoanList: {
                ...state.getTaskLoanList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.taskLoanListActionType.get_taskLoanList_waiting)]: (state, action) => {
        return {
            ...initialState,
            getTaskLoanList: {
                ...initialState.getTaskLoanList,
                isResultStatus: 1
            }
        }
    },


    [actionTypes.taskLoanListActionType.get_taskLoanListMore_success]: (state, action) => {
        const { payload: { taskLoanList, isComplete } } = action
        return {
            ...state,
            data: {
                taskLoanList: [...state.data.taskLoanList, ...taskLoanList],
                isComplete
            },
            getTaskLoanListMore: {
                ...initialState.getTaskLoanListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.taskLoanListActionType.get_taskLoanListMore_waiting]: (state, action) => {
        return {
            ...state,
            getTaskLoanListMore: {
                ...initialState.getTaskLoanListMore,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.taskLoanListActionType.get_taskLoanListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getTaskLoanListMore: {
                ...initialState.getTaskLoanListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.taskLoanListActionType.get_taskLoanListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getTaskLoanListMore: {
                ...initialState.getTaskLoanListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)
