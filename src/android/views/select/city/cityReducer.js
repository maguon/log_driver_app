import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actionTypes/index'


//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
const initialState = {
    data: {
        cityList: []
    },
    getCityList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

export default handleActions({
    [actionTypes.cityTypes.GET_CITYS_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            data: {
                cityList: data
            },
            getCityList: {
                ...state.getCityList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.cityTypes.GET_CITYS_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCityList: {
                ...state.getCityList,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.cityTypes.GET_CITYS_WAITING]: (state, action) => {
        return {
            ...state,
            getCityList: {
                ...state.getCityList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.cityTypes.GET_CITYS_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCityList: {
                ...state.getCityList,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.cityTypes.GET_CITYS_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCityList: {
                ...state.getCityList,
                isResultStatus: 5,
                errorMsg: data
            }
        }
    }
}, initialState)