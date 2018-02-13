import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

const initialState = {
    data: {
        accidentResponsibilityList: [],
        isComplete: false
    },
    getAccidentResponsibilityList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
    getAccidentResponsibilityListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.accidentResponsibilityListTypes.get_accidentResponsibilityList_success)]: (state, action) => {
        const { payload: { accidentResponsibilityList, isComplete } } = action
        return {
            ...state,
            data: {
                accidentResponsibilityList,
                isComplete
            },
            getAccidentResponsibilityList: {
                ...state.getAccidentResponsibilityList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.accidentResponsibilityListTypes.get_accidentResponsibilityList_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getAccidentResponsibilityList: {
                ...state.getAccidentResponsibilityList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.accidentResponsibilityListTypes.get_accidentResponsibilityList_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getAccidentResponsibilityList: {
                ...state.getAccidentResponsibilityList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.accidentResponsibilityListTypes.get_accidentResponsibilityList_waiting)]: (state, action) => {
        return {
            ...initialState,
            getAccidentResponsibilityList: {
                ...initialState.getAccidentResponsibilityList,
                isResultStatus: 1
            }
        }
    },


    [actionTypes.accidentResponsibilityListTypes.get_accidentResponsibilityListMore_success]: (state, action) => {
        const { payload: { accidentResponsibilityList, isComplete } } = action
        return {
            ...state,
            data: {
                accidentResponsibilityList: [...state.data.accidentResponsibilityList, ...accidentResponsibilityList],
                isComplete
            },
            getAccidentResponsibilityListMore: {
                ...initialState.getAccidentResponsibilityListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.accidentResponsibilityListTypes.get_accidentResponsibilityListMore_waiting]: (state, action) => {
        return {
            ...state,
            getAccidentResponsibilityListMore: {
                ...initialState.getAccidentResponsibilityListMore,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.accidentResponsibilityListTypes.get_accidentResponsibilityListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getAccidentResponsibilityListMore: {
                ...initialState.getAccidentResponsibilityListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.accidentResponsibilityListTypes.get_accidentResponsibilityListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getAccidentResponsibilityListMore: {
                ...initialState.getAccidentResponsibilityListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)