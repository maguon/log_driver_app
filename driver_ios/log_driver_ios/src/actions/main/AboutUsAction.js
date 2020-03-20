import * as httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'



export const getAboutUsInfo = () => async (dispatch, getState) => {
    const {communicationSettingReducer: { data: { base_host } }} = getState()

    try {
        dispatch({ type: actionTypes.aboutUsActionType.get_AboutUsInfo_waiting, payload: {} })
        const url = `${base_host}/appAbout`
        const res = await httpRequest.get(url)
        if (res) {
            dispatch({ type: actionTypes.aboutUsActionType.get_AboutUsInfo_success, payload: {AboutUsInfo:res} })

        } else {
            dispatch({ type: actionTypes.aboutUsActionType.get_AboutUsInfo_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.aboutUsActionType.get_AboutUsInfo_error, payload: { errorMsg: err } })

    }
}
