import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import {ObjectToUrl} from '../../util/ObjectToUrl'
import {Toast} from 'native-base'
import {Alert} from "react-native";

export const getDamageImageList = (param) => async (dispatch, getState) => {
    const {id} = param
    try {
        const {communicationSettingReducer: {data: {record_host}}} = getState()
        const url = `${record_host}/damageRecord?${ObjectToUrl({damageId: id})}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: actionTypes.imageListForDemageType.get_DamageImageList_success, payload: {
                    demageImageList: res.result[0] ? res.result[0].damage_image : [],
                    recordId: res.result[0]._id
                }
            })
        } else {
            dispatch({
                type: actionTypes.imageListForDemageType.get_DamageImageList_failed,
                payload: {failedMsg: res.msg}
            })
        }
    } catch (err) {
        dispatch({type: actionTypes.imageListForDemageType.get_DamageImageList_error, payload: {errorMsg: err}})
    }
}

export const getDamageImageListWaiting = () => (dispatch) => {
    dispatch({type: actionTypes.imageListForDemageType.get_DamageImageList_waiting, payload: {}})
}

export const uploadDamageImageWaiting = () => (dispatch) => {
    dispatch({type: actionTypes.imageListForDemageType.upload_ImageAtDemage_waiting, payload: {}})
}

export const uploadDamageImage = param => async (dispatch, getState) => {
    try {
        const {communicationSettingReducer: {data: {record_host, file_host}}} = getState()
        const {cameraReses, damageId, vin} = param
        const cameraSuccessReses = cameraReses.filter(item => item.success)
        if (cameraSuccessReses.length > 0) {
            const {truckReducer: {data: {personalInfo}}} = getState()
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
                if (cameraReses.length === bindDamageSuccessReses.length) {
                    // Toast.show({text: '提交成功！'})
                    dispatch({
                        type: actionTypes.imageListForDemageType.upload_ImageAtDemage_success,
                        payload: {demageImageList: bindDamageSuccessReses}
                    })
                    Alert.alert(
                        '',
                        '提交成功！',
                        [
                            {text: '确定', onPress: () =>  console.log("success"), style: 'cancel'},
                        ],
                        {cancelable: false}
                    )
                } else if (bindDamageSuccessReses.length > 0) {
                    // Toast.show({text:`部分提交成功：${bindDamageSuccessReses.length}/${cameraReses.length}`})
                    dispatch({
                        type: actionTypes.imageListForDemageType.upload_ImageAtDemage_partSuccess,
                        payload: {demageImageList: bindDamageSuccessReses, failedMsg: '部分失败'}
                    })
                    Alert.alert(
                        '',
                        `部分提交成功：${bindDamageSuccessReses.length}/${cameraReses.length}`,
                        [
                            {text: '确定', onPress: () =>  console.log("success"), style: 'cancel'},
                        ],
                        {cancelable: false}
                    )
                } else {
                    // Toast.show({text:'提交全部失败！'})
                    dispatch({
                        type: actionTypes.imageListForDemageType.upload_ImageAtDemage_failed,
                        payload: {failedMsg: '全部失败'}
                    })
                    Alert.alert(
                        '',
                        '提交全部失败！',
                        [
                            {text: '确定', onPress: () =>  console.log("success"), style: 'cancel'},
                        ],
                        {cancelable: false}
                    )
                }
            } else {
                // Toast.show({text:'提交全部失败！'})
                dispatch({
                    type: actionTypes.imageListForDemageType.upload_ImageAtDemage_failed,
                    payload: {failedMsg: '全部失败'}
                })
                Alert.alert(
                    '',
                    '提交全部失败！',
                    [
                        {text: '确定', onPress: () =>  console.log("success"), style: 'cancel'},
                    ],
                    {cancelable: false}
                )
            }
        } else {
            // Toast.show({text:'拍照全部失败！'})
            dispatch({
                type: actionTypes.imageListForDemageType.upload_ImageAtDemage_failed,
                payload: {failedMsg: '拍照全部失败'}
            })
            Alert.alert(
                '',
                '拍照全部失败！',
                [
                    {text: '确定', onPress: () =>  console.log("success"), style: 'cancel'},
                ],
                {cancelable: false}
            )
        }
    }
    catch (err) {
        // Toast.show({text:`提交全部失败！${err}`})
        dispatch({type: actionTypes.imageListForDemageType.upload_ImageAtDemage_error, payload: {errorMsg: err}})
        Alert.alert(
            '',
            `提交全部失败！${err}`,
            [
                {text: '确定', onPress: () =>  console.log("success"), style: 'cancel'},
            ],
            {cancelable: false}
        )
    }
}

export const delImage = param => async (dispatch, getState) => {
    const {
        userReducer: {data: {user: {userId}}},
        imageListForDemageReducer: {data: {recordId}}
    } = getState()
    const {communicationSettingReducer: {data: {record_host}}} = getState()
    dispatch({type: actionTypes.imageListForDemageType.del_ImageAtDemage_waiting, payload: {}})
    try {
        const url = `${record_host}/user/${userId}/record/${recordId}/damageImage/${param}`
        const res = await httpRequest.del(url)
        if (res.success) {
            // Toast.show({text:'图片删除成功！'})
            dispatch({type: actionTypes.imageListForDemageType.del_ImageAtDemage_success, payload: {imageurl: param}})
            Alert.alert(
                '',
                '图片删除成功！',
                [
                    {text: '确定', onPress: () =>  console.log("success"), style: 'cancel'},
                ],
                {cancelable: false}
            )
        } else {
            // Toast.show({text:`图片删除失败：${res.msg}`})
            dispatch({
                type: actionTypes.imageListForDemageType.del_ImageAtDemage_failed,
                payload: {failedMsg: res.msg}
            })
            Alert.alert(
                '',
                `图片删除失败：${res.msg}`,
                [
                    {text: '确定', onPress: () =>  console.log("success"), style: 'cancel'},
                ],
                {cancelable: false}
            )
        }

    } catch (err) {
        // Toast.show({text:`图片删除失败：${err}`})
        dispatch({type: actionTypes.imageListForDemageType.del_ImageAtDemage_error, payload: {errorMsg: err}})
        Alert.alert(
            '',
            `图片删除失败：${err}`,
            [
                {text: '确定', onPress: () =>  console.log("success"), style: 'cancel'},
            ],
            {cancelable: false}
        )
    }
}
