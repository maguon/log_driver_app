import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getCityRouteList = (param) =>async (dispatch) => {
    const url = `${base_host}/dpDemand`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.cityRouteListTypes.GET_CityRouteList_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.cityRouteListTypes.GET_CityRouteList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.cityRouteListTypes.GET_CityRouteList_ERROR, payload: { data: err } })
    }
}