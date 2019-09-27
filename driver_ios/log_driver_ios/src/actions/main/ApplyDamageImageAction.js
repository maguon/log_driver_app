import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import {ObjectToUrl} from '../../util/ObjectToUrl'
import {Toast} from 'native-base'

export const uploadDamageImage = (params, vin) => async (dispatch, getState) => {
    try {
        const {communicationSettingReducer: {data: {record_host, file_host}}} = getState()
        const cameraSuccessReses = params.filter(item => item.success)
        if (cameraSuccessReses.length > 0) {
            const {
                applyDamageReducer: {data: {damageId}},
                truckReducer: {data: {personalInfo}}
            } = getState()
            const imageUploadUrl = `${file_host}/user/${personalInfo.uid}/image?${ObjectToUrl({imageType: 4})}`
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
                    .map((item, index) => {
                        return {imageId: imageUploadSuccessReses[index].imageId, success: item.success}
                    })
                    .filter(item => item.success)
                    .map(item => item.imageId)
                if (params.length === bindDamageSuccessReses.length) {

                    // Toast.show({text: '提交成功！'})
                    dispatch({
                        type: actionTypes.applyDamageImageType.upload_DamageImage_success,
                        payload: {imageList: bindDamageSuccessReses}
                    })
                } else if (bindDamageSuccessReses.length > 0) {
                    // Toast.show({text: `部分提交成功：${bindDamageSuccessReses.length}/${params.length}`})

                    dispatch({
                        type: actionTypes.applyDamageImageType.upload_DamageImage_partSuccess,
                        payload: {imageList: bindDamageSuccessReses, failedMsg: '部分失败'}
                    })
                } else {
                    // Toast.show({text: '提交全部失败！'})
                    dispatch({
                        type: actionTypes.applyDamageImageType.upload_DamageImage_failed,
                        payload: {failedMsg: '全部失败'}
                    })
                }
            } else {
                // Toast.show({text: '提交全部失败！'})
                dispatch({
                    type: actionTypes.applyDamageImageType.upload_DamageImage_failed,
                    payload: {failedMsg: '全部失败'}
                })
            }
        } else {
            // Toast.show({text: '拍照全部失败！'})
            dispatch({type: actionTypes.applyDamageImageType.upload_DamageImage_failed, payload: {failedMsg: '拍照全部失败'}})
        }
    }
    catch (err) {

        // Toast.show({text: `提交全部失败！${err}`})
        dispatch({type: actionTypes.applyDamageImageType.upload_DamageImage_error, payload: {errorMsg: err}})
    }
}

export const uploadDamageImageWating = (param) => (dispatch, getState) => {
    dispatch({type: actionTypes.applyDamageImageType.upload_DamageImage_waiting, payload: {}})
}
