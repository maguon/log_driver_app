import * as actionTypes from '../../actionTypes/index'
import * as actions from '../../actions/index'
import httpRequest from '../../util/HttpRequest.js'
import localStorageKey from '../../util/LocalStorageKey'
import localStorage from '../../util/LocalStorage'
import { sleep, randomString } from '../../util/util'
import requestHeaders from '../../util/RequestHeaders'
import { ObjectToUrl } from '../../util/ObjectToUrl'
import { Toast } from 'native-base'
import * as ios_app from '../../ios_app.json'
import {Actions }from 'react-native-router-flux'

export const cleanLogin = () => async (dispatch, getState) => {
    const { loginReducer: { data: { user } } } = getState()
    localStorage.save({
        key: localStorageKey.USER,
        data: {
            mobile: user.mobile
        }
    })

    dispatch({ type: actionTypes.loginType.clean_login, payload: { mobile: user.mobile } })
    Actions.replace("loginGroup")

}

export const login = param => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.loginType.login_waiting, payload: {} })
        let { mobile, password, server } = param
        // console.log('param', param)
        server = `${server}`.replace(/\s*/g, "")
        mobile = `${mobile}`.replace(/\s*/g, "")

        const base_host = `http://api.${server}/api`
        // console.log('param', param)
        const { initializationReducer: { data: {
            version: { currentVersion },
            deviceInfo: { uniqueID } }, data } } = getState()

        const url = `${base_host}/mobileUserLogin?${ObjectToUrl({
            version: currentVersion,
            appType: ios_app.type,
            deviceType: 1,
            deviceId: uniqueID
        })}`
        // console.log('url', url)
        const res = await httpRequest.post(url, { mobile, password })
        // console.log('res', res)

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
                    await dispatch(actions.communicationSettingAction.saveCommunicationSetting({ url: server }))
                    await dispatch({ type: actionTypes.loginType.login_success, payload: { user } })
                    dispatch(actions.initializationAction.loadDeviceToken(data))
                    // Actions.appMain()
                } else {
                    Toast.show({text:`登陆失败：无法获取用户信息！`})
                    dispatch({ type: actionTypes.loginType.login_failed, payload: { failedMsg: '无法获取用户信息！' } })
                }
            }
            else {
                Toast.show({text:`登陆失败：身份错误！`})
                dispatch({ type: actionTypes.loginType.login_failed, payload: { failedMsg: '身份错误！' } })
            }
        } else {
            //登录失败重新登录
            Toast.show({text:`登陆失败：${res.msg}`})
            dispatch({ type: actionTypes.loginType.login_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        // console.log('err', err)
        if (err.message == 'Network request failed') {
            Toast.show({text:`登陆失败：网络链接失败！`})
            dispatch({ type: actionTypes.loginType.login_error, payload: { errorMsg: err } })
            // }
        } else {
            Toast.show({text:`登陆失败：${err}`})
            dispatch({ type: actionTypes.loginType.login_error, payload: { errorMsg: err } })
        }
    }

}

export const validateVersionForLogin = param => async (dispatch, getState) => {
    const currentStep = 2
    try {
        const { initializationReducer: { data } } = getState()
        let { mobile, password, server } = param
        server = `${server}`.replace(/\s*/g, "")
        mobile = `${mobile}`.replace(/\s*/g, "")
        // console.log('param', param)
        const base_host = `http://api.${server}/api`
        const url = `${base_host}/app?${ObjectToUrl({ app: ios_app.type, type: ios_app.ios })}`
        const res = await httpRequest.get(url)
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
            // console.log('versionList', versionList)
            //force_update:0(版本为最新版), 1(版本过低，强制更新), 2(版本过低，但不需要强制更新)
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

            if (versionInfo.force_update != 1) {
                await dispatch({
                    type: actionTypes.initializationType.init_app_failed, payload: {
                        step: currentStep + 1,
                        msg: '登陆未执行',
                        param: {
                            ...data,
                            version: versionInfo
                        }
                    }
                })
                dispatch(login(param))
            } else {
                dispatch({
                    type: actionTypes.initializationType.init_app_complete, payload: {
                        param: {
                            ...data,
                            version: versionInfo
                        }
                    }
                })
            }

        } else {
            if (res.msg == ' service not found !') {
                Toast.show({text:'服务器地址设置错误，请重新设置！'})
            }
        }
    } catch (err) {
        // console.log('err', err)
        Toast.show({text:`初始化错误:${err}`})
    }
}





