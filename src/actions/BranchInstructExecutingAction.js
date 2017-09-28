import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getRouteLoadTaskList = (param) => async (dispatch) => {
    const url = `${base_host}/dpRouteLoadTask/${param.requiredParam.dpRouteLoadTaskId}/dpRouteLoadTaskDetail`
    console.log('url',url)
    try {
        let res = await httpRequest.get(url)
    console.log('res',res)
        
        if (res.success) {
            dispatch({ type: actionTypes.branchInstructExecutingTypes.GET_RouteLoadTaskListExecuting_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.branchInstructExecutingTypes.GET_RouteLoadTaskListExecuting_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.branchInstructExecutingTypes.GET_RouteLoadTaskListExecuting_ERROR, payload: { data: err } })
    }
}

export const setGetRouteLoadTaskListWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.branchInstructExecutingTypes.GET_RouteLoadTaskListExecuting_WAITING, payload: {} })
}