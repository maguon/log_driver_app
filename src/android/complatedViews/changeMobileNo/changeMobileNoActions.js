import * as reduxActionTypes from '../../../actionTypes'
import * as reduxActions from '../../../actions'
import httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import { ToastAndroid } from 'react-native'
import * as login from '../../complatedViews/login/LoginAction'

export const changeMobileNo = param => async (dispatch, getState) => {
    try {
        // console.log('param', param)
        const { mobileNo, vCode } = param
        const { loginReducer: { data: { user: { uid } } } } = getState()
        dispatch({ type: reduxActionTypes.changeMobileNo.change_mobileNo_waiting, payload: {} })
        const url = `${base_host}/user/${uid}/mobile`
        // console.log('url', url)
        const res = await httpRequest.put(url, {
            newMobile: mobileNo,
            captcha: vCode
        })
        // console.log('res', res)
        if (res.success) {
            ToastAndroid.show('换绑成功！', 10)
            dispatch({ type: reduxActionTypes.changeMobileNo.change_mobileNo_success, payload: {} })
            dispatch(login.cleanLogin({ phone: '' }))
        } else {
            dispatch({ type: reduxActionTypes.changeMobileNo.change_mobileNo_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({ type: reduxActionTypes.changeMobileNo.change_mobileNo_error, payload: { errorMsg: `${err}` } })
    }
}


