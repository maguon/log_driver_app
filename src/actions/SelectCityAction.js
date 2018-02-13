import httpRequest from '../util/HttpRequest'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'

export const getCityList = () =>async (dispatch) => {
    try {
        const url = `${base_host}/city`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.selectCityActionTypes.get_cityList_success, payload: { cityList: res.result } })
        } else {
            dispatch({ type: actionTypes.selectCityActionTypes.get_cityList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.selectCityActionTypes.get_cityList_error, payload: { errorMsg: err } })
    }
}

export const getCityListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.selectCityActionTypes.get_cityList_waiting, payload: {} })
}
