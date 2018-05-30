import httpRequest from '../../../../util/HttpRequest'
import { base_host } from '../../../../config/Host'
import * as actionTypes from '../../../../actionTypes/index'

export const getCityList = () => async (dispatch) => {
    const url = `${base_host}/city`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.cityTypes.GET_CITYS_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.cityTypes.GET_CITYS_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.cityTypes.GET_CITYS_ERROR, payload: { data: err } })
    }
}

export const getCityListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.cityTypes.GET_CITYS_WAITING, payload: {} })
}