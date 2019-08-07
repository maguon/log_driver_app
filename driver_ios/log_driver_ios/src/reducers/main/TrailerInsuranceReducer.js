import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        trailerInsuranceList: []
    },
    getTrailerInsurance: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误),6(未绑定)]
export default handleActions({
    [(actionTypes.trailerInsuranceActionType.GET_TrailerInsurance_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                trailerInsuranceList: data
            },
            getTrailerInsurance: {
                ...state.getTrailerInsurance,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.trailerInsuranceActionType.GET_TrailerInsurance_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTrailerInsurance: {
                ...state.getTrailerInsurance,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.trailerInsuranceActionType.GET_TrailerInsurance_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTrailerInsurance: {
                ...state.getTrailerInsurance,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.trailerInsuranceActionType.GET_TrailerInsurance_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getTrailerInsurance: {
                ...initialState.getTrailerInsurance,
                isResultStatus: 1
            }
        }
    },
}, initialState)
