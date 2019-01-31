import httpRequest from '../../../util/HttpRequest.js'
import * as reduxActionTypes from '../../../actionTypes/index'
import * as reduxActions from '../../../actions/index'
import { change } from 'redux-form'
import { ToastAndroid } from 'react-native'


export const retrieve = (param) => async (dispatch, getState) => {
    try {
        // const { communicationSettingReducer: { data: { base_host } } } = getState()

        // console.log('param', param)
        const { mobileNo, vCode, server, newPassword } = param
        server = `${server}`.replace(/\s*/g, "")
        const base_host = `http://api.${server}/api`
        // const { loginReducer: { data: { user: { uid } } } } = getState()
        dispatch({ type: reduxActionTypes.retrievePassword.Retrieve_WAITING, payload: {} })
        const url = `${base_host}/phone/${mobileNo}/password`
        //  console.log('url', url)
        const res = await httpRequest.put(url, {
            captcha: vCode,
            password: newPassword
        })
        //  console.log('res', res)
        if (res.success) {
            ToastAndroid.show('修改成功！', 10)
            dispatch({ type: reduxActionTypes.retrievePassword.Retrieve_SUCCESS, payload: {} })
            await dispatch(reduxActions.communicationSetting.saveCommunicationSetting({ url: server }))
            await dispatch(change('loginForm', 'server', server))

        } else {
            ToastAndroid.show(`修改失败：${res.msg}`, 10)

            dispatch({ type: reduxActionTypes.retrievePassword.Retrieve_FAILED, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        // console.log('err', err)
        ToastAndroid.show(`修改失败：${err}`, 10)
        dispatch({ type: reduxActionTypes.retrievePassword.Retrieve_ERROR, payload: { errorMsg: `${err}` } })
    }
}