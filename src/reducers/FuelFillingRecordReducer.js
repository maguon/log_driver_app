import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

const initialState = {
    data: {
        total: {},
        fuelFillingRecordList: []
    },
    getFuelFillingRecord: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
export default handleActions({
    [(actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                total: data.total,
                fuelFillingRecordList: data.fuelFillingRecordList
            },
            getFuelFillingRecord: {
                ...state.getFuelFillingRecord,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getFuelFillingRecord: {
                ...state.getFuelFillingRecord,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getFuelFillingRecord: {
                ...state.getFuelFillingRecord,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getFuelFillingRecord: {
                ...state.getFuelFillingRecord,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getFuelFillingRecord: {
                ...initialState.getFuelFillingRecord,
                isResultStatus: 1
            }
        }
    },
}, initialState)