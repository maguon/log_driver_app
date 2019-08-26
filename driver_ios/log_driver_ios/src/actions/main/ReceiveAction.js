import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'

export const getReceiveList = (param) => async (dispatch, getState) => {
    const { loginReducer: { url: { base_host } } } = getState()
    const url = `${base_host}/receive?${ObjectToUrl(param.OptionalParam)}`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.receiveType.GET_Receives_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.receiveType.GET_Receives_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.receiveType.GET_Receives_ERROR, payload: { data: err } })
    }
}

export const getReceiveListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.receiveType.GET_Receives_WAITING, payload: {} })
}
