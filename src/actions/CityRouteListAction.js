import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getCityRouteList = (param) => async (dispatch) => {
    console.log('param', param)
    try {
        const getDriverUrl = `${base_host}/user/${param.getDriverId.userId}`
        console.log('getDriverUrl', getDriverUrl)
        const getDriverRes = await httpRequest.get(getDriverUrl)
        console.log('getDriverRes', getDriverRes)
        if (getDriverRes.success) {
            const getTruckUrl = `${base_host}/truckFirst?${ObjectToUrl({ driveId: getDriverRes.result[0].drive_id })}`
            console.log('getTruckUrl', getTruckUrl)
            const getTruckRes = await httpRequest.get(getTruckUrl)
            console.log('getTruckRes', getTruckRes)
            if (getTruckRes.success) {
                if (getTruckRes.result.length == 0) {
                    dispatch({ type: actionTypes.cityRouteListTypes.GET_CityRouteList_Unbind, payload: {} })
                } else {
                    const url = `${base_host}/dpRouteTask?${ObjectToUrl({ truckId: getTruckRes.result[0].id, driveId: getDriverRes.result[0].drive_id })}`
                    console.log('url',url)
                    const res = await httpRequest.get(url)
                    console.log('res',res)
                    if (res.success) {
                        dispatch({ type: actionTypes.cityRouteListTypes.GET_CityRouteList_SUCCESS, payload: { data: res.result } })
                    } else {
                        dispatch({ type: actionTypes.cityRouteListTypes.GET_CityRouteList_FAILED, payload: { data: res.msg } })
                    }
                }
            } else {
                dispatch({ type: actionTypes.cityRouteListTypes.GET_CityRouteList_FAILED, payload: { data: getTruckRes.msg } })
            }
        } else {
            dispatch({ type: actionTypes.cityRouteListTypes.GET_CityRouteList_FAILED, payload: { data: getDriverRes.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.cityRouteListTypes.GET_CityRouteList_ERROR, payload: { data: err } })
    }
}