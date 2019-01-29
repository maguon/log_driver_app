import httpRequest from '../../../util/HttpRequest.js'

import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl, objectExceptNull } from '../../../util/ObjectToUrl'
import * as fuelFillingRecordAction from '../fuelFillingRecord/FuelFillingRecordAction'
import { Actions } from 'react-native-router-flux'
import { InteractionManager, ToastAndroid } from 'react-native'

export const createFuelFillingApply = (param) => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        // console.log('base_host', base_host)
        const { loginReducer: { data: { user: { drive_id, uid } } } } = getState()
        const getTruckUrl = `${base_host}/truckFirst?${ObjectToUrl({ driveId: drive_id })}`
        // console.log('getTruckUrl', getTruckUrl)

        const getTruckRes = await httpRequest.get(getTruckUrl)
       
        
        if (getTruckRes.success) {
            if (getTruckRes.result.length == 0) {
                dispatch({ type: actionTypes.fuelFillingApplyTypes.CREATE_FuelFilling_FAILED, payload: { data: '未绑定车头！' } })
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
                    ToastAndroid.show('加油申请提交成功！', 10)
                    dispatch({ type: actionTypes.fuelFillingApplyTypes.CREATE_FuelFilling_SUCCESS, payload: { data: {} } })
                    Actions.pop()
                    InteractionManager.runAfterInteractions(() => dispatch(fuelFillingRecordAction.getFuelFillingRecord()))
                } else {
                    ToastAndroid.show(`加油申请提交失败：${res.msg}！`, 10)
                    dispatch({ type: actionTypes.fuelFillingApplyTypes.CREATE_FuelFilling_FAILED, payload: { data: res.msg } })
                }
            }
        } else {
            ToastAndroid.show(`加油申请提交失败：${getTruckRes.msg}！`, 10)
            dispatch({ type: actionTypes.fuelFillingApplyTypes.CREATE_FuelFilling_FAILED, payload: { data: getTruckRes.msg } })
        }
    } catch (err) {
        ToastAndroid.show(`加油申请提交失败：${err}！`, 10)
        // console.log('err', err)
        dispatch({ type: actionTypes.fuelFillingApplyTypes.CREATE_FuelFilling_ERROR, payload: { data: err } })
    }
}
