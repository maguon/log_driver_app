import * as actionTypes from '../actionTypes'
import httpRequest from '../util/HttpRequest.js'
import localStorageKey from '../util/LocalStorageKey'
import localStorage from '../util/LocalStorage'
import { base_host } from '../config/Host'
import requestHeaders from '../util/RequestHeaders'
import { ObjectToUrl } from '../util/ObjectToUrl'


//登录
export const login = (param, tryCount = 1, currentStep = 1) => async (dispatch) => {
    try {
        const url = `${base_host}/mobileUserLogin?${ObjectToUrl(param.OptionalParam)}`
        const res = await httpRequest.post(url, param.postParam)
        if (res.success) {
            //判断请求是否成功，如果成功，更新token
            if (res.result.type == 10) {

                const user = {
                    userId: res.result.userId,
                    token: res.result.accessToken,
                    userType: res.result.type,
                    userStatus: res.result.userStatus,
                    mobile: res.result.phone
                }
                requestHeaders.set('auth-token', res.result.accessToken)
                requestHeaders.set('user-type', res.result.type)
                requestHeaders.set('user-name', res.result.phone)
                localStorage.save({
                    key: localStorageKey.USER,
                    data: user
                })
                dispatch({ type: actionTypes.loginTypes.Login_Success, payload: { user, step: currentStep } })
            }
            else {
                dispatch({ type: actionTypes.loginTypes.Login_Failed, payload: { failedMsg: '身份错误！', step: currentStep } })
            }
        } else {
            //登录失败重新登录
            dispatch({ type: actionTypes.loginTypes.Login_Failed, payload: { failedMsg: res.msg, step: currentStep } })
        }
    } catch (err) {
        if (err.message == 'Network request failed') {
            //尝试20次
            if (tryCount < 20) {
                await sleep(1000)
                initApp(param, tryCount + 1, currentStep)(dispatch)
            } else {
                dispatch({ type: actionTypes.loginTypes.Login_NetWorkError, payload: { networkError: err.message, step: currentStep } })
            }
        } else {
            dispatch({ type: actionTypes.loginTypes.Login_Error, payload: { errorMsg: err.message, step: currentStep } })
        }
    }
}

export const loginFlowWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.loginTypes.LoginFlow_Waiting, payload: {} })
}

export const cleanLogin = () => (dispatch) => {
    dispatch({ type: actionTypes.loginTypes.CLEAN_LOGIN, payload: {} })
}
