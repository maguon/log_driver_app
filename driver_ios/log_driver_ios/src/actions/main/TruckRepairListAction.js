import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'

export const getTruckRepairList = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const { truckDetailReducer: { data: { truckInfo } } } = getState()
        const url = `${base_host}/truckRepairRel?${ObjectToUrl({ truckId: truckInfo.id })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.truckRepairListActionType.GET_TruckRepairRelList_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.truckRepairListActionType.GET_TruckRepairRelList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({ type: actionTypes.truckRepairListActionType.GET_TruckRepairRelList_ERROR, payload: { data: err } })
    }
}

export const getTruckRepairListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.truckRepairListActionType.GET_TruckRepairRelList_WAITING, payload: {} })
}
