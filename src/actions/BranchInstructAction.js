import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getRouteLoadTaskList = (param) => async (dispatch) => {
    const urls = [`${base_host}/dpRouteLoadTask/${param.requiredParam.dpRouteLoadTaskId}/dpRouteLoadTaskDetail`, `${base_host}/receive?${ObjectToUrl(param.OptionalParam)}`]
    try {
        const res = await Promise.all(urls.map((url) => httpRequest.get(url)))
        //console.log('res',res)
        if (res[0].success && res[1].success) {
            dispatch({
                type: actionTypes.branchInstructTypes.GET_RouteLoadTaskList_SUCCESS,
                payload: {
                    data: {
                        routeLoadTaskList: res[0].result,
                        coordinate: {
                            lng: res[1].result[0].lng,
                            lat: res[1].result[0].lat
                        }
                    }
                }
            })
        } else {
            dispatch({ type: actionTypes.branchInstructTypes.GET_RouteLoadTaskList_FAILED, payload: { data: `${res[0].msg ? res[0].msg : ''}${res[1].msg ? res[1].msg : ''}` } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.branchInstructTypes.GET_RouteLoadTaskList_ERROR, payload: { data: err } })
    }
}

export const setGetRouteLoadTaskListWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.branchInstructTypes.GET_RouteLoadTaskList_WAITING, payload: {} })
}