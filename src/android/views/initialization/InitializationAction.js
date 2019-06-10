import * as actionTypes from '../../../actionTypes/index'
import localStorageKey from '../../../util/LocalStorageKey'
import localStorage from '../../../util/LocalStorage'
import httpRequest from '../../../util/HttpRequest'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import requestHeaders from '../../../util/RequestHeaders'
import * as android_app from '../../../android_app.json'
import { sleep } from '../../../util/util'
import XGPush from 'react-native-xinge-push'
import { Actions } from 'react-native-router-flux'
import { ToastAndroid } from 'react-native'


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

export const getCommunicationSetting = () => async (dispatch) => {
    try {
        const localStorageRes = await localStorage.load({ key: localStorageKey.SERVERADDRESS })
        // console.log('localStorageRes', localStorageRes)
        const { base_host, file_host, record_host, host } = localStorageRes
        if (base_host && file_host && record_host && host) {
            await dispatch({
                type: actionTypes.communicationSetting.get_communicationSetting_success, payload: {
                    base_host, file_host, record_host, host
                }
            })
            dispatch(validateVersion())
        } else {
            // console.log('Actions.mainRoot')
            Actions.mainRoot()
        }

    } catch (err) {
        // console.log('err', err)
        Actions.mainRoot()
    }
}

//第一步：获取最新version信息
export const validateVersion = (tryCount = 1) => async (dispatch, getState) => {
    const currentStep = 1
    try {
        // console.log('android_app', android_app)
        // console.log('getState',getState())

        const { communicationSettingReducer: { data: { base_host } } } = getState()
        // console.log('base_host', base_host)
        dispatch({ type: actionTypes.initializationTypes.init_app_waiting, payload: {} })
        const url = `${base_host}/app?${ObjectToUrl({ app: android_app.type, type: android_app.android })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            const versionInfo = {
                currentVersion: android_app.version,
                newestVersion: '',
                url: '',
                remark: '',
                force_update: 0
            }
            // const currentVersionArr = android_app.version.split('.').map(item => Number(item))
            let versionList = res.result
                .filter(item => {
                    // console.log('item.version',item.version)
                    // console.log('android_app.version',android_app.version)
                    // console.log('item.version>android_app.version',item.version>android_app.version)
                    return item.version > android_app.version
                    // const itemArr = item.version.split('.').map(item => Number(item))
                    // if (currentVersionArr[0] < itemArr[0]) {
                    //     return true
                    // } else if (currentVersionArr[0] == itemArr[0] && currentVersionArr[1] < itemArr[1]) {
                    //     return true
                    // } else if (currentVersionArr[0] == itemArr[0] && currentVersionArr[1] == itemArr[1] && currentVersionArr[2] < itemArr[2]) {
                    //     return true
                    // } else {
                    //     return false
                    // }
                })
            // console.log('versionList', versionList)
            //force_update:0(版本为最新版), 1(版本过低，强制更新), 2(版本过低，但不需要强制更新)
            if (versionList.length > 0) {
                if (versionList.some(item => item.force_update == 1)) {
                    versionInfo.force_update = 1
                } else {
                    versionInfo.force_update = 2
                }
                versionList = versionList.sort((a, b) => {
                    // console.log('a < b',a.version < b.version)
                    // console.log('a ',a.version)
                    // console.log('b ',b.version)
                    if (a.version < b.version) {
                        return 1
                    }
                    if (a.version > b.version) {
                        return -1
                    }
                    return 0
                    // const aArr = a.version.split('.').map(item => Number(item))
                    // const bArr = b.version.split('.').map(item => Number(item))
                    // if (aArr[0] < bArr[0]) {
                    //     return true
                    // } else if (aArr[0] == bArr[0] && aArr[1] < bArr[1]) {
                    //     return true
                    // } else if (aArr[0] == bArr[0] && aArr[1] == bArr[1] && aArr[2] < bArr[2]) {
                    //     return true
                    // } else {
                    //     return false
                    // }
                })
                // console.log('versionList', versionList)

                versionInfo.newestVersion = versionList[0].version
                versionInfo.url = versionList[0].url
                versionInfo.remark = versionList[0].remark
                // console.log('versionInfo', versionInfo)

            } else {
                versionInfo.force_update = 0
                versionInfo.newestVersion = versionInfo.currentVersion
            }
            if (versionInfo.force_update != 1) {
                // console.log('versionInfo', versionInfo)
                dispatch({ type: actionTypes.initializationTypes.valdate_version_success, payload: { versionInfo, step: currentStep } })
                dispatch(loadDeviceToken())
                //dispatch(loadLocalStorage())
            } else {
                dispatch({ type: actionTypes.initializationTypes.valdate_version_low, payload: { versionInfo, step: currentStep } })
            }
        } else {
            // console.log(res.msg)
            if (res.msg == ' service not found !') {
                ToastAndroid.show('服务器地址设置错误，请重新设置！', 10)
                Actions.mainRoot()
            }
            dispatch({ type: actionTypes.initializationTypes.valdate_version_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        ToastAndroid.show(`初始化错误:${err}`, 10)
        if (err.message == 'Network request failed') {


        } else {
            dispatch({ type: actionTypes.initializationTypes.valdate_version_error, payload: { errorMsg: err } })
        }
        Actions.mainRoot()
    }
}


export const loadDeviceToken = () => async (dispatch) => {
    try {
        const deviceToken = await localStorage.load({ key: localStorageKey.DEVICETOKEN })
        dispatch(initPush(deviceToken))
    } catch (err) {
        dispatch(initPush())
    }
}

//第二步：获取deviceToken
export const initPush = param => async (dispatch) => {
    const currentStep = 2
    try {
        let deviceToken
        XGPush.init(2100267013, 'A7XR278C4CTR')
        if (!param) {
            deviceToken = await XGPush.register('jeepeng')
            localStorage.save({ key: localStorageKey.DEVICETOKEN, data: deviceToken })
        } else {
            deviceToken = param
        }
        if (deviceToken) {
            dispatch({ type: actionTypes.initializationTypes.init_XGPush_success, payload: { deviceToken, step: currentStep } })
            dispatch(loadLocalStorage())
        } else {
            dispatch({ type: actionTypes.initializationTypes.init_XGPush_failed, payload: { failedMsg: '获取deviceToken错误：deviceToken为空！' } })
        }
    } catch (err) {
        ToastAndroid.show(`初始化错误:${err}`, 10)
        dispatch({ type: actionTypes.initializationTypes.init_XGPush_error, payload: { errorMsg: err } })
    }
}


//第三步：获取localStorage中的user数据
export const loadLocalStorage = () => async (dispatch) => {
    const currentStep = 3
    try {
        //localStorage.remove({ key: localStorageKey.USER })
        const localStorageRes = await localStorage.load({ key: localStorageKey.USER })
        // console.log('localStorageRes', localStorageRes)
        if (localStorageRes.token && localStorageRes.uid) {
            // console.log('localStorageRes', localStorageRes)
            dispatch({ type: actionTypes.initializationTypes.load_localStorage_success, payload: { userlocalStorage: localStorageRes, step: currentStep } })
            dispatch(validateToken())
        }
        else {
            if (localStorageRes.mobile) {
                dispatch({ type: actionTypes.loginTypes.set_userInfo, payload: { user: { mobile: localStorageRes.mobile } } })
            } else {
                dispatch({ type: actionTypes.loginTypes.set_userInfo, payload: { user: {} } })
            }
            dispatch({ type: actionTypes.initializationTypes.load_localStorage_failed, payload: { failedMsg: 'localStorage数据不全！' } })
            Actions.mainRoot()
        }
    } catch (err) {
        ToastAndroid.show(`初始化错误:${err}`, 10)
        // console.log('err', err)
        if (err.name == 'NotFoundError') {
            dispatch({ type: actionTypes.initializationTypes.load_localStorage_error, payload: { errorMsg: err } })
        } else {
            localStorage.remove({ key: localStorageKey.USER })
            dispatch({ type: actionTypes.initializationTypes.load_localStorage_error, payload: { errorMsg: err } })
        }
        Actions.mainRoot()
    }

}

//第四步:更换service-token ,如果更新成功将登陆数据放入userReducer
export const validateToken = (tryCount = 1) => async (dispatch, getState) => {
    const currentStep = 4
    try {
        const { communicationSettingReducer: { data: { base_host } },
            initializationReducer: { data: { userlocalStorage: { uid, token } } } } = getState()
        const url = `${base_host}/user/${uid}/token/${token}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)

        if (res.success) {
            const getUserInfoUrl = `${base_host}/user?${ObjectToUrl({ userId: uid })}`
            const getUserInfoRes = await httpRequest.get(getUserInfoUrl)
            if (getUserInfoRes.success) {
                const { uid, mobile, real_name, type, gender, avatar_image, status, drive_id } = getUserInfoRes.result[0]
                const user = {
                    uid, mobile, real_name, type, gender, avatar_image, status, drive_id,
                    token: res.result.accessToken,
                }
                //判断请求是否成功，如果成功，更新token
                localStorage.save({ key: localStorageKey.USER, data: user })
                requestHeaders.set('auth-token', res.result.accessToken)
                requestHeaders.set('user-type', type)
                requestHeaders.set('user-name', mobile)
                dispatch({ type: actionTypes.loginTypes.set_userInfo, payload: { user } })
                dispatch({ type: actionTypes.initializationTypes.validate_token_success, payload: { step: currentStep } })
                Actions.mainRoot()
            } else {
                ToastAndroid.showWithGravity(`登陆失败：无法获取用户信息！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: actionTypes.initializationTypes.validate_token_failed, payload: { failedMsg: '无法获取用户信息！' } })
            }
        }
        else {
            //判断请求是否成功，如果失败，跳转到登录页
            dispatch({ type: actionTypes.initializationTypes.validate_token_failed, payload: { failedMsg: res.msg } })
            Actions.mainRoot()
        }
    } catch (err) {
        ToastAndroid.show(`初始化错误:${err}`, 10)
        // console.log('err', err)
        if (err.message == 'Network request failed') {
            //尝试20次
            if (tryCount < 20) {
                await sleep(1000)
                dispatch(validateToken(tryCount + 1))
            } else {
                dispatch({ type: actionTypes.initializationTypes.validate_token_error, payload: { errorMsg: err } })
            }
        } else {
            dispatch({ type: actionTypes.initializationTypes.validate_token_error, payload: { errorMsg: err } })
            Actions.mainRoot()
        }
    }
}