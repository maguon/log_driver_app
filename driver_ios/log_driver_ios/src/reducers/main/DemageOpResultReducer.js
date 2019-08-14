import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data:{
        demageOpResult:{}
    },
    getDemageOpResult:{
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.demageOpResultType.get_DemageOpResult_success]: (state, action) => {
        const { payload: { demageOpResult } } = action
        return {
            ...state,
            data: {
                demageOpResult
            },
            getDemageOpResult: {
                ...initialState.getDemageOpResult,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.demageOpResultType.get_DemageOpResult_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getDemageOpResult: {
                ...initialState.getDemageOpResult,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.demageOpResultType.get_DemageOpResult_waiting]: (state, action) => {
        return {
            ...state,
            getDemageOpResult: {
                ...initialState.getDemageOpResult,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.demageOpResultType.get_DemageOpResult_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getDemageOpResult: {
                ...initialState.getDemageOpResult,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)
