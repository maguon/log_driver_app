import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        accidentResponsibilityList: []
    },
    getAccidentResponsibilityList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.accidentResponsibilityListActionType.get_accidentResponsibilityList_success)]: (state, action) => {
        const { payload: { accidentResponsibilityList } } = action
        return {
            ...state,
            data: {
                accidentResponsibilityList
            },
            getAccidentResponsibilityList: {
                ...state.getAccidentResponsibilityList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.accidentResponsibilityListActionType.get_accidentResponsibilityList_failed)]: (state, action) => {
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
    [(actionTypes.accidentResponsibilityListActionType.get_accidentResponsibilityList_error)]: (state, action) => {
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
    [(actionTypes.accidentResponsibilityListActionType.get_accidentResponsibilityList_waiting)]: (state, action) => {
        return {
            ...initialState,
            getAccidentResponsibilityList: {
                ...initialState.getAccidentResponsibilityList,
                isResultStatus: 1
            }
        }
    }

}, initialState)
