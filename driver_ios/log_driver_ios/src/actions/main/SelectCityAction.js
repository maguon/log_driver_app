import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'

export const getCityList = () => async (dispatch, getState) => {
    try {
        const { loginReducer: { url: { base_host } } } = getState()
        const url = `${base_host}/city`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.selectCityActionType.get_cityList_success, payload: { cityList: res.result } })
        } else {
            dispatch({ type: actionTypes.selectCityActionType.get_cityList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.selectCityActionType.get_cityList_error, payload: { errorMsg: err } })
    }
}

export const getCityListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.selectCityActionType.get_cityList_waiting, payload: {} })
}
