import httpRequest from '../../../util/HttpRequest'
import { file_host, record_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'

export const getDamageImageList = (param) => async (dispatch) => {
    const { id } = param
    try {
        const url = `${record_host}/damageRecord?${ObjectToUrl({ damageId: id })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: actionTypes.imageListForDemageTypes.get_DamageImageList_success, payload: {
                    demageImageList: res.result[0] ? res.result[0].damage_image : [],
                    recordId: res.result[0]._id
                }
            })
        } else {
            dispatch({ type: actionTypes.imageListForDemageTypes.get_DamageImageList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.imageListForDemageTypes.get_DamageImageList_error, payload: { errorMsg: err } })
    }
}

export const getDamageImageListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.imageListForDemageTypes.get_DamageImageList_waiting, payload: {} })
}

export const uploadDamageImageWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.imageListForDemageTypes.upload_ImageAtDemage_waiting, payload: {} })
}

export const uploadDamageImage = param => async (dispatch, getState) => {
    try {
        const { cameraReses, damageId, vin } = param
        const cameraSuccessReses = cameraReses.filter(item => item.success)
        if (cameraSuccessReses.length > 0) {
            const { truckReducer: { data: { personalInfo } } } = getState()
            const imageUploadUrl = `${file_host}/user/${personalInfo.uid}/image?${ObjectToUrl({ imageType: 4 })}`
            const imageUploadReses = await Promise.all(cameraSuccessReses.map(item => httpRequest.postFile(imageUploadUrl, {
                key: 'image',
                ...item.res
            })))
            const imageUploadSuccessReses = imageUploadReses.filter(item => item.success)
            if (imageUploadSuccessReses.length > 0) {
                const bindDamageUrl = `${record_host}/user/${personalInfo.uid}/damage/${damageId}/image`
                const bindDamageReses = await Promise.all(imageUploadSuccessReses.map(item => httpRequest.post(bindDamageUrl, {
                    username: personalInfo.real_name,
                    userId: personalInfo.uid,
                    userType: personalInfo.type,
                    url: item.imageId,
                    vin
                })))
                const bindDamageSuccessReses = bindDamageReses
                    .map((item, index) => { return { imageId: imageUploadSuccessReses[index].imageId, success: item.success } })
                    .filter(item => item.success)
                    .map(item => item.imageId)
                if (cameraReses.length === bindDamageSuccessReses.length) {
                    ToastAndroid.showWithGravity('提交成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: actionTypes.imageListForDemageTypes.upload_ImageAtDemage_success, payload: { demageImageList: bindDamageSuccessReses } })
                } else if (bindDamageSuccessReses.length > 0) {
                    ToastAndroid.showWithGravity(`部分提交成功：${bindDamageSuccessReses.length}/${cameraReses.length}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: actionTypes.imageListForDemageTypes.upload_ImageAtDemage_partSuccess, payload: { demageImageList: bindDamageSuccessReses, failedMsg: '部分失败' } })
                } else {
                    ToastAndroid.showWithGravity('提交全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: actionTypes.imageListForDemageTypes.upload_ImageAtDemage_failed, payload: { failedMsg: '全部失败' } })
                }
            } else {
                ToastAndroid.showWithGravity('提交全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: actionTypes.imageListForDemageTypes.upload_ImageAtDemage_failed, payload: { failedMsg: '全部失败' } })
            }
        } else {
            ToastAndroid.showWithGravity('拍照全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.imageListForDemageTypes.upload_ImageAtDemage_failed, payload: { failedMsg: '拍照全部失败' } })
        }
    }
    catch (err) {
        ToastAndroid.showWithGravity(`提交全部失败！${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        dispatch({ type: actionTypes.imageListForDemageTypes.upload_ImageAtDemage_error, payload: { errorMsg: err } })
    }
}

export const delImage = param => async (dispatch, getState) => {
    const { userReducer: { data: { user: { userId } } },
        imageListForDemageReducer: { data: { recordId } } } = getState()
    dispatch({ type: actionTypes.imageListForDemageTypes.del_ImageAtDemage_waiting, payload: {} })
    try {
        const url = `${record_host}/user/${userId}/record/${recordId}/damageImage/${param}`
        const res = await httpRequest.del(url)
        if (res.success) {
            ToastAndroid.showWithGravity('图片删除成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.imageListForDemageTypes.del_ImageAtDemage_success, payload: { imageurl: param } })
        } else {
            ToastAndroid.showWithGravity(`图片删除失败：${res.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.imageListForDemageTypes.del_ImageAtDemage_failed, payload: { failedMsg: res.msg } })
        }

    } catch (err) {
        ToastAndroid.showWithGravity(`图片删除失败：${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        dispatch({ type: actionTypes.imageListForDemageTypes.del_ImageAtDemage_error, payload: { errorMsg: err } })
    }
}
