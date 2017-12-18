import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

const initialState = {
    //isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
    getVCode: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    //isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
    retrieve: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [actionTypes.retrievePasswordTypes.GET_VCODE_SUCCESS]: (state, action) => {
        return {
            ...state,
            getVCode: {
                ...state.getVCode,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.retrievePasswordTypes.GET_VCODE_FAILED]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getVCode: {
                ...state.getVCode,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.retrievePasswordTypes.GET_VCODE_WAITING]: (state, action) => {
        return {
            ...state,
            getVCode: {
                ...state.getVCode,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.retrievePasswordTypes.GET_VCODE_ERROR]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getVCode: {
                ...state.getVCode,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [actionTypes.retrievePasswordTypes.Reset_GET_VCODE]: (state, action) => {
        return {
            ...state,
            getVCode: {
                ...initialState.getVCode
            }
        }
    },

    [actionTypes.retrievePasswordTypes.Retrieve_SUCCESS]: (state, action) => {
        return {
            ...state,
            retrieve: {
                ...state.retrieve,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.retrievePasswordTypes.Retrieve_FAILED]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            retrieve: {
                ...state.retrieve,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.retrievePasswordTypes.Retrieve_WAITING]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            retrieve: {
                ...state.retrieve,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.retrievePasswordTypes.Retrieve_ERROR]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            retrieve: {
                ...state.retrieve,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [actionTypes.retrievePasswordTypes.Reset_Retrieve]: (state, action) => {
        return {
            ...state,
            retrieve: {
                ...initialState.retrieve
            }
        }
    }
}, initialState)