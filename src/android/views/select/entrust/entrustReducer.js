import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actionTypes/index'

const initialState = {
    data: {
        entrustList: []
    },
    getEntrustList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.entrustTypes.GET_Entrusts_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            data: {
                entrustList: data
            },
            getEntrustList: {
                ...state.getEntrustList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.entrustTypes.GET_Entrusts_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getEntrustList: {
                ...state.getEntrustList,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.entrustTypes.GET_Entrusts_WAITING]: (state, action) => {
        return {
            ...state,
            getEntrustList: {
                ...state.getEntrustList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.entrustTypes.GET_Entrusts_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getEntrustList: {
                ...state.getEntrustList,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.entrustTypes.GET_Entrusts_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getEntrustList: {
                ...state.getEntrustList,
                isResultStatus: 5,
                errorMsg: data
            }
        }
    }
}, initialState)