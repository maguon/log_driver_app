import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { getFormValues } from 'redux-form'
import { Toast } from 'native-base'
import { objectExceptNull } from '../../util/util'
import {Alert} from "react-native";

export const updateDamage = (param) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.demageEditorType.update_Damage_waiting, payload: {} })
    const { damageId, carId, vin } = param
    const state = getState()
    const { loginReducer: { data: { user: { uid } }},communicationSettingReducer:{data:{base_host} } } = state
    const applyDamageForm = getFormValues('demageEditorForm')(state) ? getFormValues('demageEditorForm')(state) : {}
    const { damageExplain, driver: { value, id, truck_id, truck_num } } = applyDamageForm
    try {
        const url = `${base_host}/user/${uid}/damage/${damageId}`
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
            dispatch({ type: actionTypes.demageListType.update_Demage, payload: { id: damageId, truck_id, truck_num, drive_id: id, drive_name: value, damage_explain: damageExplain } })
            dispatch({ type: actionTypes.demageEditorType.update_Damage_success, payload: {} })
             //Toast.show({text:`修改成功！`})
            Alert.alert(
                '',
                `修改成功！`,
                [
                    {text: '确定', onPress: () =>  console.log("success"), style: 'cancel'},
                ],
                {cancelable: false}
            )
        } else {
            dispatch({ type: actionTypes.demageEditorType.update_Damage_failed, payload: { failedMsg: res.msg } })
             //Toast.show({text:`修改失败！${res.msg}`})
            Alert.alert(
                '',
                `修改失败！${res.msg}`,
                [
                    {text: '确定', onPress: () =>  console.log("success"), style: 'cancel'},
                ],
                {cancelable: false}
            )
        }
    } catch (err) {
        dispatch({ type: actionTypes.demageEditorType.update_Damage_error, payload: { errorMsg: err } })
        // Toast.show({text:`修改成功！${err}`})
        Alert.alert(
            '',
            `修改成功！${err}`,
            [
                {text: '确定', onPress: () =>  console.log("success"), style: 'cancel'},
            ],
            {cancelable: false}
        )
    }
}
