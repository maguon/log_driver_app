import httpRequest from '../util/HttpRequest'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getCarInfo = (param) => async (dispatch, getState) => {
    const { car_id } = param
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/carList?${ObjectToUrl({ carId: car_id })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.carInfoForDemageTypes.get_CarInfoForDemage_success, payload: { carInfo: res.result[0] } })
        } else {
            dispatch({ type: actionTypes.carInfoForDemageTypes.get_CarInfoForDemage_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.carInfoForDemageTypes.get_CarInfoForDemage_error, payload: { failedMsg: res.msg } })
    }
}

export const getCarInfoWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.carInfoForDemageTypes.get_CarInfoForDemage_waiting, payload: {} })
}