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

export const login = (param, tryCount = 1) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.loginTypes.login_waiting, payload: {} })
        const { mobile, password, server } = param
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