import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes/index'

const initialState = {
    createFuelFillingApply: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
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
    // [(actionTypes.fuelFillingApplyTypes.CREATE_FuelFilling_SERVICEERROR)]: (state, action) => {
    //     const { payload: { data } } = action
    //     return {
    //         createFuelFillingApply: {
    //             ...state.createFuelFillingApply,
    //             isResultStatus: 5,
    //             serviceFailedMsg: data
    //         }
    //     }
    // },
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
    // [(actionTypes.fuelFillingApplyTypes.RESET_CREATE_FuelFilling)]: (state, action) => {
    //     return { ...initialState }
    // }
}, initialState)