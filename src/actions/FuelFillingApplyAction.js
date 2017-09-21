import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const createFuelFillingApply = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/driveRefuel`
    try {
        let res = await httpRequest.post(url, param.postParam)
        if (res.success) {
            dispatch({ type: actionTypes.fuelFillingApplyTypes.CREATE_FuelFilling_SUCCESS, payload: { data: {} } })
        } else {
            dispatch({ type: actionTypes.fuelFillingApplyTypes.CREATE_FuelFilling_FAILED, payload: { data: {} } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.fuelFillingApplyTypes.CREATE_FuelFilling_ERROR, payload: { data: err } })
    }
}

export const resetCreateFuelFillingApply = () => (dispatch) => {
    dispatch({ type: actionTypes.fuelFillingApplyTypes.RESET_CREATE_FuelFilling, payload: { data: {} } })
}