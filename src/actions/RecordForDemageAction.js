import httpRequest from '../util/HttpRequest'
import { base_host, file_host, record_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getCarInfoRecord = (param) => async (dispatch, getState) => {
    const { car_id } = param
    const { userReducer: { data: { user: { userId } } } } = getState()
    try {
        const url = `${record_host}/user/${userId}/car/${car_id}/record`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.recordForDemageTypes.get_RecordForDemage_success, payload: { carInfoRecord: res.result[0] } })
        } else {
            dispatch({ type: actionTypes.recordForDemageTypes.get_RecordForDemage_failed, payload: { errorMsg: res.msg } })
        }
    }
    catch (err) {
        dispatch({ type: actionTypes.recordForDemageTypes.get_RecordForDemage_error, payload: { errorMsg: err } })
    }
}

export const getCarInfoRecordWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.recordForDemageTypes.get_RecordForDemage_waiting, payload: {} })
}