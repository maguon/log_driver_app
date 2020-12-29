import * as actionTypes from '../../../actionTypes'
import httpRequest from '../../../util/HttpRequest'
import { ToastAndroid } from 'react-native'
import {ObjectToUrl} from "../../../util/ObjectToUrl";
import {sleep} from "../../../util/util";


const pageSize = 50

export const getSysNotification = () => async (dispatch, getState) => {
    try {
        const state = getState()
        const { loginReducer: { data: { user: { uid } } } } = state
        const { communicationSettingReducer: { data: { base_host } } } = getState()

        const url = `${base_host}/user/${uid}/sysNotification?${ObjectToUrl({start: 0, size: pageSize })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)

        if (res.success) {
            console.log('res.result.length', res.result)
            dispatch({
                type: actionTypes.sysNotificationActionTypes.sys_Notification_success,
                payload: {
                    sysNotificationList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0)
                }

            })

        } else {
            dispatch({ type: actionTypes.sysNotificationActionTypes.sys_Notification_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
         dispatch({ type: actionTypes.sysNotificationActionTypes.sys_Notification_error, payload: { errorMsg: err } })
    }
}


export const getSysNotificationListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.sysNotificationActionTypes.sys_Notification_waiting, payload: {} })
}

export const getSysNotificationListMore = () => async (dispatch, getState) => {
    const state = getState()
    const { communicationSettingReducer: { data: { base_host } } } = getState()

    const {
        loginReducer: { data: { user: { uid } } },
        sysNotificationReducer: { data: { sysNotificationList, isComplete } }, sysNotificationReducer } = state

    if (sysNotificationReducer.getSysNotificationListMore.isResultStatus == 1) {
        await sleep(1000)
        getSysNotificationListMore()(dispatch, getState)
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.sysNotificationActionTypes.sys_NotificationMore_waiting, payload: {} })
            try {
                const url = `${base_host}/user/${uid}/sysNotification?${ObjectToUrl({ start: sysNotificationList.length, size: pageSize })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({ type: actionTypes.sysNotificationActionTypes.sys_NotificationMore_success,
                            payload: { sysNotificationList: res.result, isComplete: true } })
                    } else {
                        dispatch({ type: actionTypes.sysNotificationActionTypes.sys_NotificationMore_success,
                            payload: { sysNotificationList: res.result, isComplete: false } })
                    }
                } else {
                    dispatch({ type: actionTypes.sysNotificationActionTypes.sys_NotificationMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                dispatch({ type: actionTypes.sysNotificationActionTypes.sys_NotificationMore_error, payload: { errorMsg: err } })
            }
        } else {
            ToastAndroid.showWithGravity('已全部加载完毕！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    }
}

