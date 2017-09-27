import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getRouteLoadTaskList = (param) => async (dispatch) => {
    const url = `${base_host}/dpRouteLoadTask/${param.requiredParam.dpRouteLoadTaskId}/dpRouteLoadTaskDetail`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.branchInstructTypes.GET_RouteLoadTaskList_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.branchInstructTypes.GET_RouteLoadTaskList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.branchInstructTypes.GET_RouteLoadTaskList_ERROR, payload: { data: err } })
    }
}

export const setGetRouteLoadTaskListWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.branchInstructTypes.GET_RouteLoadTaskList_WAITING, payload: {} })
}