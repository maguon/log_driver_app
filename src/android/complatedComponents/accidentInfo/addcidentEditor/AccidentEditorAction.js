import * as httpRequest from '../../../../util/HttpRequest'

import * as actionTypes from '../../../../actionTypes/index'
import { objectExceptNull } from '../../../../util/util'
import { ToastAndroid } from 'react-native'


export const updateAccident = (param,accidentId) => async (dispatch, getState) => {
     const { loginReducer: { data: { user: { uid } } }, truckReducer: { data: { driverInfo: { id } } } } = getState()
     const { communicationSettingReducer: { data: { base_host } } } = getState()
    try {
        dispatch({ type: actionTypes.accidentEditorTypes.update_Accident_waiting, payload: {} })
        const url = `${base_host}/user/${uid}/truckAccident/${accidentId}`
        const res = await httpRequest.put(url, objectExceptNull({
            truckId: param.accidentType.id,
            driveId: id,
            dpRouteTaskId: param.dpRouteTask ? param.dpRouteTask.id : null,
            accidentDate: param.accidentDate,
            address: param.address.value,
            lng: param.address.lng,
            lat: param.address.lat,
            accidentExplain: param.accidentExplain
        }))
        if (res.success) {
            dispatch({ type: actionTypes.accidentEditorTypes.update_Accident_success, payload: { } })
            ToastAndroid.showWithGravity('修改成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        } else {
            dispatch({ type: actionTypes.accidentEditorTypes.update_Accident_failed, payload: { failedMsg: res.msg } })
            ToastAndroid.showWithGravity(`修改失败:${res.msg}!`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    } catch (err) {
        dispatch({ type: actionTypes.accidentEditorTypes.update_Accident_error, payload: { errorMsg: err } })
        ToastAndroid.showWithGravity(`修改失败:${err}!`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
    }
}