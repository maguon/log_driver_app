import {handleActions} from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        version: {
            //当前版本
            currentVersion: '',
            //最新版本
            newestVersion: '',
            force_update: 0, //0(版本为最新版), 1(版本过低，强制更新), 2(版本过低，但不需要强制更新)
            url: '',
            //描述
            remark: ''
        },
        deviceInfo: {
            deviceToken: ''
        },
        userLocalStorage: {}
    },
    initApp: {
        isResultStatus: 0,//执行状态：0（未执行），1（正在执行）2（执行暂停）3（全部执行成功）4（执行结束，跳转到登录）
        step: 0,          //第N步已执行成功
    },
    validateVersion: {
        isResultStatus: 0,//0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败), 5(网络错误)
        errorMsg: '',
        failedMsg: '',
        networkError: ''
    },
    //推送
    initXGPush: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    //loadLocalStorage.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败), 5(本地数据未找到)
    loadLocalStorage: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    //validateToken.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败), 5(网络错误)
    validateToken: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        networkError: '',
        param: {}
    }
}

export default handleActions({
    [actionTypes.initializationTypes.init_app_waiting]: (state, action) => {
        return {
            ...state,
            initAPP: {
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.initializationTypes.valdate_version_success]: (state, action) => {
        return {
            ...state,
            validateVersion: {
                isResultStatus: 2,
            },
            initApp: {
                step
            }
        }
    },
    [actionTypes.initializationTypes.valdate_version_failed]: (state, action) => {
        return {
            ...state,
            validateVersion:{
                isResultStatus:4,
                failedMsg:action.payload
            },
            initApp:{
                isResultStatus:2
            }
        }
    },
    [actionTypes.initializationTypes.valdate_version_error]: (state, action) => {
        return {
            ...state,
            validateVersion:{
                isResultStatus:3,
                errorMsg:action.payload
            },
        initApp:{
                isResultStatus:2
        }
        }
    },
    [actionTypes.initializationTypes.valdate_version_low]: (state, action) => {
        return {
            ...state,
            data: {
                version:action.payload
            },
            validateVersion:{
                isResultStatus:5,
            },
            initApp:{
                isResultStatus:2
            }
        }
    }

}, initialState)
