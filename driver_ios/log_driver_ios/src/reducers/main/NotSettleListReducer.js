import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        notSettleList: [],
        isComplete: false,
        search: null
    },
    getNotSettleList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
    getNotSettleListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.notSettleListActionType.get_notSettleList_success)]: (state, action) => {
        const { payload: { notSettleList, isComplete, search } } = action
        return {
            ...state,
            data: {
                notSettleList,
                isComplete,
                search
            },
            getNotSettleList: {
                ...state.getNotSettleList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.notSettleListActionType.get_notSettleList_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getNotSettleList: {
                ...state.getNotSettleList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.notSettleListActionType.get_notSettleList_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getNotSettleList: {
                ...state.getNotSettleList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.notSettleListActionType.get_notSettleList_waiting)]: (state, action) => {
        return {
            ...initialState,
            getNotSettleList: {
                ...initialState.getNotSettleList,
                isResultStatus: 1
            }
        }
    },

}, initialState)
