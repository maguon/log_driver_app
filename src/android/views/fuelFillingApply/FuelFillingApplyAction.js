import httpRequest from '../../../util/HttpRequest.js'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl, objectExceptNull } from '../../../util/ObjectToUrl'

export const createFuelFillingApply = (param) => async (dispatch, getState) => {
    try {
        console.log('param', param)
        // const getDriverUrl = `${base_host}/user/${param.requiredParam.userId}`
        // const getDriverRes = await httpRequest.get(getDriverUrl)
        // if (getDriverRes.success) {
        const { loginReducer: { data: { user: { drive_id, uid } } } } = getState()
        const getTruckUrl = `${base_host}/truckFirst?${ObjectToUrl({ driveId: drive_id })}`
        console.log('getTruckUrl', getTruckUrl)
        const getTruckRes = await httpRequest.get(getTruckUrl)
        console.log('getTruckRes', getTruckRes)
        if (getTruckRes.success) {
            if (getTruckRes.result.length == 0) {
                dispatch({ type: actionTypes.fuelFillingApplyTypes.CREATE_FuelFilling_FAILED, payload: { data: '未绑定车头！' } })
            } else {
                const url = `${base_host}/user/${uid}/driveRefuel`
                console.log('url', url)
                param.postParam.driveId = getDriverRes.result[0].drive_id
                param.postParam.truckId = getTruckRes.result[0].id
                const res = await httpRequest.post(url, param.postParam)
                if (res.success) {
                    dispatch({ type: actionTypes.fuelFillingApplyTypes.CREATE_FuelFilling_SUCCESS, payload: { data: {} } })
                } else {
                    dispatch({ type: actionTypes.fuelFillingApplyTypes.CREATE_FuelFilling_FAILED, payload: { data: res.msg } })
                }
            }
        } else {
            dispatch({ type: actionTypes.fuelFillingApplyTypes.CREATE_FuelFilling_FAILED, payload: { data: getTruckRes.msg } })
        }
        // } else {
        //     dispatch({ type: actionTypes.fuelFillingApplyTypes.CREATE_FuelFilling_FAILED, payload: { data: getDriverRes.msg } })
        // }
    } catch (err) {
        dispatch({ type: actionTypes.fuelFillingApplyTypes.CREATE_FuelFilling_ERROR, payload: { data: err } })
    }
}

// export const resetCreateFuelFillingApply = () => (dispatch) => {
//     dispatch({ type: actionTypes.fuelFillingApplyTypes.RESET_CREATE_FuelFilling, payload: { data: {} } })
// }