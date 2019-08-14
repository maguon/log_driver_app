import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { objectExceptNull } from '../../util/util'
import { Toast } from 'native-base'
import { Actions } from 'react-native-router-flux'

export const createDamage = (parent, values) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.applyDamageType.create_Damage_waiting, payload: {} })
    const { loginReducer: { url: { base_host} } } = getState()
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
            Toast.show({text:'提交成功！'})
            dispatch({ type: actionTypes.applyDamageType.create_Damage_success, payload: { damageId: res.id } })
            Actions.applyDemageImage({vin:car.value})
        } else {
            Toast.show({text:`提交失败！${res.msg}`})
            dispatch({ type: actionTypes.applyDamageType.create_Damage_failed, payload: { failedMsg: res.msg } })
        }
    }
    catch (err) {
        Toast.show({text:`提交失败！${err}`})
        dispatch({ type: actionTypes.applyDamageType.create_Damage_error, payload: { errorMsg: err } })
    }
}
