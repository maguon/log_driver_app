import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getDriverInfo = (param) => async (dispatch, getState) => {
    const { userReducer: { data: { user: { userId } } } } = getState()
    dispatch({ type: actionTypes.truckTypes.GET_DriverInfoAtTruck_WAITING, payload: {} })
    try {
        const getPersonalUrl = `${base_host}/user/${userId}`
        const getPersonalRes = await httpRequest.get(getPersonalUrl)
        if(getPersonalRes.success){
            const getDriverUrl = `${base_host}/drive?driveId=${getPersonalRes.result[0].drive_id}`
            const getDriverRes = await httpRequest.get(getDriverUrl)
            if (getDriverRes.success) {
                dispatch({
                    type: actionTypes.truckTypes.GET_DriverInfoAtTruck_SUCCESS, payload: {
                        personalInfo: getPersonalRes.result[0],
                        driverInfo: getDriverRes.result[0]
                    }
                })
            } else {
                dispatch({ type: actionTypes.truckTypes.GET_DriverInfoAtTruck_FAILED, payload: { failedMsg: getDriverRes.msg } })
            }
        }else{
            dispatch({ type: actionTypes.truckTypes.GET_DriverInfoAtTruck_FAILED, payload: { failedMsg: getPersonalRes.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckTypes.GET_DriverInfoAtTruck_ERROR, payload: { errorMsg: err } })
    }
}