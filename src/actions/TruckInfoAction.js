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

export const setGetTruckInfoWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_WAITING, payload: {} })
}

export const getTruckRepairList = (param) => async (dispatch) => {
    const url = `${base_host}/truckRepairRel?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRepairRelList_WAITING, payload: {} })
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRepairRelList_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRepairRelList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRepairRelList_ERROR, payload: { data: err } })
    }
    // const url = `${record_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckNum}/record`
    // try {
    //     let res = await httpRequest.get(url)
    //     if (res.success) {
    //         dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRecord_SUCCESS, payload: { data: res.result[0].comments } })
    //     } else {
    //         dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRecord_FAILED, payload: { data: res.msg } })
    //     }
    // } catch (err) {
    //     dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRecord_ERROR, payload: { data: err } })
    // }
}

export const setGetTruckRepairWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRepairRelList_WAITING, payload: {} })
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

export const setGetTruckInsuranceWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInsurance_WAITING, payload: {} })
}

export const getTruckImage = (param) => async (dispatch) => {
    const urls = [`${base_host}/truckFirst?${ObjectToUrl(param.OptionalParam)}`, `${record_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckNum}/record`]
    try {
        let res = await Promise.all(urls.map((url) => httpRequest.get(url)))
        if (res[0].success && res[1].success) {
            dispatch({
                type: actionTypes.truckInfoTypes.GET_TruckImage_SUCCESS, payload: {
                    data: {
                        truckInfo: res[0].result[0],
                        truckImageList: res[1].result[0].images
                    }
                }
            })
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckImage_FAILED, payload: { data: `${res[0].msg ? res[0].msg : ''}${res[1].msg ? res[1].msg : ''}` } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.GET_TruckImage_ERROR, payload: { data: err } })
    }
}

export const setGetTruckImageWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckImage_WAITING, payload: {} })
}

