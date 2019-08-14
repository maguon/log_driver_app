import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        demageResponsibilityList: [],
        isComplete: false
    },
    getDemageResponsibilityListMore: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    getDemageResponsibilityList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.demageResponsibilityListType.get_DemageResponsibilityList_success]: (state, action) => {
        const { payload: { demageResponsibilityList, isComplete } } = action
        return {
            ...state,
            data: {
                demageResponsibilityList,
                isComplete
            },
            getDemageResponsibilityList: {
                ...initialState.getDemageResponsibilityList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.demageResponsibilityListType.get_DemageResponsibilityList_waiting]: (state, action) => {
        return {
            ...state,
            getDemageResponsibilityList: {
                ...initialState.getDemageResponsibilityList,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.demageResponsibilityListType.get_DemageResponsibilityList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getDemageResponsibilityList: {
                ...initialState.getDemageResponsibilityList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.demageResponsibilityListType.get_DemageResponsibilityList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getDemageResponsibilityList: {
                ...initialState.getDemageResponsibilityList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [actionTypes.demageResponsibilityListType.get_DemageResponsibilityListMore_success]: (state, action) => {
        const { payload: { demageResponsibilityList, isComplete } } = action
        return {
            ...state,
            data: {
                demageResponsibilityList: [...state.data.demageResponsibilityList, ...demageResponsibilityList],
                isComplete
            },
            getDemageResponsibilityListMore: {
                ...initialState.getDemageResponsibilityListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.demageResponsibilityListType.get_DemageResponsibilityListMore_waiting]: (state, action) => {
        return {
            ...state,
            getDemageResponsibilityListMore: {
                ...initialState.getDemageResponsibilityListMore,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.demageResponsibilityListType.get_DemageResponsibilityListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getDemageResponsibilityListMore: {
                ...initialState.getDemageResponsibilityListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.demageResponsibilityListType.get_DemageResponsibilityListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getDemageResponsibilityListMore: {
                ...initialState.getDemageResponsibilityListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    }

}, initialState)
