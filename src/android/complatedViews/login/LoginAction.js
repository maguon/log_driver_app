import * as actionTypes from '../../../actionTypes/index'
import * as actions from '../../../actions/index'
import httpRequest from '../../../util/HttpRequest.js'
import localStorageKey from '../../../util/LocalStorageKey'
import localStorage from '../../../util/LocalStorage'
import { sleep } from '../../../util/util'
import requestHeaders from '../../../util/RequestHeaders'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'
import * as android_app from '../../../android_app.json'
import * as initializationActionTypes from '../../views/initialization/InitializationTypes'

export const cleanLogin = () => async (dispatch, getState) => {
    const { loginReducer: { data: { user } } } = getState()
    localStorage.save({
        key: localStorageKey.USER,
        data: {
            mobile: user.mobile
        }
    })
    dispatch({ type: actionTypes.loginTypes.clean_login, payload: { mobile: user.mobile } })
}

export const login = (param) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.loginTypes.login_waiting, payload: {} })
        let { mobile, password, server } = param
        server = `${server}`.replace(/\s*/g, "")
        mobile = `${mobile}`.replace(/\s*/g, "")
        const base_host = `http://api.${server}/api`
        const { initializationReducer: { data: {
            version: { currentVersion },
            deviceInfo: { deviceToken } } } } = getState()
        const url = `${base_host}/mobileUserLogin?${ObjectToUrl({
            version: currentVersion,
            appType: android_app.type,
            deviceType: 1,
            deviceToken
        })}`
        // console.log('url', url)
        const res = await httpRequest.post(url, { mobile, password })
        if (res.success) {
            if (res.result.type == 10) {
                const getUserInfoUrl = `${base_host}/user?${ObjectToUrl({ userId: res.result.userId })}`
                // console.log('getUserInfoUrl', getUserInfoUrl)
                const getUserInfoRes = await httpRequest.get(getUserInfoUrl)
                // console.log('getUserInfoRes', getUserInfoRes)
                if (getUserInfoRes.success) {
                    const { uid, mobile, real_name, type, gender, avatar_image, status, drive_id } = getUserInfoRes.result[0]
                    const user = {
                        uid, mobile, real_name, type, gender, avatar_image, status,
                        token: res.result.accessToken, drive_id
                    }
                    requestHeaders.set('auth-token', res.result.accessToken)
                    requestHeaders.set('user-type', type)
                    requestHeaders.set('user-name', mobile)
                    localStorage.save({
                        key: localStorageKey.USER,
                        data: user
                    })
                    await dispatch(actions.communicationSetting.saveCommunicationSetting({ url: server }))
                    await dispatch({ type: actionTypes.loginTypes.login_success, payload: { user } })
                } else {
                    ToastAndroid.show(`登陆失败：无法获取用户信息！`, 10)
                    dispatch({ type: actionTypes.loginTypes.login_failed, payload: { failedMsg: '无法获取用户信息！' } })
                }
            }
            else {
                ToastAndroid.show(`登陆失败：身份错误！`, 10)
                dispatch({ type: actionTypes.loginTypes.login_failed, payload: { failedMsg: '身份错误！' } })
            }
        } else {
            //登录失败重新登录
            ToastAndroid.show(`登陆失败：${res.msg}`, 10)
            dispatch({ type: actionTypes.loginTypes.login_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        // console.log('err', err)
        if (err.message == 'Network request failed') {
            //尝试20次
            // if (tryCount < 20) {
            //     await sleep(1000)
            //     dispatch(login(param, tryCount + 1))
            // } else {
                ToastAndroid.show(`登陆失败：网络链接失败！`, 10)
                dispatch({ type: actionTypes.loginTypes.login_error, payload: { errorMsg: err } })
            // }
        } else {
            ToastAndroid.show(`登陆失败：${err}`, 10)
            dispatch({ type: actionTypes.loginTypes.login_error, payload: { errorMsg: err } })
        }
    }

}

export const validateVersion = param => async (dispatch, getState) => {
    const currentStep = 1
    try {
        // console.log('android_app', android_app)
        // console.log('getState',getState())
        let { mobile, password, server } = param
        // console.log()
        server = `${server}`.replace(/\s*/g, "")
        mobile = `${mobile}`.replace(/\s*/g, "")

        // console.log('server', server)
        // console.log('mobile', mobile)

        const base_host = `http://api.${server}/api`
        // const { communicationSettingReducer: { data: { base_host } } } = getState()
        // console.log('base_host', base_host)
        dispatch({ type: actionTypes.initializationTypes.init_app_waiting, payload: {} })
        const url = `${base_host}/app?${ObjectToUrl({ app: android_app.type, type: android_app.android })}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            const versionInfo = {
                currentVersion: android_app.version,
                newestVersion: '',
                url: '',
                remark: '',
                force_update: 0
            }
            const currentVersionArr = android_app.version.split('.')
            let versionList = res.result
                .filter(item => {
                    const itemArr = item.version.split('.')
                    if (currentVersionArr[0] < itemArr[0]) {
                        return true
                    } else if (currentVersionArr[0] == itemArr[0] && currentVersionArr[1] < itemArr[1]) {
                        return true
                    } else if (currentVersionArr[0] == itemArr[0] && currentVersionArr[1] == itemArr[1] && currentVersionArr[2] < itemArr[2]) {
                        return true
                    } else {
                        return false
                    }
                })

            //force_update:0(版本为最新版), 1(版本过低，强制更新), 2(版本过低，但不需要强制更新)
            if (versionList.length > 0) {
                if (versionList.some(item => item.force_update == 1)) {
                    versionInfo.force_update = 1
                } else {
                    versionInfo.force_update = 2
                }
                versionList = versionList.sort((a, b) => {
                    const aArr = a.version.split('.')
                    const bArr = b.version.split('.')
                    if (aArr[0] < bArr[0]) {
                        return true
                    } else if (aArr[0] == bArr[0] && aArr[1] < bArr[1]) {
                        return true
                    } else if (aArr[0] == bArr[0] && aArr[1] == bArr[1] && aArr[2] < bArr[2]) {
                        return true
                    } else {
                        return false
                    }
                })
                versionInfo.newestVersion = versionList[0].version
                versionInfo.url = versionList[0].url
                versionInfo.remark = versionList[0].remark
            } else {
                versionInfo.force_update = 0
                versionInfo.newestVersion = versionInfo.currentVersion
            }
            if (versionInfo.force_update != 1) {
                dispatch(login(param))
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
        // console.log('err', err)
        ToastAndroid.show(`初始化错误:${err}`, 10)
        if (err.message == 'Network request failed') {
            //尝试20次
            // if (tryCount < 20) {
            //     await sleep(1000)
            //     dispatch(validateVersion(tryCount + 1))
            // } else {
            //     dispatch({ type: actionTypes.initializationTypes.valdate_version_error, payload: { errorMsg: err } })
            // }

        } else {
            dispatch({ type: actionTypes.initializationTypes.valdate_version_error, payload: { errorMsg: err } })
        }
        Actions.mainRoot()
    }
}
