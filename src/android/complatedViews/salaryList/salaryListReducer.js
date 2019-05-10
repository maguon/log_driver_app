import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes/index'

const initialState = {
    data: {
        salaryList: [],
        isCompleted: false
    },
    getSalaryList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getSalaryListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [(actionTypes.salaryList.get_salaryLst_success)]: (state, action) => {
        const { payload: { salaryList, isCompleted } } = action
        return {
            ...state,
            data: {
                ...state.data,
                salaryList,
                isCompleted
            },
            getSalaryList: {
                ...state.getSalaryList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.salaryList.get_salaryLst_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getSalaryList: {
                ...state.getSalaryList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.salaryList.get_salaryLst_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getSalaryList: {
                ...state.getSalaryList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.salaryList.get_salaryLst_waiting)]: (state, action) => {
        return {
            ...initialState,
            getSalaryList: {
                ...initialState.getSalaryList,
                isResultStatus: 1
            }
        }
    },





    [actionTypes.salaryList.get_salaryLstMore_success]: (state, action) => {
        const { payload: { salaryList, isCompleted } } = action
        return {
            ...state,
            data: {
                ...state.data,
                salaryList: [...state.data.salaryList, ...salaryList],
                isCompleted
            },
            getSalaryListMore: {
                ...initialState.getSalaryListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.salaryList.get_salaryLstMore_waiting]: (state, action) => {
        return {
            ...state,
            getSalaryListMore: {
                ...initialState.getSalaryListMore,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.salaryList.get_salaryLstMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getSalaryListMore: {
                ...initialState.getSalaryListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.salaryList.get_salaryLstMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getSalaryListMore: {
                ...initialState.getSalaryListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)

