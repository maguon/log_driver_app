import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getFuelFillingRecord = (param) => async (dispatch) => {
    const urls = [`${base_host}/driveRefuel?${ObjectToUrl(param.OptionalParam)}`, `${base_host}/refuelVolumeMoneyTotal?${ObjectToUrl(param.OptionalParam)}`]
    try {
        let res = await Promise.all(urls.map((url) => httpRequest.get(url)))
        if (res[0].success && res[1].success) {
            dispatch({
                type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_SUCCESS, payload: {
                    data: {
                        fuelFillingRecordList: res[0].result,
                        total: {
                            refuelDateStart: param.OptionalParam.refuelDateStart,
                            refuelDateEnd: param.OptionalParam.refuelDateEnd,
                            ...res[1].result[0]
                        }
                    }
                }
            })
        } else {
            dispatch({ type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_FAILED, payload: { data: `${!res[0].success ? res[0].msg : ''}${!res[1].success ? res[1].msg : ''}` } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_ERROR, payload: { data: err } })
    }
}

export const setGetFuelFillingRecordWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_WAITING, payload: {} })
}