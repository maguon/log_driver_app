import * as httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { objectExceptNull } from '../../util/util'
import { Toast } from 'native-base'
import {Alert} from "react-native";


export const updateAccident = (param,accidentId) => async (dispatch, getState) => {
     const { loginReducer: { data: { user: { uid }},communicationSettingReducer:{ data:{base_host}} }, truckReducer: { data: { driverInfo: { id } } } } = getState()
    try {
        dispatch({ type: actionTypes.accidentEditorType.update_Accident_waiting, payload: {} })
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
            dispatch({ type: actionTypes.accidentEditorType.update_Accident_success, payload: { } })
            //Toast.show({text:'修改成功！'})
            Alert.alert(
                '',
                `修改成功！`,
                [
                    {text: '确定', onPress: () =>  console.log("success"), style: 'cancel'},
                ],
                {cancelable: false}
            )
        } else {
            dispatch({ type: actionTypes.accidentEditorType.update_Accident_failed, payload: { failedMsg: res.msg } })
             //Toast.show({text:`修改失败:${res.msg}!`})
            Alert.alert(
                '',
                `修改失败:${res.msg}!`,
                [
                    {text: '确定', onPress: () =>  console.log("success"), style: 'cancel'},
                ],
                {cancelable: false}
            )
        }
    } catch (err) {
        dispatch({ type: actionTypes.accidentEditorType.update_Accident_error, payload: { errorMsg: err } })
         //Toast.show({text:`修改失败:${err}!`})
        Alert.alert(
            '',
            `修改失败:${err}!`,
            [
                {text: '确定', onPress: () =>  console.log("success"), style: 'cancel'},
            ],
            {cancelable: false}
        )
    }
}
