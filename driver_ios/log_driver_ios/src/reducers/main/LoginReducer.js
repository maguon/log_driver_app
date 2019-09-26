import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        user: {},
    },
    url:{
        base_host: null,
        file_host:null,
        record_host: null,
        host: null
    },
    loginFlow: {
        isResultStatus: 0,     //执行状态 : 0(未执行), 1(正在执行),2(执行结束)
        step: 0,               //执行到第N步
    },
    //initPush.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    initPush: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        deviceToken: ''
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败), 5(网络错误)
    login: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.loginType.get_communicationSetting_success)]: (state, action) => {
    const { payload: { base_host, file_host, record_host, host } } = action
    return {
        ...state,
       url: {
            base_host, file_host, record_host, host
        }
    }
},
    [(actionTypes.loginType.save_communicationSetting_success)]: (state, action) => {
    const { payload: { base_host, file_host, record_host, host } } = action
    return {
        ...state,
        url: {
            base_host, file_host, record_host, host
        }
    }
},



    [actionTypes.loginType.login_success]: (state, action) => {
        const { payload: { step, user } } = action
        return {
            ...state,
            data: {
                user
            },
            login: {
                ...initialState.login,
                isResultStatus: 2
            },
            loginFlow: {
                isResultStatus: 2,
                step
            }
        }
    },
    [actionTypes.loginType.login_failed]: (state, action) => {
        const { payload: { step, failedMsg } } = action
        return {
            ...state,
            login: {
                ...initialState.login,
                isResultStatus: 4,
                failedMsg
            },
            loginFlow: {
                isResultStatus: 2,
                step
            }
        }
    },
    [actionTypes.loginType.login_error]: (state, action) => {
        const { payload: { step, errorMsg } } = action
        return {
            ...state,
            login: {
                ...initialState.login,
                isResultStatus: 3,
                errorMsg
            },
            loginFlow: {
                isResultStatus: 2,
                step
            }
        }
    },


    [actionTypes.loginType.set_userInfo]: (state, action) => {
        const { payload: { user } } = action
        return {
            ...initialState,
            data: {
                user
            }
        }
    },

    [actionTypes.loginType.change_AvatarImage]: (state, action) => {
        const { payload: { avatar_image } } = action
        return {
            ...state,
            data: {
                ...state.data,
                user: {
                    ...state.data.user,
                    avatar_image
                }
            }
        }
    },


    [actionTypes.loginType.clean_login]: (state, action) => {
        const { payload: { mobile } } = action
        return {
            ...initialState,
            data: {
                user: {
                    mobile
                }
            }
        }
    }
}, initialState)
