import * as httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes'
import { getFormValues } from 'redux-form'
import * as actions from '../../actions/index'
import {Alert} from "react-native";

export const updatePassword = () => async (dispatch, getState) => {
    const state = getState()
    const { confirmPassword, newPassword, oldPassword } = getFormValues('updatePasswordForm')(state)
    const { loginReducer: { data: { user: { uid } } ,url:{base_host}} } = state
    if (newPassword == confirmPassword) {
        try {
            const url = `${base_host}/user/${uid}/password`
            const res = await httpRequest.put(url, {
                originPassword: oldPassword,
                newPassword
            })
            if (res.success) {

                Alert.alert(
                    '',
                    '修改成功，请重新登录！',
                    [
                        {text: '确定', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    ],
                    {cancelable: false}
                )

                dispatch({ type: actionTypes.updatePasswordActionType.change_Password_success, payload: {} })
                dispatch(actions.loginAction.cleanLogin())
            } else {
                // Toast.show({text:`修改失败！${res.msg}`})
                Alert.alert(
                    '',
                    `修改失败！${res.msg}`,
                    [
                        {text: '确定', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    ],
                    {cancelable: false}
                )
                dispatch({ type: actionTypes.updatePasswordActionType.change_Password_failed, payload: { failedMsg: res.msg } })
            }
        } catch (err) {
            // Toast.show({text:`修改失败！${err}`})
            Alert.alert(
                '',
                `修改失败！${err}`,
                [
                    {text: '确定', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ],
                {cancelable: false}
            )
            dispatch({ type: actionTypes.updatePasswordActionType.change_Password_error, payload: { errorMsg: err } })
        }
    } else {
        // Toast.show({text:`两次输入的新密码不同!`})
        Alert.alert(
            '',
            `两次输入的新密码不同!`,
            [
                {text: '确定', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            {cancelable: false}
        )
    }
}
