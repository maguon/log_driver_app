import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'

export const getTrailerImage = () => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { uid } },url:{record_host} }, trailerInfoReducer: { data: { trailerInfo: { truck_num } } } } = getState()
        const url = `${record_host}/user/${uid}/truck/${truck_num}/record`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.trailerImageActionType.GET_TrailerImage_SUCCESS, payload: { data: { trailerImageList: res.result[0].images } } })
        } else {
            dispatch({ type: actionTypes.trailerImageActionType.GET_TrailerImage_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: actionTypes.trailerImageActionType.GET_TrailerImage_ERROR, payload: { data: err } })
    }
}

export const getTrailerImageWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.trailerImageActionType.GET_TrailerImage_WAITING, payload: {} })
}
