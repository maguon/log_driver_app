import * as reduxActionTypes from '../../../../actionTypes'
import httpRequest from '../../../../util/HttpRequest'
import { sleep } from '../../../../util/util'
import { ToastAndroid } from 'react-native'


export const countDown = () => async (dispatch, getState) => {
    const { retrievePasswordVCodeReducer: { data: { countDownTime } } } = getState()
    try {
        if (countDownTime > 0) {
            console.log('countDownTime',countDownTime)
            dispatch({ type: reduxActionTypes.retrievePasswordVCode.countDownForRetrievePassword_start, payload: { countDownTime: countDownTime - 1 } })
            await sleep(1000)
            dispatch(countDown())
        } else {
            console.log('f')

            dispatch({ type: reduxActionTypes.retrievePasswordVCode.countDownForRetrievePassword_end, payload: { countDownTime: 60 } })
        }
    } catch (err) {
        ToastAndroid.show(`倒计时错误！`, 10)
    }
}


export const getVCode = param => async (dispatch) => {
    try {
        const { server, mobileNo } = param
        server = `${server}`.replace(/\s*/g, "")
        const base_host = `http://api.${server}/api`
        dispatch({ type: reduxActionTypes.retrievePasswordVCode.get_vCodeForRetrievePassword_waiting, payload: {} })
        const url = `${base_host}/phone/${mobileNo}/passwordSms`
        console.log('url', url)
        const res = await httpRequest.post(url, {})
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.retrievePasswordVCode.get_vCodeForRetrievePassword_success, payload: {} })
            dispatch(countDown())
        } else {
            dispatch({ type: reduxActionTypes.retrievePasswordVCode.get_vCodeForRetrievePassword_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        // console.log('err',err)
        ToastAndroid.show('服务器错误，请核对后重新填写！', 10)
        dispatch({ type: reduxActionTypes.retrievePasswordVCode.get_vCodeForRetrievePassword_error, payload: { errorMsg: `${err}` } })
    }
}