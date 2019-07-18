import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes/index'

const initialState = {
    data: {
        cleanFeeList: []
    },
    getCleanFeeList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.cleanFeeList.get_cleanFeeList_success)]: (state, action) => {
        const { payload: { cleanFeeList } } = action
        return {
            ...state,
            data: {
                cleanFeeList
            },
            getCleanFeeList: {
                ...state.getCleanFeeList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.cleanFeeList.get_cleanFeeList_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCleanFeeList: {
                ...state.getCleanFeeList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.cleanFeeList.get_cleanFeeList_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCleanFeeList: {
                ...state.getCleanFeeList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.cleanFeeList.get_cleanFeeList_waiting)]: (state, action) => {
        return {
            ...initialState,
            getCleanFeeList: {
                ...initialState.getCleanFeeList,
                isResultStatus: 1
            }
        }
    }
}, initialState)