import httpRequest from '../util/HttpRequest'
import { base_host, file_host, record_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'
import { getFormValues } from 'redux-form'
import { ToastAndroid } from 'react-native'
import { objectExceptNull } from '../util/util'

export const updateDamage = (param) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.demageEditorTypes.update_Damage_waiting, payload: {} })
    const { damageId, carId, vin } = param
    const state = getState()
    const { userReducer: { data: { user: { userId } } } } = state
    const applyDamageForm = getFormValues('demageEditorForm')(state) ? getFormValues('demageEditorForm')(state) : {}
    const { damageExplain, driver: { value, id, truck_id, truck_num } } = applyDamageForm
    try {
        const url = `${base_host}/user/${userId}/damage/${damageId}`
        const res = await httpRequest.put(url, objectExceptNull({
            carId,
            vin,
            truckId: truck_id,
            truckNum: truck_num,
            driveId: id,
            driveName: value,
            damageExplain
        }))
        if (res.success) {
            dispatch({ type: actionTypes.demageListTypes.update_Demage, payload: { id: damageId, truck_id, truck_num, drive_id: id, drive_name: value, damage_explain: damageExplain } })
            dispatch({ type: actionTypes.demageEditorTypes.update_Damage_success, payload: {} })
            ToastAndroid.showWithGravity(`修改成功！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        } else {
            dispatch({ type: actionTypes.demageEditorTypes.update_Damage_failed, payload: { failedMsg: res.msg } })
            ToastAndroid.showWithGravity(`修改失败！${res.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    } catch (err) {
        dispatch({ type: actionTypes.demageEditorTypes.update_Damage_error, payload: { errorMsg: err } })
        ToastAndroid.showWithGravity(`修改成功！${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
    }
}