import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'

export const getReceiveList = (param) => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/receive?${ObjectToUrl({
            cityId: param.cityId
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.selectReceiveActionType.get_receiveList_success, payload: { receiveList: res.result } })
        } else {
            dispatch({ type: actionTypes.selectReceiveActionType.get_receiveList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.selectReceiveActionType.get_receiveList_error, payload: { errorMsg: err } })
    }
}

export const getReceiveListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.selectReceiveActionType.get_receiveList_waiting, payload: {} })
}
