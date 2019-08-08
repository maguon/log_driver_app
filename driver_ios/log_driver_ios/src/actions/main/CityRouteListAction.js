import httpRequest from '../../util/HttpRequest.js'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'

export const getCityRouteList = param => async (dispatch, getState) => {
    try {
        // console.log('param', param)
        let taskStatusArr = null
        if (param) {
            taskStatusArr = param.taskStatusArr
        }

        const { loginReducer: { data: { user: { drive_id } } ,url: { base_host}}} = getState()
        const getTruckUrl = `${base_host}/truckFirst?${ObjectToUrl({ driveId: drive_id })}`
        // console.log('getTruckUrl', getTruckUrl)
        const getTruckRes = await httpRequest.get(getTruckUrl)
        if (getTruckRes.success) {
            if (getTruckRes.result.length == 0) {
                dispatch({ type: actionTypes.cityRouteListActionType.GET_CityRouteList_Unbind, payload: {} })
            } else {
                const url = `${base_host}/dpRouteTask?${ObjectToUrl({ truckId: getTruckRes.result[0].id, driveId: drive_id, taskStatusArr })}`
                // console.log('url', url)
                const res = await httpRequest.get(url)
                if (res.success) {
                    dispatch({ type: actionTypes.cityRouteListActionType.GET_CityRouteList_SUCCESS, payload: { data: res.result } })
                } else {
                    dispatch({ type: actionTypes.cityRouteListActionType.GET_CityRouteList_FAILED, payload: { data: res.msg } })
                }
            }
        } else {
            dispatch({ type: actionTypes.cityRouteListActionType.GET_CityRouteList_FAILED, payload: { data: getTruckRes.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.cityRouteListActionType.GET_CityRouteList_ERROR, payload: { data: err } })
    }
}


export const getCityRouteListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.cityRouteListActionType.GET_CityRouteList_WAITING, payload: {} })
}
