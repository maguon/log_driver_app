import httpRequest from '../../../util/HttpRequest.js'
import { base_host, record_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'

export const getTruckInfo = (param) => async (dispatch) => {
    try {
        const getDriverUrl = `${base_host}/user/${param.getDriverId.requiredParam.userId}`
        const getDriverRes = await httpRequest.get(getDriverUrl)
        if (getDriverRes.success) {
            const url = `${base_host}/truckFirst?${ObjectToUrl({ driveId: getDriverRes.result[0].drive_id })}`
            const res = await httpRequest.get(url)
            if (res.success) {
                if (res.result.length == 0) {
                    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_Unbind, payload: {} })
                } else {
                    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_SUCCESS, payload: { data: res.result[0] } })
                }
            } else {
                dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_FAILED, payload: { data: res.msg } })
            }
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_FAILED, payload: { data: getDriverRes.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_ERROR, payload: { data: err } })
    }
}

export const setGetTruckInfoWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_WAITING, payload: {} })
}

export const getTruckRepairList = (param) => async (dispatch) => {
    try {
        const getDriverUrl = `${base_host}/user/${param.getDriverId.requiredParam.userId}`
        const getDriverRes = await httpRequest.get(getDriverUrl)
        if (getDriverRes.success) {
            const getTruckUrl = `${base_host}/truckFirst?${ObjectToUrl({ driveId: getDriverRes.result[0].drive_id })}`
            const getTruckRes = await httpRequest.get(getTruckUrl)
            if (getTruckRes.success) {
                if (getTruckRes.result.length == 0) {
                    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRepairRelList_Unbind, payload: {} })
                } else {
                    const url = `${base_host}/truckRepairRel?${ObjectToUrl({ truckId: getTruckRes.result[0].id })}`
                    const res = await httpRequest.get(url)
                    if (res.success) {
                        dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRepairRelList_SUCCESS, payload: { data: res.result } })
                    } else {
                        dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRepairRelList_FAILED, payload: { data: res.msg } })
                    }
                }
            } else {
                dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRepairRelList_FAILED, payload: { data: getTruckRes.msg } })
            }
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRepairRelList_FAILED, payload: { data: getDriverRes.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRepairRelList_ERROR, payload: { data: err } })
    }
}

export const setGetTruckRepairWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckRepairRelList_WAITING, payload: {} })
}

export const getTruckInsurance = (param) => async (dispatch) => {
    try {
        const getDriverUrl = `${base_host}/user/${param.getDriverId.requiredParam.userId}`
        const getDriverRes = await httpRequest.get(getDriverUrl)
        if (getDriverRes.success) {
            const getTruckUrl = `${base_host}/truckFirst?${ObjectToUrl({ driveId: getDriverRes.result[0].drive_id })}`
            const getTruckRes = await httpRequest.get(getTruckUrl)
            if (getTruckRes.success) {
                if (getTruckRes.result.length == 0) {
                    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInsurance_Unbind, payload: {} })
                } else {
                    const url = `${base_host}/truckInsureRel?${ObjectToUrl({ truckId: getTruckRes.result[0].id, active: 1 })}`
                    const res = await httpRequest.get(url)
                    if (res.success) {
                        dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInsurance_SUCCESS, payload: { data: res.result } })
                    } else {
                        dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInsurance_FAILED, payload: { data: res.msg } })
                    }
                }
            } else {
                dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInsurance_FAILED, payload: { data: getTruckRes.msg } })
            }
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInsurance_FAILED, payload: { data: getDriverRes.msg } })
        }

    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInsurance_ERROR, payload: { data: err } })
    }
}

export const setGetTruckInsuranceWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInsurance_WAITING, payload: {} })
}

export const getTruckImage = (param) => async (dispatch) => {
    try {
        const getDriverUrl = `${base_host}/user/${param.getDriverId.requiredParam.userId}`
        const getDriverRes = await httpRequest.get(getDriverUrl)
        if (getDriverRes.success) {
            const getTruckUrl = `${base_host}/truckFirst?${ObjectToUrl({ driveId: getDriverRes.result[0].drive_id })}`
            const getTruckRes = await httpRequest.get(getTruckUrl)
            if (getTruckRes.success) {
                if (getTruckRes.result.length == 0) {
                    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckImage_Unbind, payload: {} })
                } else {
                    const urls = [`${base_host}/truckFirst?${ObjectToUrl({ truckId: getTruckRes.result[0].id })}`,
                    `${record_host}/user/${param.getDriverId.requiredParam.userId}/truck/${getTruckRes.result[0].truck_num}/record`]
                    const res = await Promise.all(urls.map((url) => httpRequest.get(url)))
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
                }
            } else {
                dispatch({ type: actionTypes.truckInfoTypes.GET_TruckImage_FAILED, payload: { data: getTruckRes.msg } })
            }
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckImage_FAILED, payload: { data: getDriverRes.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckInfoTypes.GET_TruckImage_ERROR, payload: { data: err } })
    }
}

export const setGetTruckImageWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckImage_WAITING, payload: {} })
}

