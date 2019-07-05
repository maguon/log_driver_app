import * as actionTypes from '../../../actionTypes/index'
import * as actions from '../../../actions/index'
import localStorageKey from '../../../util/LocalStorageKey'
import localStorage from '../../../util/LocalStorage'
import httpRequest from '../../../util/HttpRequest'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import requestHeaders from '../../../util/RequestHeaders'
import * as android_app from '../../../android_app.json'
import { sleep, randomString } from '../../../util/util'
// import XGPush from 'react-native-xinge-push'
import { Actions } from 'react-native-router-flux'
import { ToastAndroid, NativeModules } from 'react-native'
import DeviceInfo from 'react-native-device-info'



export const start = () => async (dispatch, getState) => {
    dispatch({type:actionTypes.initializationTypes.init_app_waiting})
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
    } catch (err) {
        uniqueID = DeviceInfo.getUniqueID()
    }
    dispatch(getCommunicationSetting({ ...param, deviceInfo: { ...param.deviceInfo, uniqueID } }))
}

/** 
 * 第二步：获取host，
 *          如果localStorage中有，从localStorage中取，
 *          如果没有跳转到login页面
 */
export const getCommunicationSetting = param => async (dispatch) => {
    const currentStep = 1
    try {
        const serverAddress = await localStorage.load({ key: localStorageKey.SERVERADDRESS })
        const { host } = serverAddress
        if (host) {
            await dispatch(actions.communicationSetting.saveCommunicationSetting({ url: host }))
            dispatch((validateVersion(param)))
        } else {
            dispatch({ type: actionTypes.initializationTypes.init_app_failed, payload: { currentStep, param, msg: '获取host失败' } })
            Actions.mainRoot()
        }
    } catch (err) {
        dispatch({ type: actionTypes.initializationTypes.init_app_error, payload: { currentStep, param, msg: '获取host失败' } })
        Actions.mainRoot()
    }
}

/** 
 * 第三步：获取最新version信息并对比，
 *          如果获取失败，停止初始化流程，等待用户手动点击获取
 *          如果获取成功，对比是否需要强制更新 force_update:0(版本为最新版), 1(版本过低，强制更新), 2(版本过低，但不需要强制更新)
 */
export const validateVersion = param => async (dispatch, getState) => {
    // console.log('validateVersionParam', param)
    const currentStep = 2
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/app?${ObjectToUrl({ app: android_app.type, type: android_app.android })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            const versionInfo = {
                currentVersion: android_app.version,
                newestVersion: '',
                url: '',
                remark: '',
                force_update: 0
            }
            let versionList = res.result
                .filter(item => {
                    return item.version > android_app.version
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
            // versionInfo.force_update=1
            // console.log('versionInfo', versionInfo)
            if (versionInfo.force_update != 1) {
                dispatch(loadLocalStorage({ ...param, version: versionInfo }))
            }else{
                dispatch({ type: actionTypes.initializationTypes.init_app_complete, payload: { param:{...param, version: versionInfo} } })
            }
        } else {
            // console.log('failed获取版本错误')
            dispatch({ type: actionTypes.initializationTypes.init_app_failed, payload: { currentStep, msg: '获取版本错误', param } })
        }
    } catch (err) {
        // console.log('error获取版本错误', err)
        dispatch({ type: actionTypes.initializationTypes.init_app_error, payload: { currentStep, msg: '获取版本错误', param } })
    }
}




/** 
 * 第四步：获取最新user数据，
 *          如果获取失败，跳转到登录页面
 *          如果获取成功，继续流程
 */
export const loadLocalStorage = param => async (dispatch) => {
    // console.log('loadLocalStorageParam', param)
    const currentStep = 3
    try {
        const localStorageRes = await localStorage.load({ key: localStorageKey.USER })
        if (localStorageRes.token && localStorageRes.uid) {
            dispatch(validateToken({ param, user: localStorageRes }))
        }
        else {
            if (localStorageRes.mobile) {
                dispatch({ type: actionTypes.loginTypes.set_userInfo, payload: { user: { mobile: localStorageRes.mobile } } })
            } else {
                dispatch({ type: actionTypes.loginTypes.set_userInfo, payload: { user: {} } })
            }
            dispatch({ type: actionTypes.initializationTypes.init_app_failed, payload: { currentStep, msg: '登陆未执行', param } })
            Actions.mainRoot()
        }
    } catch (err) {
        dispatch({ type: actionTypes.initializationTypes.init_app_error, payload: { currentStep, msg: '登陆未执行', param } })
        Actions.mainRoot()
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
    // console.log('validateTokenParam', param)
    const currentStep = 4
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const { uid, token } = user
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
                await dispatch({ type: actionTypes.loginTypes.set_userInfo, payload: { user } })
                dispatch(loadDeviceToken(param))
            } else {
                dispatch({ type: actionTypes.initializationTypes.init_app_failed, payload: { currentStep, msg: '无法换token', param } })
                Actions.mainRoot()
            }
        }
        else {
            dispatch({ type: actionTypes.initializationTypes.init_app_failed, payload: { currentStep, msg: '无法换token', param } })
            Actions.mainRoot()
        }
    } catch (err) {
        dispatch({ type: actionTypes.initializationTypes.init_app_error, payload: { currentStep, msg: '登陆未执行', param } })
        Actions.mainRoot()
    }
}

/** 
 * 第六步：从localStorage获取deviceToken
 *          如果获取deviceToken失败，从NativeModules.XinGeModule.register()获取，
 *          如果获取deviceToken成功，完成初始化流程
 */
export const loadDeviceToken = param => async (dispatch) => {
    // console.log('loadDeviceTokenParam', param)
    try {
        deviceToken = await localStorage.load({ key: localStorageKey.DEVICETOKEN })
        // console.log('deviceToken',deviceToken)
        dispatch(saveDeviceToken({deviceToken,...param}))
        dispatch({ type: actionTypes.initializationTypes.init_app_complete, payload: { param } })
        Actions.mainRoot()
        return
    } catch (err) { }
    dispatch(initPush(param))
}


/** 
 * 第七步：从NativeModules.XinGeModule.register()获取deviceToken
 *          如果获取deviceToken失败，从NativeModules.XinGeModule.register()获取，
 *          如果获取deviceToken成功，完成初始化流程
 */
export const initPush = param => async (dispatch) => {
    // console.log('initPushParam', param)
    let deviceToken
    try {
        deviceToken = await NativeModules.XinGeModule.register()
        // console.log('deviceToken',deviceToken)
        dispatch(saveDeviceToken({deviceToken,...param}))
        localStorage.save({ key: localStorageKey.DEVICETOKEN, data: deviceToken })
        Actions.mainRoot()
    } catch (err) { }
    dispatch({ type: actionTypes.initializationTypes.init_app_complete, payload: { param } })
}

/** 
 * 分支：保存deviceToken
 */
export const saveDeviceToken = param => async (dispatch, getState) => {
    // console.log('saveDeviceTokenparam',param)
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user:{uid} } } } = getState()
            const {deviceToken,deviceInfo:{uniqueID}} =param
        const url = `${base_host}/user/${uid}/device/${uniqueID}/appType/${android_app.type}/userDeviceToken`
        // console.log('url',url)
        const res=await httpRequest.put(url,{deviceToken})
        // console.log('res',res)
    } catch (err) {}
}


// import * as actionTypes from '../../../actionTypes/index'
// import localStorageKey from '../../../util/LocalStorageKey'
// import localStorage from '../../../util/LocalStorage'
// import httpRequest from '../../../util/HttpRequest'
// import { ObjectToUrl } from '../../../util/ObjectToUrl'
// import requestHeaders from '../../../util/RequestHeaders'
// import * as android_app from '../../../android_app.json'
// import { sleep, randomString } from '../../../util/util'
// // import XGPush from 'react-native-xinge-push'
// import { Actions } from 'react-native-router-flux'
// import { ToastAndroid ,NativeModules} from 'react-native'
// import DeviceInfo from 'react-native-device-info'


// /** 
//  * 
//  * initApp : APP初始化
//  * 
//  * param : 对应执行步骤执行时所需要的参数
//  * currentStep : 执行到第N步（从1开始）
//  * tryCount : 当遇到网络错误的时候尝试的次数（从1开始）
//  * 
//  * 
//  * 初始化流程：
//  * 第一步：验证版本是否是最新版本
//  * 第二步：获取本地localstorage的数据
//  * 第三步：换network request所需要的token
//  */



// export const loadUniqueID = () => async (dispatch) => {
//     let uniqueID
//     try {
//         uniqueID = await localStorage.load({ key: localStorageKey.UNIQUEID })
//         dispatch(getUniqueID(uniqueID))
//     } catch (err) {
//         uniqueID = DeviceInfo.getUniqueID()
//         localStorage.save({ key: localStorageKey.UNIQUEID, data: uniqueID })
//     }
//     await dispatch({ type: actionTypes.initializationTypes.init_uniqueID, payload: { uniqueID } })
//     dispatch(getCommunicationSetting())
// }

// export const getCommunicationSetting = () => async (dispatch) => {
//     try {
//         const localStorageRes = await localStorage.load({ key: localStorageKey.SERVERADDRESS })
//         const { base_host, file_host, record_host, host } = localStorageRes
//         if (base_host && file_host && record_host && host) {
//             await dispatch({
//                 type: actionTypes.communicationSetting.get_communicationSetting_success, payload: {
//                     base_host, file_host, record_host, host
//                 }
//             })
//             dispatch(validateVersion())
//         } else {
//             Actions.mainRoot()
//         }
//     } catch (err) {
//         Actions.mainRoot()
//     }
// }

// //第一步：获取最新version信息
// export const validateVersion = () => async (dispatch, getState) => {
//     const currentStep = 1
//     try {
//         const { communicationSettingReducer: { data: { base_host } } } = getState()
//         dispatch({ type: actionTypes.initializationTypes.init_app_waiting, payload: {} })
//         const url = `${base_host}/app?${ObjectToUrl({ app: android_app.type, type: android_app.android })}`
//         const res = await httpRequest.get(url)
//         if (res.success) {
//             const versionInfo = {
//                 currentVersion: android_app.version,
//                 newestVersion: '',
//                 url: '',
//                 remark: '',
//                 force_update: 0
//             }
//             let versionList = res.result
//                 .filter(item => {
//                     return item.version > android_app.version
//                 })
//             //force_update:0(版本为最新版), 1(版本过低，强制更新), 2(版本过低，但不需要强制更新)
//             if (versionList.length > 0) {
//                 if (versionList.some(item => item.force_update == 1)) {
//                     versionInfo.force_update = 1
//                 } else {
//                     versionInfo.force_update = 2
//                 }
//                 versionList = versionList.sort((a, b) => {
//                     if (a.version < b.version) {
//                         return 1
//                     }
//                     if (a.version > b.version) {
//                         return -1
//                     }
//                     return 0
//                 })
//                 // console.log('versionList', versionList)
//                 versionInfo.newestVersion = versionList[0].version
//                 versionInfo.url = versionList[0].url
//                 versionInfo.remark = versionList[0].remark
//             } else {
//                 versionInfo.force_update = 0
//                 versionInfo.newestVersion = versionInfo.currentVersion
//             }
//             if (versionInfo.force_update != 1) {
//                 dispatch({ type: actionTypes.initializationTypes.valdate_version_success, payload: { versionInfo, step: currentStep } })
//                 dispatch(initPush())
//             } else {
//                 dispatch({ type: actionTypes.initializationTypes.valdate_version_low, payload: { versionInfo, step: currentStep } })
//             }
//         } else {
//             if (res.msg == ' service not found !') {
//                 ToastAndroid.show('服务器地址设置错误，请重新设置！', 10)
//                 Actions.mainRoot()
//             }
//             dispatch({ type: actionTypes.initializationTypes.valdate_version_failed, payload: { failedMsg: res.msg } })
//         }
//     } catch (err) {
//         ToastAndroid.show(`初始化错误:${err}`, 10)
//         dispatch({ type: actionTypes.initializationTypes.valdate_version_error, payload: { errorMsg: err } })
//         Actions.mainRoot()
//     }
// }




// //第二步：获取deviceToken
// export const initPush = param => async (dispatch) => {
//     // console.log('initPush')

//     const currentStep = 2
//     try {
//         // let deviceToken
//         // // XGPush.init(2100267013, 'A7XR278C4CTR')
//         // deviceToken = await XGPush.register('log_driver_app')
//         const deviceToken = await NativeModules.XinGeModule.register()
//         console.log('deviceToken',deviceToken)
//         // if (!param) {
//         //     deviceToken = await XGPush.register('log_driver_app')
//         //     console.log('deviceToken',deviceToken)
//         //     // deviceToken = randomString(40)
//         //     localStorage.save({ key: localStorageKey.DEVICETOKEN, data: deviceToken })
//         // } else {
//         //     deviceToken = param
//         // }
//         // if (deviceToken) {
//         //     // dispatch({ type: actionTypes.initializationTypes.init_XGPush_success, payload: { deviceToken, step: currentStep } })
//         // } else {
//         //     // dispatch({ type: actionTypes.initializationTypes.init_XGPush_failed, payload: { failedMsg: '获取deviceToken错误：deviceToken为空！' } })
//         // }
//         // dispatch(loadLocalStorage())

//     } catch (err) {
//         console.log('err',err)
//         ToastAndroid.show(`初始化错误:${err}`, 10)
//         // dispatch({ type: actionTypes.initializationTypes.init_XGPush_error, payload: { errorMsg: err } })
//     }
//     dispatch(loadLocalStorage())
// }


// //第三步：获取localStorage中的user数据
// export const loadLocalStorage = () => async (dispatch) => {
//     const currentStep = 3
//     try {
//         const localStorageRes = await localStorage.load({ key: localStorageKey.USER })
//         if (localStorageRes.token && localStorageRes.uid) {
//             dispatch({ type: actionTypes.initializationTypes.load_localStorage_success, payload: { userlocalStorage: localStorageRes, step: currentStep } })
//             dispatch(validateToken())
//         }
//         else {
//             if (localStorageRes.mobile) {
//                 dispatch({ type: actionTypes.loginTypes.set_userInfo, payload: { user: { mobile: localStorageRes.mobile } } })
//             } else {
//                 dispatch({ type: actionTypes.loginTypes.set_userInfo, payload: { user: {} } })
//             }
//             dispatch({ type: actionTypes.initializationTypes.load_localStorage_failed, payload: { failedMsg: 'localStorage数据不全！' } })
//             Actions.mainRoot()
//         }
//     } catch (err) {
//         ToastAndroid.show(`初始化错误:${err}`, 10)
//         if (err.name == 'NotFoundError') {
//             dispatch({ type: actionTypes.initializationTypes.load_localStorage_error, payload: { errorMsg: err } })
//         } else {
//             localStorage.remove({ key: localStorageKey.USER })
//             dispatch({ type: actionTypes.initializationTypes.load_localStorage_error, payload: { errorMsg: err } })
//         }
//         Actions.mainRoot()
//     }

// }

// //第四步:更换service-token ,如果更新成功将登陆数据放入userReducer
// export const validateToken = (tryCount = 1) => async (dispatch, getState) => {
//     const currentStep = 4
//     try {
//         const { communicationSettingReducer: { data: { base_host } },
//             initializationReducer: { data: { userlocalStorage: { uid, token } } } } = getState()
//         const url = `${base_host}/user/${uid}/token/${token}`
//         const res = await httpRequest.get(url)
//         if (res.success) {
//             const getUserInfoUrl = `${base_host}/user?${ObjectToUrl({ userId: uid })}`
//             const getUserInfoRes = await httpRequest.get(getUserInfoUrl)
//             if (getUserInfoRes.success) {
//                 const { uid, mobile, real_name, type, gender, avatar_image, status, drive_id } = getUserInfoRes.result[0]
//                 const user = {
//                     uid, mobile, real_name, type, gender, avatar_image, status, drive_id,
//                     token: res.result.accessToken,
//                 }
//                 //判断请求是否成功，如果成功，更新token
//                 localStorage.save({ key: localStorageKey.USER, data: user })
//                 requestHeaders.set('auth-token', res.result.accessToken)
//                 requestHeaders.set('user-type', type)
//                 requestHeaders.set('user-name', mobile)
//                 dispatch({ type: actionTypes.loginTypes.set_userInfo, payload: { user } })
//                 // console.log('user', user)
//                 dispatch({ type: actionTypes.initializationTypes.validate_token_success, payload: { step: currentStep } })
//                 Actions.mainRoot()
//             } else {
//                 ToastAndroid.showWithGravity(`登陆失败：无法获取用户信息！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
//                 dispatch({ type: actionTypes.initializationTypes.validate_token_failed, payload: { failedMsg: '无法获取用户信息！' } })
//             }
//         }
//         else {
//             //判断请求是否成功，如果失败，跳转到登录页
//             dispatch({ type: actionTypes.initializationTypes.validate_token_failed, payload: { failedMsg: res.msg } })
//             Actions.mainRoot()
//         }
//     } catch (err) {
//         ToastAndroid.show(`初始化错误:${err}`, 10)
//         if (err.message == 'Network request failed') {
//             //尝试20次
//             if (tryCount < 20) {
//                 await sleep(1000)
//                 dispatch(validateToken(tryCount + 1))
//             } else {
//                 dispatch({ type: actionTypes.initializationTypes.validate_token_error, payload: { errorMsg: err } })
//             }
//         } else {
//             dispatch({ type: actionTypes.initializationTypes.validate_token_error, payload: { errorMsg: err } })
//             Actions.mainRoot()
//         }
//     }
// }