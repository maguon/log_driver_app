import httpRequest from '../../util/HttpRequest.js'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'

export const getBaseAddrList = (param) => async (dispatch,getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/baseAddr?${ObjectToUrl({ cityId: param.cityId })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.baseAddrListType.get_baseAddrList_success, payload: { baseAddrList: res.result } })
        } else {
            dispatch({ type: actionTypes.baseAddrListType.get_baseAddrList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.baseAddrListType.get_baseAddrList_error, payload: { errorMsg: err } })
    }
}


export const getBaseAddrListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.baseAddrListType.get_baseAddrList_waiting, payload: {} })
}
