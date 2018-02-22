import  httpRequest from '../util/HttpRequest'
import { base_host, file_host, record_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getDemageOpResult = (param) => async (dispatch, getState) => {
    const { id } = param
    try {
        const url = `${base_host}/damageCheck?${ObjectToUrl({ damageId: id })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.demageOpResultTypes.get_DemageOpResult_success, payload: { demageOpResult: res.result[0] } })
        } else {
           dispatch({ type: actionTypes.demageOpResultTypes.get_DemageOpResult_failed, payload: { failedMsg: res.msg } })
        }

    } catch (err) {
        dispatch({ type: actionTypes.demageOpResultTypes.get_DemageOpResult_error, payload: { errorMsg: err } })
    }
}

export const getDemageOpResultWaiting = (param) => (dispatch, getState) => {
    dispatch({ type: actionTypes.demageOpResultTypes.get_DemageOpResult_waiting, payload: {} })
}