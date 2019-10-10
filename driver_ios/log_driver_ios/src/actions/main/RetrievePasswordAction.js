import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import * as actions from '../index'
import { change } from 'redux-form'
import {Alert} from "react-native";


export  const retrieve=(param)=>async(dispatch,getState)=>{
    try {
        // console.log('param', param)
        const { mobileNo, vCode, server, newPassword } = param
        const Server = `${server}`.replace(/\s*/g, "")
        const base_host = `http://api.${Server}/api`
        // const { loginReducer: { data: { user: { uid } } } } = getState()
        dispatch({ type: actionTypes.retrievePasswordType.retrieve_waiting, payload: {} })
        const url = `${base_host}/phone/${mobileNo}/password`
        //  console.log('url', url)
        const res = await httpRequest.put(url, {
            captcha: vCode,
            password: newPassword
        })
        //  console.log('res', res)
        if (res.success) {

            // Toast.show({
            //     text:'修改成功'
            // })
            dispatch({ type: actionTypes.retrievePasswordType.retrieve_success, payload: {} })
            //更新url
            await dispatch(actions.communicationSettingAction.saveCommunicationSetting({ url: server }))
            //替换登录server
            await dispatch(change('loginForm', 'server', server))
            Alert.alert(
                '',
                `修改成功！`,
                [
                    {text: '确定', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ],
                {cancelable: false}
            )


        } else {
            // Toast.show({
            //     text:`修改失败：${res.msg}`
            // })
            dispatch({ type: actionTypes.retrievePasswordType.retrieve_failed, payload: { failedMsg: `${res.msg}` } })
            Alert.alert(
                '',
                `修改失败：${res.msg}`,
                [
                    {text: '确定', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ],
                {cancelable: false}
            )

        }
    }catch (err) {
        // console.log('err', err)
        // Toast.show({
        //     text:`修改失败：${err}`
        // })
        dispatch({ type: actionTypes.retrievePasswordType.retrieve_error, payload: { errorMsg: `${err}` } })
        Alert.alert(
            '',
            `修改失败：${err}`,
            [
                {text: '确定', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            {cancelable: false}
        )

    }
}
