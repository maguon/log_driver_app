import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        accidentList: [],
        isComplete: false
    },
    getAccidentList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
    getAccidentListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.accidentListActionType.get_accidentList_success)]: (state, action) => {
        const { payload: { accidentList, isComplete } } = action
        return {
            ...state,
            data: {
                accidentList,
                isComplete
            },
            getAccidentList: {
                ...state.getAccidentList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.accidentListActionType.get_accidentList_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getAccidentList: {
                ...state.getAccidentList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.accidentListActionType.get_accidentList_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getAccidentList: {
                ...state.getCityRouteList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.accidentListActionType.get_accidentList_waiting)]: (state, action) => {
        return {
            ...initialState,
            getAccidentList: {
                ...initialState.getAccidentList,
                isResultStatus: 1
            }
        }
    },


    [actionTypes.accidentListActionType.get_accidentListMore_success]: (state, action) => {
        const { payload: { accidentList, isComplete } } = action
        return {
            ...state,
            data: {
                accidentList: [...state.data.accidentList, ...accidentList],
                isComplete
            },
            getAccidentListMore: {
                ...initialState.getAccidentListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.accidentListActionType.get_accidentListMore_waiting]: (state, action) => {
        return {
            ...state,
            getAccidentListMore: {
                ...initialState.getAccidentListMore,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.accidentListActionType.get_accidentListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getAccidentListMore: {
                ...initialState.getAccidentListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.accidentListActionType.get_accidentListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getAccidentListMore: {
                ...initialState.getAccidentListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)
