import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import * as actions from '../index'
import { change } from 'redux-form'
import { Toast } from 'native-base'


export  const retrieve=(param)=>async(dispatch,getState)=>{
    try {
        // console.log('param', param)
        const { mobileNo, vCode, server, newPassword } = param
        const Server = `${server}`.replace(/\s*/g, "")
        const base_host = `http://api.${Server}/api`
        // const { loginReducer: { data: { user: { uid } } } } = getState()
        dispatch({ type: actionTypes.retrievePasswordTypes.retrieve_waiting, payload: {} })
        const url = `${base_host}/phone/${mobileNo}/password`
        //  console.log('url', url)
        const res = await httpRequest.put(url, {
            captcha: vCode,
            password: newPassword
        })
        //  console.log('res', res)
        if (res.success) {

            Toast.show({
                text:'修改成功'
            })
            dispatch({ type: actionTypes.retrievePasswordTypes.retrieve_success, payload: {} })
            //更新url
            await dispatch(actions.communicationSettingActions.saveCommunicationSetting({ url: server }))
            //替换登录server
            await dispatch(change('loginForm', 'server', server))

        } else {
            Toast.show({
                text:`修改失败：${res.msg}`
            })
            dispatch({ type: actionTypes.retrievePasswordTypes.retrieve_failed, payload: { failedMsg: `${res.msg}` } })
        }
    }catch (err) {
        // console.log('err', err)
        Toast.show({
            text:`修改失败：${err}`
        })
        dispatch({ type: actionTypes.retrievePasswordTypes.retrieve_error, payload: { errorMsg: `${err}` } })
    }
}
