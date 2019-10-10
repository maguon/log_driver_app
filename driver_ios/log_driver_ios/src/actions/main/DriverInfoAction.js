import httpRequest from '../../util/HttpRequest.js'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'

export const getDriverInfo = (param) => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { drive_id } } },communicationSettingReducer:{data:{base_host}} } = getState()
        param.getDriverInfo = {
            OptionalParam: {
                driveId: drive_id
            }
        }
        const url = `${base_host}/drive?${ObjectToUrl(param.getDriverInfo.OptionalParam)}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.driverInfoActionType.GET_DriverInfo_SUCCESS, payload: { data: res.result[0] } })
        } else {
            dispatch({ type: actionTypes.driverInfoActionType.GET_DriverInfo_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverInfoActionType.GET_DriverInfo_ERROR, payload: { data: err } })
    }
}

export const setGetDriverInfoWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.driverInfoActionType.GET_DriverInfo_WAITING, payload: {} })
}

export const getDriverRecord = () => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { drive_id, uid } }},communicationSettingReducer:{data:{record_host }} } = getState()
        const url = `${record_host}/user/${uid}/tuser/${drive_id}/record`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.driverInfoActionType.GET_DriverRecord_SUCCESS, payload: { data: res.result[0].comments } })
        } else {
            dispatch({ type: actionTypes.driverInfoActionType.GET_DriverRecord_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverInfoActionType.GET_DriverRecord_ERROR, payload: { data: err } })
    }
}

export const setGetDriverRecordWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.driverInfoActionType.GET_DriverRecord_WAITING, payload: {} })
}

export const getDriverImage = (param) => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { drive_id } }},communicationSettingReducer:{data:{base_host} } } = getState()
        param.getDriverImage = {
            OptionalParam: {
                driveId: drive_id
            }
        }
        const url = `${base_host}/drive?${ObjectToUrl(param.getDriverImage.OptionalParam)}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.driverInfoActionType.GET_DriverImage_SUCCESS, payload: { data: { driverInfo: res.result[0] } } })
        } else {
            dispatch({ type: actionTypes.driverInfoActionType.GET_DriverImage_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.driverInfoActionType.GET_DriverImage_ERROR, payload: { data: err } })
    }
}

export const setGetDriverImageWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.driverInfoActionType.GET_DriverImage_WAITING, payload: {} })
}


