import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes/index'


//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
const initialState = {
    data: {
        carInfo: {},
        imageList: [],
        index: 0
    },
    getCarInfo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

export default handleActions({
    [actionTypes.carInfoTypes.GET_CarInfo_SUCCESS]: (state, action) => {
        const { payload: { data: { carInfo, imageList } } } = action
        return {
            data: {
                carInfo,
                imageList
            },
            getCarInfo: {
                ...state.getCarInfo,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carInfoTypes.GET_CarInfo_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCarInfo: {
                ...state.getCarInfo,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.GET_CarInfo_WAITING]: (state, action) => {
        return {
            ...state,
            getCarInfo: {
                ...state.getCarInfo,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.carInfoTypes.GET_CarInfo_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCarInfo: {
                ...state.getCarInfo,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.GET_CarInfo_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCarInfo: {
                ...state.getCarInfo,
                isResultStatus: 5,
                errorMsg: data
            }
        }
    },



    [actionTypes.carInfoTypes.set_indexForCarInfo]: (state, action) => {
        const { payload: { index } } = action
        return {
            ...state,
            data: {
                ...state.data,
                index
            }
        }
    }
}, initialState)