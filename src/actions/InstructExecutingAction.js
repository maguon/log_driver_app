import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const changeLoadTaskStatus = (param) => async (dispatch) => {
   
    try {
        const url = `${base_host}/user/${param.requiredParam.userId}/dpRouteTask/${param.requiredParam.taskId}/taskStatus/${param.requiredParam.taskStatus}`
        console.log('url',url)
        const res = await httpRequest.put(url, {})
        console.log('res',res)
        
        if (res.success) {
            dispatch({ type: actionTypes.instructExecutingTypes.Change_LoadTaskStatus_SUCCESS, payload: { data: param.requiredParam.taskStatus } })
        } else {
            dispatch({ type: actionTypes.instructExecutingTypes.Change_LoadTaskStatus_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.instructExecutingTypes.Change_LoadTaskStatus_ERROR, payload: { data: err } })
    }
}

export const setChangeLoadTaskStatusWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.instructExecutingTypes.Change_LoadTaskStatus_WAITING, payload: {} })
}

export const setTaskInfo = (param) => (dispatch) => {
    dispatch({ type: actionTypes.instructExecutingTypes.SET_TaskInfo, payload: { data: param } })
}


export const getLoadTaskList = (param) => async (dispatch) => {
    
    try {
        const url = `${base_host}/dpRouteLoadTask?${ObjectToUrl(param.OptionalParam)}`
        console.log('url',url)
        
        const res = await httpRequest.get(url)
        console.log('res',res)
        
        if (res.success) {
            dispatch({ type: actionTypes.instructExecutingTypes.GET_LoadTaskList_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.instructExecutingTypes.GET_LoadTaskList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.instructExecutingTypes.GET_LoadTaskList_ERROR, payload: { data: err } })
    }
}

export const setGetLoadTaskListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.instructExecutingTypes.GET_LoadTaskList_WAITING, payload: {} })
}

