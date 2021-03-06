import * as httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actionTypes/index'
import { objectExceptNull } from '../../../util/util'
import { ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'

export const applyAccident = (param) => async (dispatch, getState) => {
    const { loginReducer: { data: { user: { uid, drive_id } } } } = getState()
    const { communicationSettingReducer: { data: { base_host} } } = getState()
    try {
        dispatch({ type: actionTypes.applyAccidentTypes.apply_Accident_waiting, payload: {} })
        console.log('param', param)
        const url = `${base_host}/user/${uid}/truckAccident`
        console.log('url', url)

        const res = await httpRequest.post(url, objectExceptNull({
            truckId: param.accidentType.id,
            driveId: drive_id,
            dpRouteTaskId: param.dpRouteTask ? param.dpRouteTask.id : null,
            accidentDate: param.accidentDate,
            address: param.address.value,
            lng: param.address.lng,
            lat: param.address.lat,
            accidentExplain: param.accidentExplain
        }))
        console.log('res', res)

        if (res.success) {
            dispatch({
                type: actionTypes.applyAccidentTypes.apply_Accident_success, payload: {
                    accidentId: res.id,
                    truckNum: param.accidentType.num
                }
            })
            ToastAndroid.showWithGravity('提交成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            Actions.applyAccidentImage()
        } else {
            dispatch({ type: actionTypes.applyAccidentTypes.apply_Accident_failed, payload: { failedMsg: res.msg } })
            ToastAndroid.showWithGravity(`提交失败:${res.msg}!`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    } catch (err) {
        dispatch({ type: actionTypes.applyAccidentTypes.apply_Accident_error, payload: { errorMsg: err } })
        ToastAndroid.showWithGravity(`提交失败:${err}!`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
    }
}