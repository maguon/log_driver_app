import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'

export const getCarInfo = (param) => async (dispatch, getState) => {
    const { loginReducer: { url: { record_host, base_host } } } = getState()
    const urls = [`${base_host}/car?${ObjectToUrl(param.OptionalParam)}`,
        `${record_host}/user/${param.requiredParam.userId}/car/${param.requiredParam.carId}/record`]
    try {
        const res = await Promise.all(urls.map(url => httpRequest.get(url)))
        if (res[0].success && res[1].success) {
            dispatch({
                type: actionTypes.carInfoActionType.GET_CarInfo_SUCCESS,
                payload: {
                    data: {
                        carInfo: res[0].result[0],
                        imageList: res[1].result[0].storage_image
                    }
                }
            })
        } else {
            dispatch({ type: actionTypes.carInfoActionType.GET_CarInfo_FAILED, payload: { data: `${res[0].msg}&&${res[1].msg}` } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.carInfoActionType.GET_CarInfo_ERROR, payload: { data: err } })
    }
}

export const getCarInfoWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.carInfoActionType.GET_CarInfo_WAITING, payload: {} })
}

export const setCarImageIndex = param => (dispatch) => {
    const { index } = param
    dispatch({ type: actionTypes.carInfoActionType.set_indexForCarInfo, payload: { index } })
}
