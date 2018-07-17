import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actionTypes/index'

const initialState = {
    data: {
        baseAddrList: []
    },
    getBaseAddrList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [(actionTypes.baseAddrListTypes.get_baseAddrList_success)]: (state, action) => {
        const { payload: { baseAddrList } } = action
        return {
            ...state,
            data: {
                baseAddrList
            },
            getBaseAddrList: {
                ...state.getBaseAddrList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.baseAddrListTypes.get_baseAddrList_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getBaseAddrList: {
                ...state.getBaseAddrList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.baseAddrListTypes.get_baseAddrList_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getBaseAddrList: {
                ...state.getBaseAddrList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.baseAddrListTypes.get_baseAddrList_waiting)]: (state, action) => {
        return {
            ...initialState,
            getBaseAddrList: {
                ...initialState.getBaseAddrList,
                isResultStatus: 1
            }
        }
    },

}, initialState)