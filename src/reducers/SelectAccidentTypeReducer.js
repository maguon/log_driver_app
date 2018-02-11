import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

const initialState = {
    data: {
        typeList: []
    },
    getAccidentType: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.selectAccidentTypeActionTypes.get_AccidentType_success]: (state, action) => {
        const { payload: { typeList } } = action
        return {
            ...state,
            data: {
                typeList
            },
            getAccidentType: {
                ...state.getAccidentType,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.selectAccidentTypeActionTypes.get_AccidentType_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getAccidentType: {
                ...state.getAccidentType,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [actionTypes.selectAccidentTypeActionTypes.get_AccidentType_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getAccidentType: {
                ...state.getAccidentType,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.selectAccidentTypeActionTypes.get_AccidentType_waiting]: (state, action) => {
        return {
            ...state,
            getAccidentType: {
                ...state.getAccidentType,
                isResultStatus: 1
            }
        }
    }
}, initialState)