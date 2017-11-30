/**
 * Created by lingxue on 2017/4/21.
 */
//import { Actions } from 'react-native-router-flux'
import * as actionTypes from '../actionTypes'
import localStorageKey from '../util/LocalStorageKey'
import localStorage from '../util/LocalStorage'
import httpRequest from '../util/HttpRequest'
import { base_host } from '../config/Host'
import { ObjectToUrl } from '../util/ObjectToUrl'
import requestHeaders from '../util/RequestHeaders'
import * as android_app from '../android_app.json'

/** 
 * 
 * initApp : APP初始化
 * 
 * param : 对应执行步骤执行时所需要的参数
 * currentStep : 执行到第N步（从1开始）
 * tryCount : 当遇到网络错误的时候尝试的次数（从1开始）
 * 
 * 
 * 初始化流程：
 * 第一步：验证版本是否是最新版本
 * 第二步：获取本地localstorage的数据
 * 第三步：换network request所需要的token
 */
export const initApp = (param, tryCount = 1, currentStep = 1) => (dispatch) => {
    if (currentStep == 1) {
        //执行第一步
        console.log(`========执行第${currentStep}步    第${tryCount}次尝试========`)
        validateVersion(param, tryCount, currentStep)(dispatch)
    } else if (currentStep == 2) {
        //执行第二步
        console.log(`========执行第${currentStep}步    第${tryCount}次尝试========`)
        loadLocalStorage(null, tryCount, currentStep)(dispatch)
    } else if (currentStep == 3) {
        //执行第三步
        console.log(`========执行第${currentStep}步    第${tryCount}次尝试========`)
        validateToken(param, tryCount, currentStep)(dispatch)
    }
}

//第一步：获取最新version信息
export const validateVersion = (param, tryCount = 1, currentStep = 1) => async (dispatch) => {
    try {
        const url = `${base_host}/app?${ObjectToUrl(param.optionalParam)}`
        const res = await httpRequest.get(url)
        if (res.success) {
            let data = {
                currentVersion: android_app.version,
            }
            const newestVersionInfo = res.result.sort((a, b) => b.id - a.id)[0]
            if (newestVersionInfo) {
                data.newestVersion = newestVersionInfo.version
                data.url = newestVersionInfo.url
                data.remark = newestVersionInfo.remark
                const currentVersionArr = android_app.version.split('.')
                const newestVersionArr = newestVersionInfo.version.split('.')
                if (currentVersionArr[0] < newestVersionArr[0] || currentVersionArr[1] < newestVersionArr[1] || currentVersionArr[2] < newestVersionArr[2]) {
                    if (newestVersionInfo.force_update == 1) {
                        data.force_update = 1
                    } else {
                        data.force_update = 2 //force_update:0(版本为最新版), 1(版本需要太旧，强制更新), 2(版本需要太旧，但不需要强制更新)
                    }
                } else {
                    data.force_update = 0
                }
            } else {
                data.force_update = 0
                data.newestVersion = android_app.version
            }
           // console.log(data)
            dispatch({ type: actionTypes.initializationTypes.Valdate_Version_Success, payload: { data, step: currentStep } })
            if (data.force_update != 1) {
                initApp(null, 1, currentStep + 1)(dispatch)
            }
        } else {
            dispatch({ type: actionTypes.initializationTypes.Valdate_Version_Failed, payload: { failedMsg: res.msg, step: currentStep } })
        }
    } catch (err) {
        if (err.message == 'Network request failed') {
            //尝试20次
            if (tryCount < 20) {
                await sleep(1000)
                initApp(param, tryCount + 1, currentStep)(dispatch)
            } else {
                dispatch({ type: actionTypes.initializationTypes.Valdate_Version_NetWorkError, payload: { step: currentStep } })
            }
        } else {
            dispatch({ type: actionTypes.initializationTypes.Valdate_Version_Error, payload: { errorMsg: err.message, step: currentStep } })
        }
    }
}

//第二步：获取localStorage中的user数据
export const loadLocalStorage = (param = null, tryCount = 1, currentStep = 2) => async (dispatch) => {
    try {
        // localStorage.save({
        //     key: localStorageKey.USER,
        //     data: {
        //         userId: 93,
        //         token: 'v4m1x9wFedXZ6S9rbV5Ax-9EAWY=9i39iMZK1a5578b3b728c1f8dbc87071b199c67f8b4ae35e233647cd1825977e83a8c812d194c41a71049edad8470b361d415a76'
        //     }
        // })
        //localStorage.remove({ key: localStorageKey.USER })
        const localStorageRes = await localStorage.load({ key: localStorageKey.USER })
       // console.log(localStorageRes)
        if (localStorageRes.token && localStorageRes.userId) {
            dispatch({ type: actionTypes.initializationTypes.Load_LocalStorage_Success, payload: { step: currentStep } })
            initApp({
                requiredParam: {
                    userId: localStorageRes.userId,
                    token: localStorageRes.token
                }
            }, 1, currentStep + 1)(dispatch)
        }
        else {
            //localStorage.remove({ key: localStorageKey.USER })
            dispatch({ type: actionTypes.initializationTypes.Load_LocalStorage_Failed, payload: { step: currentStep } })
        }
    } catch (err) {
        //console.log(err)
        if (err.name == 'NotFoundError') {
            dispatch({ type: actionTypes.initializationTypes.Load_LocalStorage_NotFoundError, payload: { step: currentStep } })
        } else {
            localStorage.remove({ key: localStorageKey.USER })
            dispatch({ type: actionTypes.initializationTypes.Load_LocalStorage_Error, payload: { errorMsg: err.message, step: currentStep } })
        }
    }

}



//第三步:更换service-token ,如果更新成功将登陆数据放入userReducer
export const validateToken = (param, tryCount = 1, currentStep = 3) => async (dispatch) => {
    try {
        const url = `${base_host}/user/${param.requiredParam.userId}/token/${param.requiredParam.token}`
        const res = await httpRequest.get(url)
       // console.log('res', res)
        if (res.success) {
            //判断请求是否成功，如果成功，更新token
            localStorage.save({
                key: localStorageKey.USER,
                data: {
                    userId: res.result.userId,
                    token: res.result.accessToken,
                    userType: res.result.type,
                    userStatus: res.result.userStatus,
                    mobile: res.result.phone
                }
            })
            requestHeaders.set('auth-token', res.result.accessToken)
            requestHeaders.set('user-type', res.result.type)
            requestHeaders.set('user-name', res.result.phone)
            dispatch({
                type: actionTypes.loginTypes.Set_UserInfo, payload: {
                    user: {
                        userId: res.result.userId,
                        token: res.result.accessToken,
                        userType: res.result.type,
                        userStatus: res.result.userStatus,
                        mobile: res.result.phone,
                    }
                }
            })
            dispatch({ type: actionTypes.initializationTypes.validate_token_Success, payload: { step: currentStep } })
        }
        else {
            //判断请求是否成功，如果失败，跳转到登录页
            dispatch({ type: actionTypes.initializationTypes.validate_token_Failed, payload: { step: currentStep } })
        }
    } catch (err) {
        //console.log(err)
        if (err.message == 'Network request failed') {
            //尝试20次
            if (tryCount < 20) {
                await sleep(1000)
                initApp(param, tryCount + 1, currentStep)(dispatch)
            } else {
                dispatch({ type: actionTypes.initializationTypes.validate_token_NetWorkError, payload: { param, step: currentStep } })
            }
        } else {
            dispatch({ type: actionTypes.initializationTypes.validate_token_Error, payload: { step: currentStep } })
        }
    }
}



export const initAppWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.initializationTypes.INIT_App_Waiting, payload: {} })
}

export const resetInitialization = () => (dispatch) => {
    dispatch({ type: actionTypes.initializationTypes.RESET_INITIALIZATION, payload: {} })
}

export const resetGetVersion = () => (dispatch) => {
    dispatch({ type: actionTypes.initializationTypes.RESET_GETVERSION, payload: {} })
}