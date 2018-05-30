import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actionTypes/index'

const initialState = {
    data: {
        receiveList: []
    },
    getRecevieList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.receiveTypes.GET_Receives_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            data: {
                receiveList: data
            },
            getRecevieList: {
                ...state.getRecevieList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.receiveTypes.GET_Receives_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRecevieList: {
                ...state.getRecevieList,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.receiveTypes.GET_Receives_WAITING]: (state, action) => {
        return {
            ...state,
            getRecevieList: {
                ...state.getRecevieList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.receiveTypes.GET_Receives_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRecevieList: {
                ...state.getRecevieList,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.receiveTypes.GET_Receives_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRecevieList: {
                ...state.getRecevieList,
                isResultStatus: 5,
                errorMsg: data
            }
        }
    }
}, initialState)