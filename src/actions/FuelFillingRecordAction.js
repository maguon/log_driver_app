import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getFuelFillingRecord = (param) => async (dispatch) => {
    try {
        const getDriverUrl = `${base_host}/user/${param.getDriverId.requiredParam.userId}`
        const getDriverRes = await httpRequest.get(getDriverUrl)
        if (getDriverRes.success) {
            param.getFuelFillingRecord.OptionalParam.driveId = getDriverRes.result[0].drive_id
            const urls = [`${base_host}/driveRefuel?${ObjectToUrl(param.getFuelFillingRecord.OptionalParam)}&start=${param.start}&size=${param.size}`,
            `${base_host}/refuelVolumeMoneyTotal?${ObjectToUrl(param.getFuelFillingRecord.OptionalParam)}`]
            const res = await Promise.all(urls.map((url) => httpRequest.get(url)))
            if (res[0].success && res[1].success) {
                dispatch({
                    type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_SUCCESS, payload: {
                        data: {
                            fuelFillingRecordList: res[0].result,
                            total: {
                                refuelDateStart: param.getFuelFillingRecord.OptionalParam.refuelDateStart,
                                refuelDateEnd: param.getFuelFillingRecord.OptionalParam.refuelDateEnd,
                                ...res[1].result[0]
                            }
                        }
                    }
                })
            } else {
                dispatch({ type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_FAILED, payload: { data: `${!res[0].success ? res[0].msg : ''}${!res[1].success ? res[1].msg : ''}` } })
            }
        } else {
            dispatch({ type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_FAILED, payload: { data: getDriverRes.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_ERROR, payload: { data: err } })
    }
}

export const setGetFuelFillingRecordWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_WAITING, payload: {} })
}

export const getFuelFillingRecordMore = (param) => async (dispatch) => {
    dispatch({ type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_More_WAITING, payload: {} })
    try {
        const getDriverUrl = `${base_host}/user/${param.getDriverId.requiredParam.userId}`
        const getDriverRes = await httpRequest.get(getDriverUrl)
        if (getDriverRes.success) {
            param.getFuelFillingRecord.OptionalParam.driveId = getDriverRes.result[0].drive_id
            const url = `${base_host}/driveRefuel?${ObjectToUrl(param.getFuelFillingRecord.OptionalParam)}&start=${param.start}&size=${param.size}`
            const res = await httpRequest.get(url)
            if (res.success) {
                dispatch({
                    type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_More_SUCCESS, payload: {
                        data: {
                            fuelFillingRecordList: res.result
                        }
                    }
                })
            } else {
                dispatch({ type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_More_FAILED, payload: { data: res.msg } })
            }
        } else {
            dispatch({ type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_More_FAILED, payload: { data: getDriverRes.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_More_ERROR, payload: { data: err } })
    }
}

export const setGetFuelFillingRecordMoreWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_More_WAITING, payload: {} })
}

export const changeSearchField = (param) => (dispatch) => {
    dispatch({ type: actionTypes.fuelFillingRecordTypes.CHANGE_FuelFillingSearchField, payload: { data: param } })
}