import httpRequest from '../../util/HttpRequest.js'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'

export const getDriverInfo = () => async (dispatch, getState) => {
    const { loginReducer: { data: { user: { drive_id } } } } = getState()
    const { loginReducer: { url: { base_host} } } = getState()
    dispatch({ type: actionTypes.truckActionType.GET_DriverInfoAtTruck_WAITING, payload: {} })
    try {
        const getDriverUrl = `${base_host}/drive?${ObjectToUrl({ driveId: drive_id })}`
        const getDriverRes = await httpRequest.get(getDriverUrl)
        if (getDriverRes.success) {
            dispatch({
                type: actionTypes.truckActionType.GET_DriverInfoAtTruck_SUCCESS, payload: {
                    driverInfo: getDriverRes.result[0]
                }
            })
        } else {
            dispatch({ type: actionTypes.truckActionType.GET_DriverInfoAtTruck_FAILED, payload: { failedMsg: getDriverRes.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckActionType.GET_DriverInfoAtTruck_ERROR, payload: { errorMsg: err } })
    }
}
