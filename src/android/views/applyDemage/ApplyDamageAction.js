import httpRequest from '../../../util/HttpRequest'
import { base_host, file_host, record_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { objectExceptNull } from '../../../util/util'
import { getFormValues } from 'redux-form'
import { ToastAndroid, InteractionManager } from 'react-native'
import * as routerDirection from '../../../util/RouterDirection'
import { Actions } from 'react-native-router-flux'

export const createDamage = (parent, values) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.applyDamageTypes.create_Damage_waiting, payload: {} })
    const { userReducer: { data: { user: { userId } } } } = getState()
    const { car, driver, damageExplain } = values
    try {
        const url = `${base_host}/user/${userId}/damage`
        const res = await httpRequest.post(url, objectExceptNull({
            carId: car.id,
            vin: car.value,
            truckId: driver.truck_id,
            truckNum: driver.truck_num,
            driveId: driver.id,
            driveName: driver.value,
            damageExplain
        }))
        if (res.success) {
            ToastAndroid.showWithGravity('提交成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.applyDamageTypes.create_Damage_success, payload: { damageId: res.id } })
            Actions.applyDemageImage({vin:car.value})
        } else {
            ToastAndroid.showWithGravity(`提交失败！${res.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.applyDamageTypes.create_Damage_failed, payload: { failedMsg: res.msg } })
        }
    }
    catch (err) {
        ToastAndroid.showWithGravity(`提交失败！${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        dispatch({ type: actionTypes.applyDamageTypes.create_Damage_error, payload: { errorMsg: err } })
    }
}