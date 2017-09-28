import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getRouteLoadTaskList = (param) => async (dispatch) => {
    const url = `${base_host}/dpRouteLoadTask/${param.requiredParam.dpRouteLoadTaskId}/dpRouteLoadTaskDetail`
    console.log('url', url)
    try {
        let res = await httpRequest.get(url)
        console.log('res', res)

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

export const changeCarExceptionRel = (param) => (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/carExceptionRel`
    //Json传carId
    console.log('url', url)
    try {
        let res = await httpRequest.post(url, param.postParam)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.branchInstructExecutingTypes.Change_CarExceptionRel_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.branchInstructExecutingTypes.Change_CarExceptionRel_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.branchInstructExecutingTypes.Change_CarExceptionRel_ERROR, payload: { data: err } })
    }
}

export const setChangeCarExceptionRelWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.branchInstructExecutingTypes.Change_CarExceptionRel_WAITING, payload: {} })
}

export const resetChangeCarExceptionRel = () => (dispatch) => {
    dispatch({ type: actionTypes.branchInstructExecutingTypes.RESET_Change_CarExceptionRel, payload: {} })
}

export const changeLoadTaskStatus = (param) => (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/dpRouteLoadTask/${param.requiredParam.dpRouteLoadTaskId}/loadTaskStatus/${param.requiredParam.loadTaskStatus}`
    console.log('url', url)
    try {
        let res = await httpRequest.put(url, param.putParam)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.branchInstructExecutingTypes.Change_ExecutingLoadTaskStatus_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.branchInstructExecutingTypes.Change_ExecutingLoadTaskStatus_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.branchInstructExecutingTypes.Change_ExecutingLoadTaskStatus_ERROR, payload: { data: err } })
    }
}

export const setChangeLoadTaskStatusWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.branchInstructExecutingTypes.Change_ExecutingLoadTaskStatus_WAITING, payload: {} })
}

export const resetChangeLoadTaskStatus = () => (dispatch) => {
    dispatch({ type: actionTypes.branchInstructExecutingTypes.RESET_Change_ExecutingLoadTaskStatus, payload: {} })
}

export const changeCarLoadStatus = (param) => (dispatch) => {
    const url = `${base_host}/userId/${param.requiredParam.userId}/dpRouteTaskDetail/${param.requiredParam.dpRouteTaskDetailId}/carLoadStatus/${param.requiredParam.carLoadStatus}`
    //Json传truckId
    console.log('url', url)
    try {
        let res = await httpRequest.put(url, param.putParam)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.branchInstructExecutingTypes.Change_CarLoadStatus_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.branchInstructExecutingTypes.Change_CarLoadStatus_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.branchInstructExecutingTypes.Change_CarLoadStatus_ERROR, payload: { data: err } })
    }
}

export const setChangeCarLoadStatusWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.branchInstructExecutingTypes.Change_CarLoadStatus_WAITING, payload: {} })
}

export const resetChangeCarLoadStatus = () => (dispatch) => {
    dispatch({ type: actionTypes.branchInstructExecutingTypes.RESET_Change_CarLoadStatus, payload: {} })
}


