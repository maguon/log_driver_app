import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getMileageInfo = (param) => async (dispatch) => {
    try {
        const getDriverUrl = `${base_host}/user/${param.getDriverId.requiredParam.userId}`
        const getDriverRes = await httpRequest.get(getDriverUrl)
        if (getDriverRes.success) {
            const getTruckUrl = `${base_host}/truckFirst?${ObjectToUrl({ driveId: getDriverRes.result[0].drive_id })}`
            const getTruckRes = await httpRequest.get(getTruckUrl)
            if (getTruckRes.success) {
                if (getTruckRes.result.length == 0) {
                    dispatch({ type: actionTypes.homeTypes.GET_HomeMileageInfo_Unbind, payload: {} })
                } else {
                    param.mileageInfoParam.OptionalParam.driveId = getDriverRes.result[0].drive_id
                    param.taskListParam.OptionalParam.driveId = getDriverRes.result[0].drive_id
                    param.truckDispatchParam.OptionalParam.truckId = getTruckRes.result[0].id
                    const urls = [`${base_host}/driveDistanceCount?${ObjectToUrl(param.mileageInfoParam.OptionalParam)}`,
                    `${base_host}/dpRouteTask?${ObjectToUrl(param.taskListParam.OptionalParam)}`,
                    `${base_host}/truckDispatch?${ObjectToUrl(param.truckDispatchParam.OptionalParam)}`]
                    const res = await Promise.all(urls.map((url) => httpRequest.get(url)))
                    if (res[0].success && res[1].success && res[2].success) {
                        dispatch({
                            type: actionTypes.homeTypes.GET_HomeMileageInfo_SUCCESS, payload: {
                                data: {
                                    mileageInfo: res[0].result.length > 0 ? res[0].result[0] : {
                                        load_distance: null,
                                        no_load_distance: null,
                                        distanceCount: null
                                    },
                                    taskList: res[1].result,
                                    truckDispatch: res[2].result[0]?res[2].result[0]:{}
                                }
                            }
                        })
                    } else {
                        dispatch({
                            type: actionTypes.homeTypes.GET_HomeMileageInfo_FAILED,
                            payload: {
                                data: `${res[0].msg ? res[0].msg : ''}${res[1].msg ? res[1].msg : ''}${res[2].msg ? res[2].msg : ''}`
                            }
                        })
                    }
                }
            } else {
                dispatch({ type: actionTypes.homeTypes.GET_HomeMileageInfo_FAILED, payload: { data: getTruckRes.msg } })
            }
        } else {
            dispatch({ type: actionTypes.homeTypes.GET_HomeMileageInfo_FAILED, payload: { data: getDriverRes.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.homeTypes.GET_HomeMileageInfo_ERROR, payload: { data: err } })
    }
}

export const setGetMileageInfoWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.homeTypes.GET_HomeMileageInfo_WAITING, payload: {} })
}

export const changeTaskStatus = (param) => async (dispatch) => {
    const url = `${base_host}/user/${param.requiredParam.userId}/dpRouteTask/${param.requiredParam.taskId}/taskStatus/${param.requiredParam.taskStatus}`
    try {
        let res = await httpRequest.put(url, {})
        if (res.success) {
            dispatch({ type: actionTypes.homeTypes.Change_HomeTaskStatus_SUCCESS, payload: { data: { taskId: param.requiredParam.taskId, taskStatus: param.requiredParam.taskStatus } } })
        } else {
            dispatch({ type: actionTypes.homeTypes.Change_HomeTaskStatus_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.homeTypes.Change_HomeTaskStatus_ERROR, payload: { data: err } })
    }
}

export const setChangeTaskStatusWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.homeTypes.Change_HomeTaskStatus_WAITING, payload: {} })
}

export const resetChangeTaskStatus = () => (dispatch) => {
    dispatch({ type: actionTypes.homeTypes.RESET_Change_HomeTaskStatus, payload: {} })
}
