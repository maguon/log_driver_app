import * as actionTypes from '../../actionTypes/index'
import httpRequest from '../../util/HttpRequest'
import { sleep } from '../../util/util'
import {Alert} from "react-native";


export const countDown = () => async (dispatch, getState) => {
    const { changeMobileVCodeReducer: { data: { countDownTime } } } = getState()
    try {
        if (countDownTime > 0) {
            dispatch({ type: actionTypes.changeMobileVCodeActionType.countDownForChangeMobile_start, payload: { countDownTime: countDownTime - 1 } })
            await sleep(1000)
            dispatch(countDown())
        } else {
            dispatch({ type: actionTypes.changeMobileVCodeActionType.countDownForChangeMobile_end, payload: { countDownTime: 60 } })
        }
    } catch (err) {
        // Toast.show({text:`倒计时错误！`})
        Alert.alert(
            '',
            `倒计时错误！`,
            [
                {text: '确定', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            {cancelable: false}
        )
    }
}


export const getVCode = param => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { uid } },url:{base_host} } } = getState()


        console.log('getState()', getState())
        dispatch({ type: actionTypes.changeMobileVCodeActionType.get_vCodeForChangeMobile_waiting, payload: {} })
        const url = `${base_host}/user/${uid}/phone/${param}/mobileSms`
        // console.log('url', url)
        const res = await httpRequest.post(url, {})
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.changeMobileVCodeActionType.get_vCodeForChangeMobile_success, payload: {} })
            dispatch(countDown())
        } else {
            dispatch({ type: actionTypes.changeMobileVCodeActionType.get_vCodeForChangeMobile_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        // console.log('err',err)
        dispatch({ type: actionTypes.changeMobileVCodeActionType.get_vCodeForChangeMobile_error, payload: { errorMsg: `${err}` } })
    }
}
