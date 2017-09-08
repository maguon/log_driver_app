import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getTruckInfo = (param) => async (dispatch) => {
    const url = `${base_host}/truckFirst?${ObjectToUrl(param.OptionalParam)}`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_SUCCESS, payload: { data: res.result[0] } })
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_ERROR, payload: { data: err } })
    }
}

export const resetGetTruckInfo = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_GET_TruckInfo, payload: {} })
}

export const setGetTruckInfoWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_WAITING, payload: {} })
}

export const getTruckRecord = (param) => async (dispatch) => {
    const url = `${record_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckNum}/record`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRecord_SUCCESS, payload: { data: res.result[0].comments } })
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRecord_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRecord_ERROR, payload: { data: err } })
    }
}

export const resetGetTruckRecord = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_GET_TruckRecord, payload: {} })
}

export const setGetTruckRecordWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRecord_WAITING, payload: {} })
}

export const getTruckInsurance = (param) => async (dispatch) => {
    const url = `${base_host}/truckInsureRel?${ObjectToUrl(param.OptionalParam)}`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInsurance_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInsurance_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInsurance_ERROR, payload: { data: err } })
    }
}

export const resetGetTruckInsurance = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.RESET_GET_TruckInsurance, payload: {} })
}

export const setGetTruckInsuranceWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInsurance_WAITING, payload: {} })
}