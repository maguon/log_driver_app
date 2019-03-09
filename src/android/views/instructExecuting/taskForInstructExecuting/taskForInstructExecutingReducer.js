import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actionTypes/index'

const initialState = {
    changeTaskStatus: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}


export default handleActions({
    [(actionTypes.taskForInstructExecuting.change_taskStatusForInstructExecuting_success)]: (state, action) => {
        return {
            ...state,
            changeTaskStatus: {
                ...state.changeTaskStatus,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.taskForInstructExecuting.change_taskStatusForInstructExecuting_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            changeTaskStatus: {
                ...state.changeTaskStatus,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.taskForInstructExecuting.change_taskStatusForInstructExecuting_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            changeTaskStatus: {
                ...state.changeTaskStatus,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.taskForInstructExecuting.change_taskStatusForInstructExecuting_waiting)]: (state, action) => {
        return {
            ...state,
            changeTaskStatus: {
                ...initialState.changeTaskStatus,
                isResultStatus: 1
            }
        }
    }
}, initialState)