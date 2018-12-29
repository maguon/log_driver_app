import * as httpRequest from '../../../../util/HttpRequest'

import * as actionTypes from '../../../../actionTypes/index'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'

export const getAccidentImageList = (param) => async (dispatch, getState) => {
    const { accidentId } = param
    try {
        const { communicationSettingReducer: { data: { record_host } } } = getState()
        const url = `${record_host}/truckDamage?${ObjectToUrl({ truckDamageId: accidentId })}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)

        if (res.success) {
            dispatch({
                type: actionTypes.imageForAccidentTypes.get_AccidentImageList_success, payload: {
                    imageList: res.result[0] ? res.result[0].damage_image : [],
                    recordId: res.result[0] ? res.result[0]._id : null
                }
            })
        } else {
            dispatch({ type: actionTypes.imageForAccidentTypes.get_AccidentImageList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: actionTypes.imageForAccidentTypes.get_AccidentImageList_error, payload: { errorMsg: err } })
    }
}

export const getAccidentImageListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.imageForAccidentTypes.get_AccidentImageList_waiting, payload: {} })
}

export const uploadAccidentImageWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.imageForAccidentTypes.upload_ImageAtAccidentInfo_waiting, payload: {} })
}

export const uploadAccidentImage = param => async (dispatch, getState) => {
    try {
        const { cameraReses, accidentId, truck_num } = param
        const { communicationSettingReducer: { data: { record_host, file_host } } } = getState()
        const cameraSuccessReses = cameraReses.filter(item => item.success)
        if (cameraSuccessReses.length > 0) {
            const { loginReducer: { data: { user } } } = getState()
            const imageUploadUrl = `${file_host}/user/${user.uid}/image?${ObjectToUrl({ imageType: 5 })}`
            const imageUploadReses = await Promise.all(cameraSuccessReses.map(item => httpRequest.postFile(imageUploadUrl, {
                key: 'image',
                ...item.res
            })))
            const imageUploadSuccessReses = imageUploadReses.filter(item => item.success)
            if (imageUploadSuccessReses.length > 0) {
                const bindDamageUrl = `${record_host}/user/${user.uid}/truckDamage/${accidentId}/image`
                const bindDamageReses = await Promise.all(imageUploadSuccessReses.map(item => httpRequest.post(bindDamageUrl, {
                    username: user.real_name,
                    userId: user.uid,
                    userType: user.type,
                    url: item.imageId,
                    vheNo: truck_num
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
    const { loginReducer: { data: { user: { uid } } },
        imageForAccidentReducer: { data: { recordId } } } = getState()
    const { communicationSettingReducer: { data: { record_host } } } = getState()

    dispatch({ type: actionTypes.imageForAccidentTypes.del_ImageAtAccidentInfo_waiting, payload: {} })
    try {
        const url = `${record_host}/user/${uid}/record/${recordId}/truckDamageImage/${param}`
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
