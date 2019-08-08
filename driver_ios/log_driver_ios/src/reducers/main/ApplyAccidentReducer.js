import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data:{
        accidentId:0,
        truckNum:0
    },
    applyAccident: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.applyAccidentActionType.apply_Accident_success]: (state, action) => {
        const { payload: { accidentId ,truckNum} } = action
        return {
            ...state,
            data:{
                accidentId,
                truckNum
            },
            applyAccident: {
                ...initialState.applyAccident,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.applyAccidentActionType.apply_Accident_failed]: (state, action) => {
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
    [actionTypes.applyAccidentActionType.apply_Accident_waiting]: (state, action) => {
        return {
            ...state,
            applyAccident: {
                ...initialState.applyAccident,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.applyAccidentActionType.apply_Accident_error]: (state, action) => {
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
