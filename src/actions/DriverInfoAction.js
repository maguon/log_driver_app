import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getDriverInfo = (param) => async (dispatch) => {
    const url = `${base_host}/drive?${ObjectToUrl(param.OptionalParam)}`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.driverInfoTypes.GET_DriverInfo_SUCCESS, payload: { data: res.result[0] } })
        } else {
            dispatch({ type: actionTypes.driverInfoTypes.GET_DriverInfo_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverInfoTypes.GET_DriverInfo_ERROR, payload: { data: err } })
    }
}

export const setGetDriverInfoWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.driverInfoTypes.GET_DriverInfo_WAITING, payload: {} })
}

export const getDriverRecord = (param) => async (dispatch) => {
    const url = `${record_host}/user/${param.requiredParam.userId}/tuser/${param.requiredParam.driverId}/record`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.driverInfoTypes.GET_DriverRecord_SUCCESS, payload: { data: res.result[0].comments } })
        } else {
            dispatch({ type: actionTypes.driverInfoTypes.GET_DriverRecord_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverInfoTypes.GET_DriverRecord_ERROR, payload: { data: err } })
    }
}

export const setGetDriverRecordWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.driverInfoTypes.GET_DriverRecord_WAITING, payload: {} })
}

export const getDriverImage = (param) => async (dispatch) => {
    const url = `${base_host}/drive?${ObjectToUrl(param.OptionalParam)}`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.driverInfoTypes.GET_DriverImage_SUCCESS, payload: { data: { driverInfo: res.result[0] } } })
        } else {
            dispatch({ type: actionTypes.driverInfoTypes.GET_DriverImage_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverInfoTypes.GET_DriverImage_ERROR, payload: { data: err } })
    }
}

export const setGetDriverImageWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.driverInfoTypes.GET_DriverImage_WAITING, payload: {} })
}

const sum = (field1, field2) => field1 + field2

const field = (field1) => (field2) => sum(field1, field2)

field(1)(2)


