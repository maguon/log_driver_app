import httpRequest from "../../util/HttpRequest";
import * as actionTypes from "../../actionTypes/index";
import { ObjectToUrl } from '../../util/ObjectToUrl'
import {Alert} from "react-native";
import { Actions } from 'react-native-router-flux'


export const setMyCamera = (param) => async (dispatch, getState) => {
    const {  loginReducer: { data: { user: { uid } } } } = getState()
    try {
        const url = `http://stg.myxxjs.com:9002/api/user/${uid}/video?${ObjectToUrl({ videoType:1 })}&${ObjectToUrl({ userType:10})}`
        const array=param.split("/")
        const name=array[array.length-1];
        // console.log("222",url)
        const res = await httpRequest.postVideo(url, {
            key:'file', param,name:name
        })

        if (res.success) {
            console.log("id",res.result.id)
            dispatch({ type: actionTypes.myCameraActionType.my_Camera_success, payload: {id:param } })
            Alert.alert(
                '',
                `上传成功！`,
                [
                    {text: '确定', onPress: () =>  Actions.pop(), style: 'cancel'},
                ],
                {cancelable: false}
            )
        } else {
            dispatch({ type: actionTypes.myCameraActionType.my_Camera_failed, payload: { failedMsg: res.msg } })
            Alert.alert(
                '',
                `上传失败:${res.msg}!`,
                [
                    {text: '确定', onPress: () =>  console.log("success"), style: 'cancel'},
                ],
                {cancelable: false}
            )
        }
    } catch (err) {
        dispatch({ type: actionTypes.myCameraActionType.my_Camera_error, payload: { errorMsg: err } })
        Alert.alert(
            '',
            `上传失败:${err}!`,
            [
                {text: '确定', onPress: () =>  console.log("success"), style: 'cancel'},
            ],
            {cancelable: false}
        )
    }
}



