import * as httpRequest from '../util/HttpRequest'
import { base_host, file_host, record_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'

export const getAccidentImageList = (param) => async (dispatch, getState) => {
    const { accidentId } = param
    try {
        const url = `${record_host}/truckDamage?${ObjectToUrl({ truckDamageId: accidentId })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: actionTypes.imageForAccidentTypes.get_AccidentImageList_success, payload: {
                    imageList: res.result[0] ? res.result[0].damage_image : [],
                    recordId: res.result[0]._id
                }
            })
        } else {
            dispatch({ type: actionTypes.imageForAccidentTypes.get_AccidentImageList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.imageForAccidentTypes.get_AccidentImageList_error, payload: { errorMsg: err } })
    }
}

export const getAccidentImageListWaiting = () => (dispatch, getState) => {
    dispatch({ type: actionTypes.imageForAccidentTypes.get_AccidentImageList_waiting, payload: {} })
}

export const uploadAccidentImageWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.imageForAccidentTypes.upload_ImageAtAccidentInfo_waiting, payload: {} })
}

export const uploadAccidentImage = param => async (dispatch, getState) => {
    try {
        const { cameraReses, accidentId } = param
        const cameraSuccessReses = cameraReses.filter(item => item.success)
        if (cameraSuccessReses.length > 0) {
            const { userReducer: { data: { user: { userId } } },
                truckReducer: { data: { personalInfo } }
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
                    url: item.imageId
                })))
                const bindDamageSuccessReses = bindDamageReses
                    .map((item, index) => { return { imageId: imageUploadSuccessReses[index].imageId, success: item.success } })
                    .filter(item => item.success)
                    .map(item => item.imageId)
                if (cameraReses.length === bindDamageSuccessReses.length) {
                    ToastAndroid.showWithGravity('提交成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: actionTypes.imageForAccidentTypes.upload_ImageAtAccidentInfo_success, payload: { imageList: bindDamageSuccessReses } })
                } else if (bindDamageSuccessReses.length > 0) {
                    ToastAndroid.showWithGravity(`部分提交成功：${bindDamageSuccessReses.length}/${cameraReses.length}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: actionTypes.imageForAccidentTypes.upload_ImageAtAccidentInfo_partSuccess, payload: { imageList: bindDamageSuccessReses, failedMsg: '部分失败' } })
                } else {
                    ToastAndroid.showWithGravity('提交全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: actionTypes.imageForAccidentTypes.upload_ImageAtAccidentInfo_failed, payload: { failedMsg: '全部失败' } })
                }
            } else {
                ToastAndroid.showWithGravity('提交全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: actionTypes.imageForAccidentTypes.upload_ImageAtAccidentInfo_failed, payload: { failedMsg: '全部失败' } })
            }
        } else {
            ToastAndroid.showWithGravity('拍照全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.imageForAccidentTypes.upload_ImageAtAccidentInfo_failed, payload: { failedMsg: '拍照全部失败' } })
        }
    }
    catch (err) {
        ToastAndroid.showWithGravity(`提交全部失败！${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        dispatch({ type: actionTypes.imageForAccidentTypes.upload_ImageAtAccidentInfo_error, payload: { errorMsg: err } })
    }
}


export const delImage = param => async (dispatch, getState) => {
    const { userReducer: { data: { user: { userId } } },
        imageForAccidentReducer: { data: { recordId } } } = getState()
    dispatch({ type: actionTypes.imageForAccidentTypes.del_ImageAtAccidentInfo_waiting, payload: {} })
    try {
        const url = `${record_host}/user/${userId}/record/${recordId}/damageImage/${param}`
        const res = await httpRequest.del(url)
        if (res.success) {
            ToastAndroid.showWithGravity('图片删除成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.imageForAccidentTypes.del_ImageAtAccidentInfo_success, payload: { imageurl: param } })
        } else {
            ToastAndroid.showWithGravity(`图片删除失败：${res.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.imageForAccidentTypes.del_ImageAtAccidentInfo_failed, payload: { failedMsg: res.msg } })
        }

    } catch (err) {
        ToastAndroid.showWithGravity(`图片删除失败：${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        dispatch({ type: actionTypes.imageForAccidentTypes.del_ImageAtAccidentInfo_error, payload: { errorMsg: err } })
    }
}
