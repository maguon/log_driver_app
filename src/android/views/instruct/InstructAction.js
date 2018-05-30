import httpRequest from '../../../util/HttpRequest.js'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import moment from 'moment'

export const getRouteTaskList = (param) => async (dispatch) => {
    try {
        const url = `${base_host}/dpRouteLoadTask?${ObjectToUrl(param.OptionalParam)}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.instructTypes.GET_RouteTaskList_SUCCESS, payload: { data: res.result } })

        } else {
            dispatch({ type: actionTypes.instructTypes.GET_RouteTaskList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.instructTypes.GET_RouteTaskList_ERROR, payload: { data: err } })
    }
}

export const setGetRouteTaskListWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.instructTypes.GET_RouteTaskList_WAITING, payload: {} })
}
