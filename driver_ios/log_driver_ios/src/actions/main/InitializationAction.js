import * as actionTypes from '../../actionTypes/index'
import * as actions from '../../actions/index'
import localStorageKey from '../../util/LocalStorageKey'
import localStorage from '../../util/LocalStorage'
import httpRequest from '../../util/HttpRequest'
import { ObjectToUrl } from '../../util/ObjectToUrl'
import requestHeaders from '../../util/RequestHeaders'
import * as ios_app from '../../ios_app.json'
import { sleep, randomString } from '../../util/util'
import { Actions } from 'react-native-router-flux'
import {  NativeModules } from 'react-native'
import DeviceInfo from 'react-native-device-info'



export const start = () => async (dispatch, getState) => {
    dispatch({type:actionTypes.initializationType.init_app_waiting})
    dispatch(loadUniqueID({
        version: {
            currentVersion: '',
            newestVersion: '',
            force_update: 0,//0(版本为最新版), 1(版本过低，强制更新), 2(版本过低，但不需要强制更新)
            url: '',
            remark: ''
        },
        deviceInfo: {
            uniqueID: ''
        }
    }))
}

/**
 * 第一步：获取uniqueID，
 *          如果localStorage中有，从localStorage中取，
 *          如果没有DeviceInfo.getUniqueID()获取
 */
export const loadUniqueID = param => async (dispatch, getState) => {
    console.log('loadUniqueIDParam', param)
    let uniqueID
    try {
        uniqueID = await localStorage.load({ key: localStorageKey.UNIQUEID })
        // dispatch(getUniqueID(uniqueID))
        console.log('uniqueID', uniqueID)
    } catch (err) {
        uniqueID = DeviceInfo.getUniqueId()
        localStorage.save({ key: localStorageKey.UNIQUEID, data: uniqueID })
        console.log('uniqueID', uniqueID)
    }
    console.log('uniqueID', uniqueID)
    dispatch(getCommunicationSetting({ ...param, deviceInfo: { ...param.deviceInfo, uniqueID } }))
}

/**
 * 第二步：获取host，
 *          如果localStorage中有，从localStorage中取，
 *          如果没有跳转到login页面
 */
export const getCommunicationSetting = param => async (dispatch) => {
    console.log("param"+JSON.stringify(param))
    const currentStep = 1
    try {
        const serverAddress = await localStorage.load({ key: localStorageKey.SERVERADDRESS })
        const { host } = serverAddress
        if (host) {
            dispatch(actions.communicationSettingAction.saveCommunicationSetting({ url: host }))
            dispatch((validateVersion(param)))
        } else {
            dispatch({ type: actionTypes.initializationType.init_app_failed, payload: { currentStep, param, msg: '获取host失败' } })
            Actions.loginGroup()
        }
    } catch (err) {
        dispatch({ type: actionTypes.initializationType.init_app_error, payload: { currentStep, param, msg: '获取host失败' } })
        Actions.loginGroup()
    }
}

/**
 * 第三步：获取最新version信息并对比，
 *          如果获取失败，停止初始化流程，等待用户手动点击获取
 *          如果获取成功，对比是否需要强制更新 force_update:0(版本为最新版), 1(版本过低，强制更新), 2(版本过低，但不需要强制更新)
 */
export const validateVersion = param => async (dispatch, getState) => {
    console.log('validateVersionParam', param)
    const currentStep = 2
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/app?${ObjectToUrl({ app: ios_app.type, type: ios_app.ios })}`
        console.log('url', url)

        const res = await httpRequest.get(url)

        console.log('res', res)

        if (res.success) {
            const versionInfo = {
                currentVersion: ios_app.version,
                newestVersion: '',
                url: '',
                remark: '',
                force_update: 0
            }
            let versionList = res.result
                .filter(item => {
                    return item.version > ios_app.version
                })
            if (versionList.length > 0) {
                if (versionList.some(item => item.force_update == 1)) {
                    versionInfo.force_update = 1
                } else {
                    versionInfo.force_update = 2
                }
                versionList = versionList.sort((a, b) => {
                    if (a.version < b.version) {
                        return 1
                    }
                    if (a.version > b.version) {
                        return -1
                    }
                    return 0
                })
                versionInfo.newestVersion = versionList[0].version
                versionInfo.url = versionList[0].url
                versionInfo.remark = versionList[0].remark
            } else {
                versionInfo.force_update = 0
                versionInfo.newestVersion = versionInfo.currentVersion
            }
            console.log('versionInfo', versionInfo)
            if (versionInfo.force_update != 1) {
                dispatch(loadLocalStorage({ ...param, version: versionInfo }))
            }else{
                dispatch({ type: actionTypes.initializationType.init_app_complete, payload: { param:{...param, version: versionInfo} } })
            }
        } else {
            console.log('failed获取版本错误')
            dispatch({ type: actionTypes.initializationType.init_app_failed, payload: { currentStep, msg: '获取版本错误', param } })
        }
    } catch (err) {
        console.log('error获取版本错误', err)
        dispatch({ type: actionTypes.initializationType.init_app_error, payload: { currentStep, msg: '获取版本错误', param } })
    }
}




/**
 * 第四步：获取最新user数据，
 *          如果获取失败，跳转到登录页面
 *          如果获取成功，继续流程
 */
export const loadLocalStorage = param => async (dispatch) => {
    console.log('loadLocalStorageParam', param)
    const currentStep = 3
    try {
        const localStorageRes = await localStorage.load({ key: localStorageKey.USER })
        if (localStorageRes.token && localStorageRes.uid) {
            dispatch(validateToken({ param, user: localStorageRes }))
        }
        else {
            if (localStorageRes.mobile) {
                dispatch({ type: actionTypes.loginType.set_userInfo, payload: { user: { mobile: localStorageRes.mobile } } })
            } else {
                dispatch({ type: actionTypes.loginType.set_userInfo, payload: { user: {} } })
            }
            dispatch({ type: actionTypes.initializationType.init_app_failed, payload: { currentStep, msg: '登陆未执行', param } })
            Actions.loginGroup()
        }
    } catch (err) {
        dispatch({ type: actionTypes.initializationType.init_app_error, payload: { currentStep, msg: '登陆未执行', param } })
        Actions.loginGroup()
    }
}


/**
 * 第五步：先获取用户信息，然后更新token，
 *          如果获取用户信息失败，跳转到登录
 *          如果获取用户信息成功，继续更新token
 *          如果更新token失败，跳转到登录
 *          如果更新token成功，继续流程
 */
export const validateToken = ({ param, user }) => async (dispatch, getState) => {
    console.log('validateTokenParam', param)
    const currentStep = 4
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const { uid, token } = user
        const url = `${base_host}/user/${uid}/token/${token}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)

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
                await dispatch({ type: actionTypes.loginType.set_userInfo, payload: { user } })
                dispatch(loadDeviceToken(param))
            } else {
                dispatch({ type: actionTypes.initializationType.init_app_failed, payload: { currentStep, msg: '无法换token', param } })
                Actions.loginGroup()
            }
        }
        else {
            dispatch({ type: actionTypes.initializationType.init_app_failed, payload: { currentStep, msg: '无法换token', param } })
            Actions.loginGroup()
        }
    } catch (err) {
        dispatch({ type: actionTypes.initializationType.init_app_error, payload: { currentStep, msg: '登陆未执行', param } })
        Actions.loginGroup()
    }
}

/**
 * 第六步：从localStorage获取deviceToken
 *          如果获取deviceToken失败，从NativeModules.XinGeModule.register()获取，
 *          如果获取deviceToken成功，完成初始化流程
 */
export const loadDeviceToken = param => async (dispatch) => {
    console.log('loadDeviceTokenParam', param)

    try {
        dispatch({ type: actionTypes.initializationType.init_app_complete, payload: { param } })
        Actions.appMain()
        // const deviceToken = await localStorage.load({ key: localStorageKey.DEVICETOKEN })
        //    dispatch(saveDeviceToken({deviceToken,...param}))
        return
    } catch (err) {

    }
    // dispatch(initPush(param))

}

//
// /**
//  * 第七步：从NativeModules.XinGeModule.register()获取deviceToken
//  *          如果获取deviceToken失败，从NativeModules.XinGeModule.register()获取，
//  *          如果获取deviceToken成功，完成初始化流程
//  */
// export const initPush = param => async (dispatch) => {
//     console.log('initPushParam', param)
//     let deviceToken
//     try {
//         deviceToken = await NativeModules.XinGeModule.register()
//         console.log('deviceToken',deviceToken)
//         dispatch(saveDeviceToken({deviceToken,...param}))
//         localStorage.save({ key: localStorageKey.DEVICETOKEN, data: deviceToken })
//         Actions.loginGroup()
//     } catch (err) {
//
//         console.log("2222")
//     }
//     dispatch({ type: actionTypes.initializationType.init_app_complete, payload: { param } })
// }
//
// /**
//  * 分支：保存deviceToken
//  */
// export const saveDeviceToken = param => async (dispatch, getState) => {
//     console.log('saveDeviceTokenparam',param)
//     try {
//         const {communicationSettingReducer: { data: { base_host } } = getState()
//         const {deviceToken,deviceInfo:{uniqueID}} =param
//         const url = `${base_host}/user/${uid}/device/${uniqueID}/appType/${ios_app.type}/userDeviceToken`
//         // console.log('url',url)
//         const res=await httpRequest.put(url,{deviceToken})
//         // console.log('res',res)
//     } catch (err) {}
// }
