import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        driverList: []
    },
    getDriverList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}
//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.selectDriverActionType.get_driverList_success]: (state, action) => {
        const { payload: { driverList } } = action
        return {
            ...state,
            data: {
                driverList
            },
            getDriverList: {
                ...initialState.getDriverList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.selectDriverActionType.get_driverList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getDriverList: {
                ...initialState.getDriverList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.selectDriverActionType.get_driverList_waiting]: (state, action) => {
        return {
            ...state,
            getDriverList: {
                ...initialState.getDriverList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.selectDriverActionType.get_driverList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getDriverList: {
                ...initialState.getDriverList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)

