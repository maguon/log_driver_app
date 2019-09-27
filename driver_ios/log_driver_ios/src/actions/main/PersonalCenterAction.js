import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import {ObjectToUrl} from '../../util/ObjectToUrl'
import {Alert} from "react-native";

export const updatePersonalImage = (param) => async (dispatch, getState) => {
    try {
        dispatch({type: actionTypes.personalCenterActionType.Update_PersonalImage_WAITING, payload: {}})
        const {communicationSettingReducer: {data: {file_host, base_host}}} = getState()
        const uploadUrl = `${file_host}/user/${param.uploadImage.requiredParam.userId}/image?${ObjectToUrl(param.uploadImage.optionalParam)}`
        const uploadUrlRes = await httpRequest.postFile(uploadUrl, param.uploadImage.postParam)
        if (uploadUrlRes.success) {
            const updateAvatarImageUrl = `${base_host}/user/${param.updateAvatarImage.requiredParam.userId}/avatarImage`
            param.updateAvatarImage.putParam.avatarImage = uploadUrlRes.imageId
            const updateAvatarImageRes = await httpRequest.put(updateAvatarImageUrl, param.updateAvatarImage.putParam)
            if (updateAvatarImageRes.success) {
                dispatch({
                    type: actionTypes.loginType.change_AvatarImage,
                    payload: {avatar_image: uploadUrlRes.imageId}
                })
                dispatch({type: actionTypes.personalCenterActionType.Update_PersonalImage_SUCCESS, payload: {}})
                // Toast.show({
                //     text: `修改成功！`
                // })

                Alert.alert(
                    '',
                    `修改成功！`,
                    [
                        {text: '确定', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    ],
                    {cancelable: false}
                )
            } else {
                dispatch({
                    type: actionTypes.personalCenterActionType.Update_PersonalImage_FAILED,
                    payload: {failedMsg: updateAvatarImageRes.msg}
                })
                // Toast.show({
                //     text: `修改失败！${updateAvatarImageRes.msg}`
                // })

                Alert.alert(
                    '',
                    `修改失败！${updateAvatarImageRes.msg}`,
                    [
                        {text: '确定', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    ],
                    {cancelable: false}
                )
            }
        } else {
            dispatch({
                type: actionTypes.personalCenterActionType.Update_PersonalImage_FAILED,
                payload: {failedMsg: uploadUrlRes.msg}
            })
            // Toast.show({
            //     text: `修改失败！${uploadUrlRes.msg}`
            // })

            Alert.alert(
                '',
                `修改失败！${uploadUrlRes.msg}`,
                [
                    {text: '确定', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ],
                {cancelable: false}
            )
        }
    } catch (err) {
        dispatch({type: actionTypes.personalCenterActionType.Update_PersonalImage_ERROR, payload: {errorMsg: err}})
        // Toast.show({
        //     text: `修改失败！${err}`
        // })

        Alert.alert(
            '',
            `修改失败！${err}`,
            [
                {text: '确定', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            {cancelable: false}
        )
    }
}
