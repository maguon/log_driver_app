import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getDriverInfo = (param) => async (dispatch) => {
    try {
        const getDriverUrl = `${base_host}/user/${param.getDriverId.requiredParam.userId}`
        const getDriverRes = await httpRequest.get(getDriverUrl)
        if (getDriverRes.success) {
            param.getDriverInfo = {
                OptionalParam: {
                    driveId: getDriverRes.result[0].drive_id
                }
            }
            const url = `${base_host}/drive?${ObjectToUrl(param.getDriverInfo.OptionalParam)}`
            const res = await httpRequest.get(url)
            if (res.success) {
                dispatch({ type: actionTypes.driverInfoTypes.GET_DriverInfo_SUCCESS, payload: { data: res.result[0] } })
            } else {
                dispatch({ type: actionTypes.driverInfoTypes.GET_DriverInfo_FAILED, payload: { data: res.msg } })
            }
        } else {
            dispatch({ type: actionTypes.driverInfoTypes.GET_DriverInfo_FAILED, payload: { data: getDriverRes.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverInfoTypes.GET_DriverInfo_ERROR, payload: { data: err } })
    }
}

export const setGetDriverInfoWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.driverInfoTypes.GET_DriverInfo_WAITING, payload: {} })
}

export const getDriverRecord = (param) => async (dispatch) => {
    try {
        const getDriverUrl = `${base_host}/user/${param.getDriverId.requiredParam.userId}`
        const getDriverRes = await httpRequest.get(getDriverUrl)
        if (getDriverRes.success) {
            const url = `${record_host}/user/${param.getDriverId.requiredParam.userId}/tuser/${getDriverRes.result[0].drive_id}/record`
            const res = await httpRequest.get(url)
            if (res.success) {
                dispatch({ type: actionTypes.driverInfoTypes.GET_DriverRecord_SUCCESS, payload: { data: res.result[0].comments } })
            } else {
                dispatch({ type: actionTypes.driverInfoTypes.GET_DriverRecord_FAILED, payload: { data: res.msg } })
            }
        } else {
            dispatch({ type: actionTypes.driverInfoTypes.GET_DriverRecord_FAILED, payload: { data: getDriverRes.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverInfoTypes.GET_DriverRecord_ERROR, payload: { data: err } })
    }
}

export const setGetDriverRecordWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.driverInfoTypes.GET_DriverRecord_WAITING, payload: {} })
}

export const getDriverImage = (param) => async (dispatch) => {
    try {
        const getDriverUrl = `${base_host}/user/${param.getDriverId.requiredParam.userId}`
        const getDriverRes = await httpRequest.get(getDriverUrl)
        if (getDriverRes.success) {
            param.getDriverImage = {
                OptionalParam: {
                    driveId: getDriverRes.result[0].drive_id
                }
            }
            const url = `${base_host}/drive?${ObjectToUrl(param.getDriverImage.OptionalParam)}`
            const res = await httpRequest.get(url)
            if (res.success) {
                dispatch({ type: actionTypes.driverInfoTypes.GET_DriverImage_SUCCESS, payload: { data: { driverInfo: res.result[0] } } })
            } else {
                dispatch({ type: actionTypes.driverInfoTypes.GET_DriverImage_FAILED, payload: { data: res.msg } })
            }
        } else {
            dispatch({ type: actionTypes.driverInfoTypes.GET_DriverInfo_FAILED, payload: { data: getDriverRes.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverInfoTypes.GET_DriverImage_ERROR, payload: { data: err } })
    }
}

export const setGetDriverImageWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.driverInfoTypes.GET_DriverImage_WAITING, payload: {} })
}


