import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'

export const getMakeList = (param) => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } } } = getState()
    const url = `${base_host}/carMake`
    try {
        let res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.makeType.GET_MakeList_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.makeType.GET_MakeList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.makeType.GET_MakeList_ERROR, payload: { data: err } })
    }
}

export const getMakeListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.makeType.GET_MakeList_WAITING, payload: {} })
}
