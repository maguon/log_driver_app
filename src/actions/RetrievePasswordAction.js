import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'


export const getVCode = (param) => (dispatch) => {
    dispatch({ type: actionTypes.retrievePasswordTypes.GET_VCODE_WAITING, payload: {} })
    const url = `${base_host}/phone/${param.requiredParam.mobile}/passwordSms`
    httpRequest
        .postCallBack(url, {}, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.retrievePasswordTypes.GET_VCODE_ERROR, payload: { errorMsg: err } })
            }
            else {
                if (res.success) {
                    dispatch({ type: actionTypes.retrievePasswordTypes.GET_VCODE_SUCCESS, payload: {} })
                }
                else {
                    dispatch({ type: actionTypes.retrievePasswordTypes.GET_VCODE_FAILED, payload: { failedMsg: res.msg } })
                }
            }
        })
}

export const resetGetVCode = () => (dispatch) => {
    dispatch({ type: actionTypes.retrievePasswordTypes.Reset_GET_VCODE, payload: {} })
}


export const resetRetrieve = () => (dispatch) => {
    dispatch({ type: actionTypes.retrievePasswordTypes.Reset_Retrieve, payload: {} })
}

export const retrieve = (param) => (dispatch) => {
    dispatch({ type: actionTypes.retrievePasswordTypes.Retrieve_WAITING, payload: {} })
    const url = `${base_host}/phone/${param.requiredParam.mobile}/password`
    httpRequest
        .putCallBack(url, param.putParam, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.retrievePasswordTypes.Retrieve_ERROR, payload: { errorMsg: err } })
            }
            else {
                if (res.success) {
                    dispatch({ type: actionTypes.retrievePasswordTypes.Retrieve_SUCCESS, payload: {} })
                }
                else {
                    dispatch({ type: actionTypes.retrievePasswordTypes.Retrieve_FAILED, payload: { failedMsg: res.msg } })
                }
            }
        })
}