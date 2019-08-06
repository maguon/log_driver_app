import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        truckInsuranceList: []
    },
    getTruckInsurance: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误),6(未绑定)]
export default handleActions({
    [(actionTypes.truckInsuranceActionType.GET_TruckInsurance_SUCCESS)]: (state, action) => {
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
    [(actionTypes.truckInsuranceActionType.GET_TruckInsurance_FAILED)]: (state, action) => {
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
    [(actionTypes.truckInsuranceActionType.GET_TruckInsurance_ERROR)]: (state, action) => {
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
    [(actionTypes.truckInsuranceActionType.GET_TruckInsurance_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getTruckInsurance: {
                ...initialState.getTruckInsurance,
                isResultStatus: 1
            }
        }
    },
}, initialState)
