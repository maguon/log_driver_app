import httpRequest from '../util/HttpRequest'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getReceiveList = (param) => async (dispatch) => {
    try {
        const url = `${base_host}/receive?${ObjectToUrl({
            cityId: param.cityId
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.selectReceiveActionTypes.get_receiveList_success, payload: { receiveList: res.result } })
        } else {
            dispatch({ type: actionTypes.selectReceiveActionTypes.get_receiveList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.selectReceiveActionTypes.get_receiveList_error, payload: { errorMsg: err } })
    }
}

export const getReceiveListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.selectReceiveActionTypes.get_receiveList_waiting, payload: {} })
}
