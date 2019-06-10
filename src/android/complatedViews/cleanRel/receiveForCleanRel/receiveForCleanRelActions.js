import httpRequest from '../../../../util/HttpRequest'
import * as actionTypes from '../../../../actionTypes/index'

export const getReceive = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/receive?receiveId=${req.receiveId}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.receiveForCleanRel.get_receiveForCleanRel_success, payload: { receive: res.result[0] } })
        } else {
            dispatch({ type: actionTypes.receiveForCleanRel.get_receiveForCleanRel_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.receiveForCleanRel.get_receiveForCleanRel_error, payload: { errorMsg: `${err}` } })
    }
}


export const getReceiveWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.receiveForCleanRel.get_receiveForCleanRel_waiting, payload: {} })
}