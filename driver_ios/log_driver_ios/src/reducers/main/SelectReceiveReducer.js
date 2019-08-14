import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        receiveList: []
    },
    getReceiveList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}
//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.selectReceiveActionType.get_receiveList_success]: (state, action) => {
        const { payload: { receiveList } } = action
        return {
            ...state,
            data: {
                receiveList
            },
            getReceiveList: {
                ...initialState.getReceiveList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.selectReceiveActionType.get_receiveList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getReceiveList: {
                ...initialState.getReceiveList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.selectReceiveActionType.get_receiveList_waiting]: (state, action) => {
        return {
            ...state,
            getReceiveList: {
                ...initialState.getReceiveList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.selectReceiveActionType.get_receiveList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getReceiveList: {
                ...initialState.getReceiveList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)
