import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes/index'
import moment from 'moment'

const initialState = {
    data: {
        total: {
            oilDateStart: moment().format('YYYY-MM-01'),
            oilDateEnd: moment().format('YYYY-MM-DD'),
            oil_money: null,
            urea_money: null
        },
        fuelFillingRecordList: [],
        isComplete: false
    },
    getFuelFillingRecord: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    getFuelFillingRecordMore: {
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
        const { payload: { data, isComplete } } = action
        return {
            ...state,
            data: {
                ...initialState.data,
                total: {
                    ...state.data.total,
                    ...data.total
                },
                fuelFillingRecordList: data.fuelFillingRecordList,
                isComplete
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
            ...state,
            getFuelFillingRecord: {
                ...initialState.getFuelFillingRecord,
                isResultStatus: 1
            }
        }
    },




    [(actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_More_SUCCESS)]: (state, action) => {
        const { payload: { fuelFillingRecordList, isComplete } } = action
        return {
            ...state,
            data: {
                ...state.data,
                fuelFillingRecordList: [...state.data.fuelFillingRecordList, ...fuelFillingRecordList],
                isComplete
            },
            getFuelFillingRecordMore: {
                ...state.getFuelFillingRecordMore,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_More_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getFuelFillingRecordMore: {
                ...state.getFuelFillingRecordMore,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },

    [(actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_More_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getFuelFillingRecordMore: {
                ...state.getFuelFillingRecordMore,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_More_WAITING)]: (state, action) => {
        return {
            ...state,
            getFuelFillingRecordMore: {
                ...initialState.getFuelFillingRecordMore,
                isResultStatus: 1
            }
        }
    }
}, initialState)

