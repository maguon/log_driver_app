import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

const initialState = {
    applyAccident: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.applyAccidentTypes.apply_Accident_success]: (state, action) => {
        return {
            ...state,
            applyAccident: {
                ...initialState.applyAccident,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.applyAccidentTypes.apply_Accident_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            applyAccident: {
                ...initialState.applyAccident,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.applyAccidentTypes.apply_Accident_waiting]: (state, action) => {
        return {
            ...state,
            applyAccident: {
                ...initialState.applyAccident,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.applyAccidentTypes.apply_Accident_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            applyAccident: {
                ...initialState.applyAccident,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)