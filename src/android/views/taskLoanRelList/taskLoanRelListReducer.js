import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        taskLoanRelList: []
    },
    getTaskLoanRelList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.taskLoanRelListTypes.get_taskLoanRelList_success)]: (state, action) => {
        const { payload: { taskLoanRelList } } = action
        return {
            ...state,
            data: {
                taskLoanRelList
            },
            getTaskLoanRelList: {
                ...state.getTaskLoanRelList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.taskLoanRelListTypes.get_taskLoanRelList_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getTaskLoanRelList: {
                ...state.getTaskLoanRelList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.taskLoanRelListTypes.get_taskLoanRelList_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getTaskLoanRelList: {
                ...state.getTaskLoanRelList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.taskLoanRelListTypes.get_taskLoanRelList_waiting)]: (state, action) => {
        return {
            ...initialState,
            getTaskLoanRelList: {
                ...initialState.getTaskLoanRelList,
                isResultStatus: 1
            }
        }
    }
}, initialState)