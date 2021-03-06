import httpRequest from '../../util/HttpRequest.js'

import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl, objectExceptNull } from '../../util/ObjectToUrl'
import * as actions from '../../actions/index'
import { Actions } from 'react-native-router-flux'
import {Alert, InteractionManager} from 'react-native'
import {Toast} from 'native-base'

export const createFuelFillingApply = (param) => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { drive_id, uid } }},communicationSettingReducer:{data:{ base_host}} } = getState()
        const getTruckUrl = `${base_host}/truckFirst?${ObjectToUrl({ driveId: drive_id })}`
        // console.log('getTruckUrl', getTruckUrl)

        const getTruckRes = await httpRequest.get(getTruckUrl)


        if (getTruckRes.success) {
            if (getTruckRes.result.length == 0) {
                dispatch({ type: actionTypes.fuelFillingApplyActionType.CREATE_FuelFilling_FAILED, payload: { data: '未绑定车头！' } })
            } else {
                const url = `${base_host}/user/${uid}/driveRefuel`
                // console.log('url', url)
                const res = await httpRequest.post(url, objectExceptNull({
                    driveId: drive_id,
                    truckId: getTruckRes.result[0].id,
                    refuelDate: `${param.refuelDate} ${param.refuelTime}`,
                    refuelVolume: param.refuelVolume,
                    dpRouteTaskId: param.dpRouteTask && param.dpRouteTask.id ? param.dpRouteTask.id : null,
                    refuelAddressType: param.refuelAddressType.id,
                    refuelAddress: param.refuelAddress && param.refuelAddress.address ? param.refuelAddress.address : null,
                    lng: param.refuelAddress && param.refuelAddress.item ? param.refuelAddress.item.longitude : null,
                    lat: param.refuelAddress && param.refuelAddress.item ? param.refuelAddress.item.latitude : null,
                    refuelMoney: param.refuelMoney
                }))
                // console.log('res', res)
                if (res.success) {
                     //Toast.show({text:'加油申请提交成功！'})
                    dispatch({ type: actionTypes.fuelFillingApplyActionType.CREATE_FuelFilling_SUCCESS, payload: { data: {} } })
                    InteractionManager.runAfterInteractions(() => dispatch(actions.fuelFillingRecordAction.getFuelFillingRecord()))
                    Alert.alert(
                        '',
                        '修改成功！',
                        [
                            {text: '确定', onPress: () =>  Actions.pop(), style: 'cancel'},
                        ],
                        {cancelable: false}
                    )
                } else {
                    //Toast.show({text:`加油申请提交失败：${res.msg}！`})
                    dispatch({ type: actionTypes.fuelFillingApplyActionType.CREATE_FuelFilling_FAILED, payload: { data: res.msg } })
                    Alert.alert(
                        '',
                        `加油申请提交失败：${res.msg}！`,
                        [
                            {text: '确定', onPress: () =>  console.log("success"), style: 'cancel'},
                        ],
                        {cancelable: false}
                    )
                }
            }
        } else {
            //Toast.show({text:`加油申请提交失败：${getTruckRes.msg}！`})
            dispatch({ type: actionTypes.fuelFillingApplyActionType.CREATE_FuelFilling_FAILED, payload: { data: getTruckRes.msg } })
            Alert.alert(
                '',
                `加油申请提交失败：${getTruckRes.msg}！`,
                [
                    {text: '确定', onPress: () =>  console.log("success"), style: 'cancel'},
                ],
                {cancelable: false}
            )
        }
    } catch (err) {

        //Toast.show({text:`加油申请提交失败：${err}！`})
        // console.log('err', err)
        dispatch({ type: actionTypes.fuelFillingApplyActionType.CREATE_FuelFilling_ERROR, payload: { data: err } })
        Alert.alert(
            '',
            `加油申请提交失败：${err}！`,
            [
                {text: '确定', onPress: () =>  console.log("success"), style: 'cancel'},
            ],
            {cancelable: false}
        )
    }
}
