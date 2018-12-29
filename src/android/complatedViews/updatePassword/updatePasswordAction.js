import * as httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actionTypes'
import { getFormValues } from 'redux-form'
import { ToastAndroid } from 'react-native'
import * as loginAction from '../login/LoginAction'

export const updatePassword = () => async (dispatch, getState) => {
    const state = getState()
    const { confirmPassword, newPassword, oldPassword } = getFormValues('updatePasswordForm')(state)
    const { communicationSettingReducer: { data: { base_host } } } = getState()
    const { loginReducer: { data: { user: { uid } } } } = state
    if (newPassword == confirmPassword) {
        try {
            const url = `${base_host}/user/${uid}/password`
            const res = await httpRequest.put(url, {
                originPassword: oldPassword,
                newPassword
            })
            if (res.success) {
                ToastAndroid.show(`修改成功，请重新登录！`, 10)
                dispatch({ type: actionTypes.updatePassword.change_Password_success, payload: {} })
                dispatch(loginAction.cleanLogin())
            } else {
                ToastAndroid.show(`修改失败！${res.msg}`, 10)
                dispatch({ type: actionTypes.updatePassword.change_Password_failed, payload: { failedMsg: res.msg } })
            }
        } catch (err) {
            ToastAndroid.show(`修改失败！${err}`, 10)
            dispatch({ type: actionTypes.updatePassword.change_Password_error, payload: { errorMsg: err } })
        }
    } else {
        ToastAndroid.show(`两次输入的新密码不同!`, 10)
    }
}
