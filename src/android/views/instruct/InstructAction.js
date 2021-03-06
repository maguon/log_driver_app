import httpRequest from '../../../util/HttpRequest.js'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import moment from 'moment'

export const getRouteTaskList = (param) => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
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

export const setGetRouteTaskListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.instructTypes.GET_RouteTaskList_WAITING, payload: {} })
}
