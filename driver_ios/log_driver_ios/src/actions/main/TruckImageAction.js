import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'

export const getTruckImage = () => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { uid } },url:{record_host } }, truckDetailReducer: { data: { truckInfo: { truck_num } } } } = getState()
        const url = `${record_host}/user/${uid}/truck/${truck_num}/record`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.truckImageActionType.GET_TruckImage_SUCCESS, payload: { data: { truckImageList: res.result[0].images } } })
        } else {
            dispatch({ type: actionTypes.truckImageActionType.GET_TruckImage_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.truckImageActionType.GET_TruckImage_ERROR, payload: { data: err } })
    }
}

export const getTruckImageWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.truckImageActionType.GET_TruckImage_WAITING, payload: {} })
}
