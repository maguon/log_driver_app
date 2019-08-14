import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        receive: {}
    },
    getReceive: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.receiveForCleanRelActionType.get_receiveForCleanRel_success)]: (state, action) => {
        const { payload: { receive } } = action
        return {
            ...state,
            data: {
                receive
            },
            getReceive: {
                ...state.getReceive,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.receiveForCleanRelActionType.get_receiveForCleanRel_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getReceive: {
                ...state.getReceive,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.receiveForCleanRelActionType.get_receiveForCleanRel_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getReceive: {
                ...state.getReceive,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.receiveForCleanRelActionType.get_receiveForCleanRel_waiting)]: (state, action) => {
        return {
            ...initialState,
            getReceive: {
                ...initialState.getReceive,
                isResultStatus: 1
            }
        }
    }
}, initialState)
