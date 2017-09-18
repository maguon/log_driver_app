import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getFuelFillingRecord = (param) => (dispatch) => {
    const urls = [`${base_host}/driveRefuel?${ObjectToUrl(param.OptionalParam)}`]
    try {
        let res = await Promise.all(urls.map((url) => httpRequest.get(url)))
        if (res[0].success) {
            dispatch({
                type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_SUCCESS, payload: {
                    data: {
                        fuelFillingRecordList: res[0].result,
                    }
                }
            })
        } else {
            dispatch({ type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_FAILED, payload: { data: `${res[0].msg}` } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_ERROR, payload: { data: err } })
    }
}