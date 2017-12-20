import httpRequest from '../util/HttpRequest.js'
import { base_host, file_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const updatePersonalImage = (param) => async (dispatch) => {
    dispatch({ type: actionTypes.personalInfoTypes.Update_PersonalImage_WAITING, payload: {} })
    try {
        const uploadUrl = `${file_host}/user/${param.uploadImage.requiredParam.userId}/image?${ObjectToUrl(param.uploadImage.optionalParam)}`
        const uploadUrlRes = await httpRequest.postFile(uploadUrl, param.uploadImage.postParam)
        if (uploadUrlRes.success) {
            const updateAvatarImageUrl = `${base_host}/user/${param.updateAvatarImage.requiredParam.userId}/avatarImage`
            param.updateAvatarImage.putParam.avatarImage = uploadUrlRes.imageId
            const updateAvatarImageRes = await httpRequest.put(updateAvatarImageUrl, param.updateAvatarImage.putParam)
            if(updateAvatarImageRes.success){
                dispatch({ type: actionTypes.settingTypes.Change_PersonalImage, payload: { data: uploadUrlRes.imageId } })
                dispatch({ type: actionTypes.personalInfoTypes.Update_PersonalImage_SUCCESS, payload: { } })
            }else{
                dispatch({ type: actionTypes.personalInfoTypes.Update_PersonalImage_FAILED, payload: { failedMsg: updateAvatarImageRes.msg } })
            }
        } else {
            dispatch({ type: actionTypes.personalInfoTypes.Update_PersonalImage_FAILED, payload: { failedMsg: uploadUrlRes.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.personalInfoTypes.Update_PersonalImage_ERROR, payload: { errorMsg: err } })
    }
}