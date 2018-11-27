import * as reduxActionTypes from '../../../../actionTypes'
import httpRequest from '../../../../util/HttpRequest'
import { base_host } from '../../../../config/Host'
import { sleep } from '../../../../util/util'
import { ToastAndroid } from 'react-native'


export const countDown = () => async (dispatch, getState) => {
    const { changeMobileVCodeReducer: { data: { countDownTime } } } = getState()
    try {
        if (countDownTime > 0) {
            dispatch({ type: reduxActionTypes.changeMobileVCode.countDownForChangeMobile_start, payload: { countDownTime: countDownTime - 1 } })
            await sleep(1000)
            dispatch(countDown())
        } else {
            dispatch({ type: reduxActionTypes.changeMobileVCode.countDownForChangeMobile_end, payload: { countDownTime: 60 } })
        }
    } catch (err) {
        ToastAndroid.show(`倒计时错误！`, 10)
    }
}


export const getVCode = param => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { uid } } } } = getState()
        console.log('getState()', getState())
        dispatch({ type: reduxActionTypes.changeMobileVCode.get_vCodeForChangeMobile_waiting, payload: {} })
        const url = `${base_host}/user/${uid}/phone/${param}/mobileSms`
        // console.log('url', url)
        const res = await httpRequest.post(url, {})
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.changeMobileVCode.get_vCodeForChangeMobile_success, payload: {} })
            dispatch(countDown())
        } else {
            dispatch({ type: reduxActionTypes.changeMobileVCode.get_vCodeForChangeMobile_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        // console.log('err',err)
        dispatch({ type: reduxActionTypes.changeMobileVCode.get_vCodeForChangeMobile_error, payload: { errorMsg: `${err}` } })
    }
}