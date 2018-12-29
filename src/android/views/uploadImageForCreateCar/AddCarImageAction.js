import httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'

export const uploadCarImage = (params) => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { record_host,base_host, file_host} } } = getState()
        const cameraSuccessReses = params.filter(item => item.success)
        if (cameraSuccessReses.length > 0) {
            const { userReducer: { data: { user: { userId } } },
                addCarReducer: { data: { carId, vin } }
            } = getState()
            const getPersonalUrl = `${base_host}/user/${userId}`
            const getPersonalRes = await httpRequest.get(getPersonalUrl)
            if (getPersonalRes.success) {
                const user = getPersonalRes.result[0]
                const imageUploadUrl = `${file_host}/user/${user.uid}/image?${ObjectToUrl({ imageType: 1 })}`
                const imageUploadReses = await Promise.all(cameraSuccessReses.map(item => httpRequest.postFile(imageUploadUrl, {
                    key: 'image',
                    ...item.res
                })))
                const imageUploadSuccessReses = imageUploadReses.filter(item => item.success)
                if (imageUploadSuccessReses.length > 0) {
                    const bindDamageUrl = `${record_host}/car/${carId}/vin/${vin}/storageImage`
                    const bindDamageReses = await Promise.all(imageUploadSuccessReses.map(item => httpRequest.post(bindDamageUrl, {
                        username: user.real_name,
                        userId: user.uid,
                        userType: user.type,
                        url: item.imageId
                    })))
                    const bindDamageSuccessReses = bindDamageReses
                        .map((item, index) => { return { imageId: imageUploadSuccessReses[index].imageId, success: item.success } })
                        .filter(item => item.success)
                        .map(item => item.imageId)
                    if (params.length === bindDamageSuccessReses.length) {
                        ToastAndroid.showWithGravity('提交成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                        dispatch({ type: actionTypes.addCarImageTypes.upload_CarImage_success, payload: { imageList: bindDamageSuccessReses } })
                    } else if (bindDamageSuccessReses.length > 0) {
                        ToastAndroid.showWithGravity(`部分提交成功：${bindDamageSuccessReses.length}/${params.length}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                        dispatch({ type: actionTypes.addCarImageTypes.upload_CarImage_partSuccess, payload: { imageList: bindDamageSuccessReses, failedMsg: '部分失败' } })
                    } else {
                        ToastAndroid.showWithGravity('提交全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                        dispatch({ type: actionTypes.addCarImageTypes.upload_CarImage_failed, payload: { failedMsg: '全部失败' } })
                    }
                } else {
                    ToastAndroid.showWithGravity('提交全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: actionTypes.addCarImageTypes.upload_CarImage_failed, payload: { failedMsg: '全部失败' } })
                }
            } else {
                ToastAndroid.showWithGravity('提交全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: actionTypes.addCarImageTypes.upload_CarImage_failed, payload: { failedMsg: '全部失败' } })
            }
        } else {
            ToastAndroid.showWithGravity('拍照全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.addCarImageTypes.upload_CarImage_failed, payload: { failedMsg: '拍照全部失败' } })
        }
    }
    catch (err) {
        ToastAndroid.showWithGravity(`提交全部失败！${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        dispatch({ type: actionTypes.addCarImageTypes.upload_CarImage_error, payload: { errorMsg: err } })
    }
}

export const uploadCarImageWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.addCarImageTypes.upload_CarImage_waiting, payload: {} })
}

export const setCreateCarImageIndex = param => (dispatch) => {
    const { index } = param
    dispatch({ type: actionTypes.addCarImageTypes.set_indexForCreateCar, payload: { index } })
}