import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getTrailerInfo = (param) => async (dispatch) => {
    const url = `${base_host}/truckTrailer?${ObjectToUrl(param.OptionalParam)}`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInfo_SUCCESS, payload: { data: res.result[0] } })
        } else {
            dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInfo_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInfo_ERROR, payload: { data: err } })
    }
}

export const setGetTrailerInfoWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInfo_WAITING, payload: {} })
}

// export const getTrailerRecord = (param) => async (dispatch) => {
//     const url = `${record_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckNum}/record`
//     try {
//         let res = await httpRequest.get(url)
//         if (res.success) {
//             dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerRecord_SUCCESS, payload: { data: res.result[0].comments } })
//         } else {
//             dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerRecord_FAILED, payload: { data: res.msg } })
//         }
//     } catch (err) {
//         dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerRecord_ERROR, payload: { data: err } })
//     }
// }

// export const setGetTrailerRecordWaiting = (param) => (dispatch) => {
//     dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerRecord_WAITING, payload: {} })
// }

export const getTrailerRepairList = (param) => async (dispatch) => {
    const url = `${base_host}/truckRepairRel?${ObjectToUrl(param.OptionalParam)}`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerRepairRelList_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerRepairRelList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerRepairRelList_ERROR, payload: { data: err } })
    }
}

export const setGetTrailerRepairWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerRepairRelList_WAITING, payload: {} })
}

export const getTrailerInsurance = (param) => async (dispatch) => {
    const url = `${base_host}/truckInsureRel?${ObjectToUrl(param.OptionalParam)}`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInsurance_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInsurance_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInsurance_ERROR, payload: { data: err } })
    }
}

export const setGetTrailerInsuranceWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInsurance_WAITING, payload: {} })
}

export const getTrailerImage = (param) => async (dispatch) => {
    const urls = [`${base_host}/truckFirst?${ObjectToUrl(param.OptionalParam)}`, `${record_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckNum}/record`]
    try {
        let res = await Promise.all(urls.map((url) => httpRequest.get(url)))
        if (res[0].success && res[1].success) {
            dispatch({
                type: actionTypes.trailerInfoTypes.GET_TrailerImage_SUCCESS, payload: {
                    data: {
                        truckInfo: res[0].result[0],
                        truckImageList: res[1].result[0].images
                    }
                }
            })
        } else {
            dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerImage_FAILED, payload: { data: `${res[0].msg ? res[0].msg : ''}${res[1].msg ? res[1].msg : ''}` } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerImage_ERROR, payload: { data: err } })
    }
}

export const setGetTrailerImageWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerImage_WAITING, payload: {} })
}