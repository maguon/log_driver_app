import * as actionTypes from '../actionTypes'
import httpRequest from '../util/HttpRequest.js'
import localStorageKey from '../util/LocalStorageKey'
import localStorage from '../util/LocalStorage'
import { base_host } from '../config/Host'
import requestHeaders from '../util/RequestHeaders'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const login = (params) => (dispatch) => {
    httpRequest.postCallBack(`${base_host}/mobileUserLogin?${ObjectToUrl(params.OptionalParam)}`, params.postParam, (err, res) => {
        if (err) {
            //登录失败重新登录
            //console.log(err)
            dispatch({ type: actionTypes.loginTypes.LOGIN_ERROR, payload: { data: err } })
        } else {
           // console.log(res)
            if (res.success) {
                //console.log('success', res)
                //判断请求是否成功，如果成功，更新token
                if (res.result.type == 10) {
                    let user = {
                        userId: res.result.userId,
                        token: res.result.accessToken,
                        userType: res.result.type,
                        userStatus: res.result.userStatus,
                        mobile: res.result.phone,
                        deviceToken: params.OptionalParam.deviceToken
                    }
                    requestHeaders.set('auth-token', res.result.accessToken)
                    requestHeaders.set('user-type', res.result.type)
                    requestHeaders.set('user-name', res.result.phone)
                    localStorage.saveKey(localStorageKey.USER, user)
                    dispatch({ type: actionTypes.loginTypes.LOGIN_SUCCESS, payload: { data: user } })
                }
                else {
                    dispatch({ type: actionTypes.loginTypes.LOGIN_FAILED, payload: { data: '身份错误！' } })
                }
            } else {
                //登录失败重新登录
                //console.log(err)
                dispatch({ type: actionTypes.loginTypes.LOGIN_FAILED, payload: { data: res.msg } })
            }
        }
    })
}

export const resetLogin = () => (dispatch) => {
    dispatch({ type: actionTypes.loginTypes.RESET_LOGIN, payload: {} })
}


export const cleanLogin = () => (dispatch) => {
    dispatch({ type: actionTypes.loginTypes.CLEAN_LOGIN, payload: {} })
}
