import * as actionTypes from '../../actionTypes/index'
import httpRequest from '../../util/HttpRequest'
import {sleep} from '../../util/util'
import {Toast} from 'native-base'


export const countDown = () => async (dispatch, getState) => {
    const {retrievePasswordVCodeReducer: {data: {countDownTime}}} = getState()
    try {
        if (countDownTime > 0) {
            console.log('countDownTime', countDownTime)
            dispatch({
                type: actionTypes.retrievePasswordVCodeActionType.countDownForRetrievePassword_start,
                payload: {countDownTime: countDownTime - 1}
            })
            await sleep(1000)
            dispatch(countDown())
        } else {
            console.log('f')

            dispatch({
                type: actionTypes.retrievePasswordVCodeActionType.countDownForRetrievePassword_end,
                payload: {countDownTime: 60}
            })
        }
    } catch (err) {
        Toast.show({
            text: '倒计时错误！'
        })
    }
}


export const getVCode = param => async (dispatch) => {
    try {
        const {server, mobileNo} = param
        const Server = `${server}`.replace(/\s*/g, "")
        const base_host = `http://api.${Server}/api`
        dispatch({type: actionTypes.retrievePasswordVCodeActionType.get_vCodeForRetrievePassword_waiting, payload: {}})
        const url = `${base_host}/phone/${mobileNo}/passwordSms`
        console.log('url', url)
        const res = await httpRequest.post(url, {})
        // console.log('res', res)
        if (res.success) {
            dispatch({
                type: actionTypes.retrievePasswordVCodeActionType.get_vCodeForRetrievePassword_success,
                payload: {}
            })
            dispatch(countDown())
        } else {
            dispatch({
                type: actionTypes.retrievePasswordVCodeActionType.get_vCodeForRetrievePassword_failed,
                payload: {failedMsg: `${res.msg}`}
            })
        }
    } catch (err) {
        // console.log('err',err)
        Toast.show({
            text: '服务器错误，请核对后重新填写！'
        })
        dispatch({
            type: actionTypes.retrievePasswordVCodeActionType.get_vCodeForRetrievePassword_error,
            payload: {errorMsg: `${err}`}
        })
    }
}
