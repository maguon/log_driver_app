import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    user: {
        // userId: 81,
        // token: '1ywJhLyNBFFSYT00GR3XQEoGdbY=kqGaXMwwc7b9b2a47d0761a84c7b520e7b4b5a158224ed684020456cea8ae90aa1e48d58202e3a59c0a31647ced14d56192e1e26',
        // userType: 1,
        // userStatus: 1,
        // mobile: '18888',
        // driverId: 161,
        // truckId: 257//258,
        // deviceToken:
        // userId: 0,
        // token: '',
        // userType: 1,
        // userStatus: 1,
        // mobile: ''
    },
    isResultStatus: 0,
    isExecStatus: 0,
    errorMsg: '',
    failedMsg: ''
}

export default handleActions({
    [actionTypes.loginTypes.LOGIN_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        //console.log(data)
        return {
            ...state,
            isResultStatus: 0,
            isExecStatus: 2,
            user: data
        }
    },
    [actionTypes.loginTypes.LOGIN_FAILED]: (state, action) => {
        const { payload: { data } } = action
        //console.log(data)
        return {
            ...state,
            isResultStatus: 2,
            isExecStatus: 2,
            failedMsg: data
        }
    },
    [actionTypes.loginTypes.LOGIN_WAITING]: (state, action) => {
        return {
            ...state,
            isExecStatus: 1,
        }
    },
    [actionTypes.loginTypes.LOGIN_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isResultStatus: 1,
            isExecStatus: 2,
            errorMsg: data
        }
    },
    [actionTypes.loginTypes.RESET_LOGIN]: (state, action) => {
        return {
            ...state,
            isExecStatus: 0,
        }
    },
    [actionTypes.loginTypes.CLEAN_LOGIN]: (state, action) => {
        return {
            user: {
                userId: 0,
                token: '',
                userType: 1,
                userStatus: 1,
                phone: ''
            },
            isResultStatus: 0,
            isExecStatus: 0,
            errorMsg: '',
            failedMsg: ''
        }
    }
}, initialState)