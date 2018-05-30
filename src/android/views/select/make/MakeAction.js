import httpRequest from '../../../../util/HttpRequest'
import { base_host } from '../../../../config/Host'
import * as actionTypes from '../../../../actionTypes/index'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'

export const getMakeList = (param) => async (dispatch) => {
    const url = `${base_host}/carMake`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.makeTypes.GET_MakeList_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.makeTypes.GET_MakeList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.makeTypes.GET_MakeList_ERROR, payload: { data: err } })
    }
}

export const getMakeListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.makeTypes.GET_MakeList_WAITING, payload: {} })
}