import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getTrailerInfo = (param) => async (dispatch) => {
    try {
        const getDriverUrl = `${base_host}/user/${param.getDriverId.requiredParam.userId}`
        const getDriverRes = await httpRequest.get(getDriverUrl)
        if (getDriverRes.success) {
            const getTruckUrl = `${base_host}/truckFirst?${ObjectToUrl({ driveId: getDriverRes.result[0].drive_id })}`
            const getTruckRes = await httpRequest.get(getTruckUrl)
            if (getTruckRes.success) {
                if (getTruckRes.result.length == 0) {
                    dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInfo_Unbind, payload: {} })
                } else {
                    if (getTruckRes.result[0].trail_id) {
                        const url = `${base_host}/truckTrailer?${ObjectToUrl({ truckId: getTruckRes.result[0].trail_id })}`
                        const res = await httpRequest.get(url)
                        if (res.success) {
                            dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInfo_SUCCESS, payload: { data: res.result[0] } })
                        } else {
                            dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInfo_FAILED, payload: { data: res.msg } })
                        }
                    } else {
                        dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInfo_Unbind, payload: {} })
                    }
                }
            } else {
                dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInfo_FAILED, payload: { data: getTruckRes.msg } })
            }
        } else {
            dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInfo_FAILED, payload: { data: getDriverRes.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInfo_ERROR, payload: { data: err } })
    }
}

export const setGetTrailerInfoWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInfo_WAITING, payload: {} })
}

export const getTrailerRepairList = (param) => async (dispatch) => {
    try {
        const getDriverUrl = `${base_host}/user/${param.getDriverId.requiredParam.userId}`
        const getDriverRes = await httpRequest.get(getDriverUrl)
        if (getDriverRes.success) {
            const getTruckUrl = `${base_host}/truckFirst?${ObjectToUrl({ driveId: getDriverRes.result[0].drive_id })}`
            const getTruckRes = await httpRequest.get(getTruckUrl)
            if (getTruckRes.success) {
                if (getTruckRes.result.length == 0) {
                    dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerRepairRelList_Unbind, payload: {} })
                } else {
                    if (getTruckRes.result[0].trail_id) {
                        const url = `${base_host}/truckRepairRel?${ObjectToUrl({ truckId: getTruckRes.result[0].trail_id })}`
                        const res = await httpRequest.get(url)
                        if (res.success) {
                            dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerRepairRelList_SUCCESS, payload: { data: res.result } })
                        } else {
                            dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerRepairRelList_FAILED, payload: { data: res.msg } })
                        }
                    } else {
                        dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerRepairRelList_Unbind, payload: {} })
                    }
                }
            } else {
                dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerRepairRelList_FAILED, payload: { data: getTruckRes.msg } })
            }
        } else {
            dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerRepairRelList_FAILED, payload: { data: getDriverRes.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerRepairRelList_ERROR, payload: { data: err } })
    }
}

export const setGetTrailerRepairWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerRepairRelList_WAITING, payload: {} })
}

export const getTrailerInsurance = (param) => async (dispatch) => {
    try {
        const getDriverUrl = `${base_host}/user/${param.getDriverId.requiredParam.userId}`
        const getDriverRes = await httpRequest.get(getDriverUrl)
        if (getDriverRes.success) {
            const getTruckUrl = `${base_host}/truckFirst?${ObjectToUrl({ driveId: getDriverRes.result[0].drive_id })}`
            const getTruckRes = await httpRequest.get(getTruckUrl)
            if (getTruckRes.success) {
                if (getTruckRes.result.length == 0) {
                    dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInsurance_Unbind, payload: {} })
                } else {
                    if (getTruckRes.result[0].trail_id) {
                        const url = `${base_host}/truckInsureRel?${ObjectToUrl({ truckId: getTruckRes.result[0].trail_id })}`
                        const res = await httpRequest.get(url)
                        if (res.success) {
                            dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInsurance_SUCCESS, payload: { data: res.result } })
                        } else {
                            dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInsurance_FAILED, payload: { data: res.msg } })
                        }
                    } else {
                        dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInsurance_Unbind, payload: {} })
                    }
                }
            } else {
                dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInsurance_FAILED, payload: { data: getTruckRes.msg } })
            }
        } else {
            dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInsurance_FAILED, payload: { data: getDriverRes.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInsurance_ERROR, payload: { data: err } })
    }
}

export const setGetTrailerInsuranceWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInsurance_WAITING, payload: {} })
}

export const getTrailerImage = (param) => async (dispatch) => {
    try {
        const getDriverUrl = `${base_host}/user/${param.getDriverId.requiredParam.userId}`
        const getDriverRes = await httpRequest.get(getDriverUrl)
        if (getDriverRes.success) {
            const getTruckUrl = `${base_host}/truckFirst?${ObjectToUrl({ driveId: getDriverRes.result[0].drive_id })}`
            const getTruckRes = await httpRequest.get(getTruckUrl)
            if (getTruckRes.success) {
                if (getTruckRes.result.length == 0) {
                    dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerImage_Unbind, payload: {} })
                } else {
                    if (getTruckRes.result[0].trail_id) {
                        const urls = [`${base_host}/truckTrailer?${ObjectToUrl({ truckId: getTruckRes.result[0].trail_id})}`, 
                        `${record_host}/user/${param.getDriverId.requiredParam.userId}/truck/${getTruckRes.result[0].trail_num}/record`]
                        const res = await Promise.all(urls.map((url) => httpRequest.get(url)))
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
                    } else {
                        dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerImage_Unbind, payload: {} })
                    }
                }
            } else {
                dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInsurance_FAILED, payload: { data: getTruckRes.msg } })
            }
        } else {
            dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerInsurance_FAILED, payload: { data: getTruckRes.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerImage_ERROR, payload: { data: err } })
    }
}

export const setGetTrailerImageWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.trailerInfoTypes.GET_TrailerImage_WAITING, payload: {} })
}