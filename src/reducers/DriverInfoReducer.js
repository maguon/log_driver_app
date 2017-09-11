import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

const initialState = {
    data: {
        driverInfo: {},
        driverImageList: [],
        driverRecordList: []
    },
    getDriverInfo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    getDriverRecord: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    getDriverImage:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)] 
export default handleActions({
    [(actionTypes.driverInfoTypes.GET_DriverInfo_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                driverInfo: data
            },
            getDriverInfo: {
                ...state.getDriverInfo,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.GET_DriverInfo_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverInfo: {
                ...state.getDriverInfo,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.driverInfoTypes.GET_DriverInfo_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverInfo: {
                ...state.getDriverInfo,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.driverInfoTypes.GET_DriverInfo_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverInfo: {
                ...state.getDriverInfo,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.driverInfoTypes.GET_DriverInfo_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getDriverInfo: {
                ...initialState.getDriverInfo,
                isResultStatus: 1
            }
        }
    },

    [(actionTypes.driverInfoTypes.GET_DriverRecord_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                driverRecordList: data
            },
            getDriverRecord: {
                ...state.getDriverRecord,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.GET_DriverRecord_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverRecord: {
                ...state.getDriverRecord,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.driverInfoTypes.GET_DriverRecord_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverRecord: {
                ...state.getDriverRecord,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.driverInfoTypes.GET_DriverRecord_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverRecord: {
                ...state.getDriverRecord,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.driverInfoTypes.GET_DriverRecord_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getDriverRecord: {
                ...initialState.getDriverRecord,
                isResultStatus: 1
            }
        }
    },

    [(actionTypes.driverInfoTypes.GET_DriverImage_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                driverInfo: data.driverInfo,
                driverImageList: data.driverImageList
            },
            getDriverImage: {
                ...state.getDriverImage,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.driverInfoTypes.GET_DriverImage_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverImage: {
                ...state.getDriverImage,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.driverInfoTypes.GET_DriverImage_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverImage: {
                ...state.getDriverImage,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.driverInfoTypes.GET_DriverImage_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getDriverImage: {
                ...state.getDriverImage,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.driverInfoTypes.GET_DriverImage_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getDriverImage: {
                ...initialState.getDriverImage,
                isResultStatus: 1
            }
        }
    }

}, initialState)