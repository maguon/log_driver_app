import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getFuelFillingRecord = (param) => async (dispatch) => {
    const urls = [`${base_host}/driveRefuel?${ObjectToUrl(param.OptionalParam)}&start=${param.start}&size=${param.size}`, `${base_host}/refuelVolumeMoneyTotal?${ObjectToUrl(param.OptionalParam)}`]
    try {
        let res = await Promise.all(urls.map((url) => httpRequest.get(url)))
        if (res[0].success && res[1].success) {
            dispatch({
                type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_SUCCESS, payload: {
                    data: {
                        fuelFillingRecordList: res[0].result,
                        total: {
                            refuelDateStart: param.OptionalParam.refuelDateStart,
                            refuelDateEnd: param.OptionalParam.refuelDateEnd,
                            ...res[1].result[0]
                        }
                    }
                }
            })
        } else {
            dispatch({ type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_FAILED, payload: { data: `${!res[0].success ? res[0].msg : ''}${!res[1].success ? res[1].msg : ''}` } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_ERROR, payload: { data: err } })
    }
}

export const setGetFuelFillingRecordWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_WAITING, payload: {} })
}

export const getFuelFillingRecordMore = (param) => async (dispatch) => {
    console.log('param',param)
    const url = `${base_host}/driveRefuel?${ObjectToUrl(param.OptionalParam)}&start=${param.start}&size=${param.size}`
    console.log('url',url)
    dispatch({ type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_More_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
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