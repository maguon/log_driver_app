import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'

export const getEntrustList = (param) => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } } } = getState()
    const url = `${base_host}/entrust?${ObjectToUrl(param.OptionalParam)}`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.entrustType.GET_Entrusts_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.entrustType.GET_Entrusts_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.entrustType.GET_Entrusts_ERROR, payload: { data: err } })
    }
}

export const getEntrustListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.entrustType.GET_Entrusts_WAITING, payload: {} })
}
