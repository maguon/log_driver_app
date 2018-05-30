import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actionTypes/index'

const initialState = {
    data: {
        makeList: []
    },
    getMakeList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.makeTypes.GET_MakeList_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            data: {
                makeList: data
            },
            getMakeList: {
                ...state.getMakeList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.makeTypes.GET_MakeList_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getMakeList: {
                ...state.getMakeList,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.makeTypes.GET_MakeList_WAITING]: (state, action) => {
        return {
            ...state,
            getMakeList: {
                ...state.getMakeList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.makeTypes.GET_MakeList_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getMakeList: {
                ...state.getMakeList,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.makeTypes.GET_MakeList_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getMakeList: {
                ...state.getMakeList,
                isResultStatus: 5,
                errorMsg: data
            }
        }
    }
}, initialState)