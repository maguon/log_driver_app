import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes/index'

const initialState = {
    data: {
        salaryTaskList: [],
    },
    getSalaryTaskList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
}

export default handleActions({
    [(actionTypes.salary.get_salaryTaskList_success)]: (state, action) => {
        const { payload: { salaryTaskList } } = action
        return {
            ...state,
            data: {
                ...state.data,
                salaryTaskList
            },
            getSalaryTaskList: {
                ...state.getSalaryTaskList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.salary.get_salaryTaskList_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getSalaryTaskList: {
                ...state.getSalaryTaskList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.salary.get_salaryTaskList_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getSalaryTaskList: {
                ...state.getSalaryTaskList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.salary.get_salaryTaskList_waiting)]: (state, action) => {
        return {
            ...initialState,
            getSalaryTaskList: {
                ...initialState.getSalaryTaskList,
                isResultStatus: 1
            }
        }
    }
}, initialState)