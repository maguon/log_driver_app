import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

const initialState = {
    createFuelFillingApply: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
export default handleActions({
    [(actionTypes.fuelFillingApplyTypes.CREATE_FuelFilling_SUCCESS)]: (state, action) => {
        return {
            createFuelFillingApply: {
                ...state.createFuelFillingApply,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.fuelFillingApplyTypes.CREATE_FuelFilling_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            createFuelFillingApply: {
                ...state.createFuelFillingApply,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.fuelFillingApplyTypes.CREATE_FuelFilling_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            createFuelFillingApply: {
                ...state.createFuelFillingApply,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.fuelFillingApplyTypes.CREATE_FuelFilling_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            createFuelFillingApply: {
                ...state.createFuelFillingApply,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.fuelFillingApplyTypes.CREATE_FuelFilling_WAITING)]: (state, action) => {
        return {
            ...initialState,
            createFuelFillingApply: {
                ...initialState.createFuelFillingApply,
                isResultStatus: 1
            }
        }
    },
}, initialState)