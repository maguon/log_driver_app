import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getMileageInfo = (param) => (dispatch) => {
    const urls = [`${base_host}/truckFirst?${ObjectToUrl(param.OptionalParam)}`, `${record_host}/user/${param.requiredParam.userId}/truck/${param.requiredParam.truckNum}/record`]
    try {
        let res = await Promise.all(urls.map((url) => httpRequest.get(url)))
        if (res[0].success && res[1].success) {
                //taskList:data.taskList,
                // MileageInfo:data.MileageInfo
            dispatch({
                type: actionTypes.workTypes.GET_WorkMileageInfo_SUCCESS, payload: {
                    data: {
                        truckInfo: res[0].result[0],
                        truckImageList: res[1].result[0].images
                    }
                }
            })
        } else {
            dispatch({ type: actionTypes.workTypes.GET_WorkMileageInfo_FAILED, payload: { data: `${res[0].msg ? res[0].msg : ''}${res[1].msg ? res[1].msg : ''}` } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.workTypes.GET_WorkMileageInfo_ERROR, payload: { data: err } })
    }
}

export const setGetMileageInfoWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.workTypes.GET_WorkMileageInfo_WAITING, payload: {} })
}

