import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'
import {Alert} from 'react-native'


export const uploadAccidentImageWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.applyAccidentImageAcyionType.upload_ImageAtApplyAccident_waiting, payload: {} })
}

export const uploadAccidentImage = param => async (dispatch, getState) => {

    try {
        const { communicationSettingReducer: { data: { record_host, file_host} } } = getState()
        const { cameraReses } = param

        const cameraSuccessReses = cameraReses.filter(item => item.success)
        if (cameraSuccessReses.length > 0) {
            const { loginReducer: { data: { user } },
                applyAccidentReducer: { data: { accidentId, truckNum } }
            } = getState()
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
                    vheNo: truckNum
                })))
                const bindDamageSuccessReses = bindDamageReses
                    .map((item, index) => { return { imageId: imageUploadSuccessReses[index].imageId, success: item.success } })
                    .filter(item => item.success)
                    .map(item => item.imageId)
                if (cameraReses.length === bindDamageSuccessReses.length) {
                    // ToastAndroid.showWithGravity('提交成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    Alert.alert(
                        '',
                        '提交成功！',
                        [
                            {text: '确定', onPress: () =>   dispatch({ type: actionTypes.applyAccidentImageAcyionType.upload_ImageAtApplyAccident_success, payload: { accidentImageList: bindDamageSuccessReses } }), style: 'cancel'},
                        ],
                        {cancelable: false}
                    )

                } else if (bindDamageSuccessReses.length > 0) {
                    // ToastAndroid.showWithGravity(`部分提交成功：${bindDamageSuccessReses.length}/${cameraReses.length}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    Alert.alert(
                        '',
                        `部分提交成功：${bindDamageSuccessReses.length}/${cameraReses.length}`,
                        [
                            {text: '确定', onPress: () =>   dispatch({ type: actionTypes.applyAccidentImageAcyionType.upload_ImageAtApplyAccident_partSuccess, payload: { accidentImageList: bindDamageSuccessReses, failedMsg: '部分失败' } }), style: 'cancel'},
                        ],
                        {cancelable: false}
                    )

                } else {
                    // ToastAndroid.showWithGravity('提交全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    Alert.alert(
                        '',
                        '提交全部失败！',
                        [
                            {text: '确定', onPress: () =>   dispatch({ type: actionTypes.applyAccidentImageAcyionType.upload_ImageAtApplyAccident_failed, payload: { failedMsg: '全部失败' } }), style: 'cancel'},
                        ],
                        {cancelable: false}
                    )

                }
            } else {
                // ToastAndroid.showWithGravity('提交全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                Alert.alert(
                    '',
                    '提交全部失败！',
                    [
                        {text: '确定', onPress: () =>  dispatch({ type: actionTypes.applyAccidentImageAcyionType.upload_ImageAtApplyAccident_failed, payload: { failedMsg: '全部失败' } }), style: 'cancel'},
                    ],
                    {cancelable: false}
                )

            }
        } else {
            // ToastAndroid.showWithGravity('拍照全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            Alert.alert(
                '',
                '拍照全部失败！',
                [
                    {text: '确定', onPress: () =>   dispatch({ type: actionTypes.applyAccidentImageAcyionType.upload_ImageAtApplyAccident_failed, payload: { failedMsg: '拍照全部失败' } }), style: 'cancel'},
                ],
                {cancelable: false}
            )

        }
    }
    catch (err) {
        // ToastAndroid.showWithGravity(`提交全部失败！${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        Alert.alert(
            '',
            `提交全部失败！${err}`,
            [
                {text: '确定', onPress: () => dispatch({ type: actionTypes.applyAccidentImageAcyionType.upload_ImageAtApplyAccident_error, payload: { errorMsg: err } }), style: 'cancel'},
            ],
            {cancelable: false}
        )

    }
}
