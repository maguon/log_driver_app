// import httpRequest from '../../../../util/HttpRequest.js'
// import { base_host } from '../../../../config/Host'
// import * as actionTypes from '../../../../actionTypes/index'
// import { ObjectToUrl } from '../../../../util/ObjectToUrl'

// export const getPersonalInfo = (param) => async (dispatch) => {
//     dispatch({ type: actionTypes.settingTypes.GET_PersonalInfo_WAITING, payload: {} })
//     try {
//         const getDriverUrl = `${base_host}/user/${param.getDriverId.requiredParam.userId}`
//         const getDriverRes = await httpRequest.get(getDriverUrl)
//         if (getDriverRes.success) {
//             dispatch({ type: actionTypes.settingTypes.GET_PersonalInfo_SUCCESS, payload: { personalInfo: getDriverRes.result[0] } })
//         } else {
//             dispatch({ type: actionTypes.settingTypes.GET_PersonalInfo_FAILED, payload: { failedMsg: getDriverRes.msg } })
//         }
//     } catch (err) {
//         dispatch({ type: actionTypes.settingTypes.GET_PersonalInfo_ERROR, payload: { errorMsg: err } })
//     }
// }