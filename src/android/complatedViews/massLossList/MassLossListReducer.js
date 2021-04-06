import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes/index'

const initialState = {
    data: {
        massLossList: [],
        isComplete: false
    },
    getMassLossListMore: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    getMassLossList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.massLossListTypes.get_MassLossList_success]: (state, action) => {
        const { payload: { massLossList, isComplete } } = action
        return {
            ...state,
            data: {
                massLossList,
                isComplete
            },
            getMassLossList: {
                ...initialState.getMassLossList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.massLossListTypes.get_MassLossList_waiting]: (state, action) => {
        return {
            ...state,
            getMassLossList: {
                ...initialState.getMassLossList,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.massLossListTypes.get_MassLossList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getMassLossList: {
                ...initialState.getMassLossList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.massLossListTypes.get_MassLossList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getMassLossList: {
                ...initialState.getMassLossList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [actionTypes.massLossListTypes.get_MassLossListMore_success]: (state, action) => {
        const { payload: { massLossList, isComplete } } = action
        return {
            ...state,
            data: {
                massLossList: [...state.data.massLossList, ...massLossList],
                isComplete
            },
            getMassLossListMore: {
                ...initialState.getMassLossListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.massLossListTypes.get_MassLossListMore_waiting]: (state, action) => {
        return {
            ...state,
            getMassLossListMore: {
                ...initialState.getMassLossListMore,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.massLossListTypes.get_MassLossListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getMassLossListMore: {
                ...initialState.getMassLossListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.massLossListTypes.get_MassLossListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getMassLossListMore: {
                ...initialState.getMassLossListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    }

}, initialState)