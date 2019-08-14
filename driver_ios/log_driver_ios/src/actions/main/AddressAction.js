import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'

export const getAddress = (param) => async (dispatch) => {
    dispatch({ type: actionTypes.addressType.get_addressAtMap_waiting, payload: {} })
    try {
        const url = `http://restapi.amap.com/v3/geocode/regeo?${ObjectToUrl(param)}`
        const res = await httpRequest.get(url)
        if (res.info=='OK') {
            dispatch({ type: actionTypes.addressType.get_addressAtMap_success, payload: { addressInfo: res.regeocode } })
        } else {
            dispatch({ type: actionTypes.addressType.get_addressAtMap_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addressType.get_addressAtMap_error, payload: { errorMsg: err } })
    }
}
