import httpRequest from '../../../util/HttpRequest'
import { base_host, file_host, record_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'


export const uploadAccidentImageWaiting = () => (dispatch, getState) => {
     dispatch({ type: actionTypes.applyAccidentImageTypes.upload_ImageAtApplyAccident_waiting, payload: {} })
}

export const uploadAccidentImage = param => async (dispatch, getState) => {
    try {
        const { cameraReses } = param
        const cameraSuccessReses = cameraReses.filter(item => item.success)
        if (cameraSuccessReses.length > 0) {
            const { userReducer: { data: { user: { userId } } },
                applyAccidentReducer: { data: { accidentId ,truckNum} } ,
                truckReducer:{data:{personalInfo}}
            } = getState()
            const imageUploadUrl = `${file_host}/user/${userId}/image?${ObjectToUrl({ imageType: 5 })}`
            const imageUploadReses = await Promise.all(cameraSuccessReses.map(item => httpRequest.postFile(imageUploadUrl, {
                key: 'image',
                ...item.res
            })))
            const imageUploadSuccessReses = imageUploadReses.filter(item => item.success)
            if (imageUploadSuccessReses.length > 0) {
                const bindDamageUrl = `${record_host}/user/${userId}/truckDamage/${accidentId}/image`
                const bindDamageReses = await Promise.all(imageUploadSuccessReses.map(item => httpRequest.post(bindDamageUrl, {
                    username: personalInfo.real_name,
                    userId: personalInfo.uid,
                    userType: personalInfo.type,
                    url: item.imageId,
                    vheNo: truckNum
                })))
                const bindDamageSuccessReses = bindDamageReses
                    .map((item, index) => { return { imageId: imageUploadSuccessReses[index].imageId, success: item.success } })
                    .filter(item => item.success)
                    .map(item => item.imageId)
                if (cameraReses.length === bindDamageSuccessReses.length) {
                    ToastAndroid.showWithGravity('提交成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: actionTypes.applyAccidentImageTypes.upload_ImageAtApplyAccident_success, payload: { accidentImageList: bindDamageSuccessReses } })
                } else if (bindDamageSuccessReses.length > 0) {
                    ToastAndroid.showWithGravity(`部分提交成功：${bindDamageSuccessReses.length}/${cameraReses.length}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: actionTypes.applyAccidentImageTypes.upload_ImageAtApplyAccident_partSuccess, payload: { accidentImageList: bindDamageSuccessReses, failedMsg: '部分失败' } })
                } else {
                    ToastAndroid.showWithGravity('提交全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: actionTypes.applyAccidentImageTypes.upload_ImageAtApplyAccident_failed, payload: { failedMsg: '全部失败' } })
                }
            } else {
                ToastAndroid.showWithGravity('提交全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: actionTypes.applyAccidentImageTypes.upload_ImageAtApplyAccident_failed, payload: { failedMsg: '全部失败' } })
            }
        } else {
            ToastAndroid.showWithGravity('拍照全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.applyAccidentImageTypes.upload_ImageAtApplyAccident_failed, payload: { failedMsg: '拍照全部失败' } })
        }
    }
    catch (err) {
        ToastAndroid.showWithGravity(`提交全部失败！${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        dispatch({ type: actionTypes.applyAccidentImageTypes.upload_ImageAtApplyAccident_error, payload: { errorMsg: err } })
    }
}
