import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

const initialState = {
    data: {
        truckInfo: {},
        truckImageList: [],
        truckRecordList: [],
        truckInsuranceList: []
    },
    getTruckInfo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    getTruckRecord: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    getTruckInsurance: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)] 
export default handleActions({
    [(actionTypes.truckInfoTypes.GET_TruckInfo_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckInfo: data
            },
            getTruckInfo: {
                ...state.getTruckInfo,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInfo_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckInfo: {
                ...state.getTruckInfo,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInfo_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckInfo: {
                ...state.getTruckInfo,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInfo_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckInfo: {
                ...state.getTruckInfo,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInfo_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getTruckInfo: {
                ...initialState.getTruckInfo,
                isResultStatus: 1
            }
        }
    },
    [(actionTypes.truckInfoTypes.RESET_GET_TruckInfo)]: (state, action) => {
        return {
            ...state,
            getTruckInfo: {
                isResultStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    },

    [(actionTypes.truckInfoTypes.GET_TruckInsurance_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckInsuranceList: data
            },
            getTruckInsurance: {
                ...state.getTruckInsurance,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInsurance_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckInsurance: {
                ...state.getTruckInsurance,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInsurance_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckInsurance: {
                ...state.getTruckInsurance,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInsurance_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckInsurance: {
                ...state.getTruckInsurance,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInsurance_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getTruckInsurance: {
                ...initialState.getTruckInsurance,
                isResultStatus: 1
            }
        }
    },
    [(actionTypes.truckInfoTypes.RESET_GET_TruckInsurance)]: (state, action) => {
        return {
            ...state,
            getTruckInsurance: {
                isResultStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: ''
            }
        }
    }

}, initialState)