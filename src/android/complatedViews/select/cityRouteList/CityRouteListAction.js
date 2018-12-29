import httpRequest from '../../../../util/HttpRequest.js'
import * as actionTypes from '../../../../actionTypes/index'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'

export const getCityRouteList = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const { loginReducer: { data: { user: { drive_id } } } } = getState()
        const getTruckUrl = `${base_host}/truckFirst?${ObjectToUrl({ driveId: drive_id })}`
        const getTruckRes = await httpRequest.get(getTruckUrl)
        if (getTruckRes.success) {
            if (getTruckRes.result.length == 0) {
                dispatch({ type: actionTypes.cityRouteListTypes.GET_CityRouteList_Unbind, payload: {} })
            } else {
                const url = `${base_host}/dpRouteTask?${ObjectToUrl({ truckId: getTruckRes.result[0].id, driveId: drive_id })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    dispatch({ type: actionTypes.cityRouteListTypes.GET_CityRouteList_SUCCESS, payload: { data: res.result } })
                } else {
                    dispatch({ type: actionTypes.cityRouteListTypes.GET_CityRouteList_FAILED, payload: { data: res.msg } })
                }
            }
        } else {
            dispatch({ type: actionTypes.cityRouteListTypes.GET_CityRouteList_FAILED, payload: { data: getTruckRes.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.cityRouteListTypes.GET_CityRouteList_ERROR, payload: { data: err } })
    }
}


export const getCityRouteListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.cityRouteListTypes.GET_CityRouteList_WAITING, payload: {} })
}