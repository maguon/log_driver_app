import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'


export const getCarInfoRecord = (param) => async (dispatch, getState) => {
    const { car_id } = param
    const { loginReducer: { data: { user: { uid } }},communicationSettingReducer:{data:{record_host} } } = getState()
    try {
        const url = `${record_host}/user/${uid}/car/${car_id}/record`
        console.log('url',url)
        const res = await httpRequest.get(url)
        console.log('res',res)
        if (res.success) {
            dispatch({ type: actionTypes.recordForDemageType.get_RecordForDemage_success, payload: { carInfoRecord: res.result[0] } })
        } else {
            dispatch({ type: actionTypes.recordForDemageType.get_RecordForDemage_failed, payload: { errorMsg: res.msg } })
        }
    }
    catch (err) {
        dispatch({ type: actionTypes.recordForDemageType.get_RecordForDemage_error, payload: { errorMsg: err } })
    }
}

export const getCarInfoRecordWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.recordForDemageType.get_RecordForDemage_waiting, payload: {} })
}
