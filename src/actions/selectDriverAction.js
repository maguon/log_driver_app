import httpRequest from '../util/HttpRequest'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getDriverList = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/drive?driveStatus=1`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.selectDriverActionTypes.get_driverList_success, payload: { driverList: res.result } })
        } else {
            dispatch({ type: actionTypes.selectDriverActionTypes.get_driverList_failed, payload: { failedMsg: res.msg } })
        }
    }
    catch (err) {
        dispatch({ type: actionTypes.selectDriverActionTypes.get_driverList_error, payload: { errorMsg: err } })
    }
}

export const getDriverListWaiting = () => async (dispatch) => {
    dispatch({ type: actionTypes.selectDriverActionTypes.get_driverList_waiting, payload: {} })
}

