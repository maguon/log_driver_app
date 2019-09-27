import * as actionTypes from '../../actionTypes/index'
import httpRequest from '../../util/HttpRequest'
import * as actions from '../../actions/index'
import {Alert} from "react-native";


export const changeMobileNo = param => async (dispatch, getState) => {
    try {
        // console.log('param', param)
        const { mobileNo, vCode } = param
        const { loginReducer: { data: { user: { uid } }},communicationSettingReducer:{data: { base_host } } } = getState()
        dispatch({ type: actionTypes.changeMobileNoActionType.change_mobileNo_waiting, payload: {} })
        const url = `${base_host}/user/${uid}/mobile`
        // console.log('url', url)
        const res = await httpRequest.put(url, {
            newMobile: mobileNo,
            captcha: vCode
        })
        // console.log('res', res)
        if (res.success) {
            // Toast.show({text:'换绑成功！'})
            Alert.alert(
                '',
                '换绑成功！',
                [
                    {text: '确定', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ],
                {cancelable: false}
            )
            dispatch({ type: actionTypes.changeMobileNoActionType.change_mobileNo_success, payload: {} })
            dispatch(actions.loginAction.cleanLogin({ phone: '' }))
        } else {
            dispatch({ type: actionTypes.changeMobileNoActionType.change_mobileNo_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({ type: actionTypes.changeMobileNoActionType.change_mobileNo_error, payload: { errorMsg: `${err}` } })
    }
}


