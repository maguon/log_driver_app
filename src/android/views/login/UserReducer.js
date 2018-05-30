import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes/index'

const initialState = {
    data: {
        user: {
            // userId: 81,
            // token: '1ywJhLyNBFFSYT00GR3XQEoGdbY=kqGaXMwwc7b9b2a47d0761a84c7b520e7b4b5a158224ed684020456cea8ae90aa1e48d58202e3a59c0a31647ced14d56192e1e26',
            // userType: 1,
            // userStatus: 1,
            // mobile: '18888',
            // driverId: 161,
            // truckId: 257//258,
            // deviceToken:
            userId: 0,
            token: '',
            userType: 1,
            userStatus: 1,
            mobile: ''
        }
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败), 5(网络错误)
    login: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        networkError: ''
    }
}

export default handleActions({
    [actionTypes.loginTypes.Login_Success]: (state, action) => {
        const { payload: { step, user } } = action
        return {
            ...state,
            data: {
                user
            },
            login: {
                ...initialState.login,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.loginTypes.Login_Failed]: (state, action) => {
        const { payload: { step, failedMsg } } = action
        return {
            ...state,
            login: {
                ...initialState.login,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.loginTypes.Login_NetWorkError]: (state, action) => {
        const { payload: { step, networkError } } = action
        return {
            ...state,
            login: {
                ...initialState.login,
                isResultStatus: 5,
                networkError
            }
        }
    },
    [actionTypes.loginTypes.Login_Error]: (state, action) => {
        const { payload: { step, errorMsg } } = action
        return {
            ...state,
            login: {
                ...initialState.login,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [actionTypes.loginTypes.Set_UserInfo]: (state, action) => {
        const { payload: { user } } = action
        return {
            ...initialState,
            data: {
                user
            }
        }
    },
    [actionTypes.loginTypes.Set_DriverId]: (state, action) => {
        const { payload: { driver } } = action
        return {
            ...initialState,
            data: {
                user:{
                    ...state.data.user,
                    ...driver

                }
            }
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
            ...initialState
        }
    }
}, initialState)