import * as reduxActionTypes from '../../../actionTypes'
import * as reduxActions from '../../../actions'
import httpRequest from '../../../util/HttpRequest'

import { ToastAndroid } from 'react-native'
import * as login from '../../complatedViews/login/LoginAction'
import localStorage from "../../../util/LocalStorage";
import localStorageKey from "../../../util/LocalStorageKey";

export const getNotification = param => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        // console.log('param', param)
        const { id } = param
        const { loginReducer: { data: { user: { uid } } } } = getState()

        const url = `${base_host}/user/${uid}/sysNotification/${id}/`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        const sysNotList = await localStorage.load({key: localStorageKey.SYSNOTIFICATIONLIST})

        if (res.success) {
            dispatch({ type: reduxActionTypes.notificationActionTypes.notification_success, payload: {notification:res.result[0]} })
            dispatch({ type: reduxActionTypes.sysNotificationActionTypes.sys_readStatus_success, payload: { readId:id,sysNotList:sysNotList } })
        } else {
            dispatch({ type: reduxActionTypes.notificationActionTypes.notification_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.notificationActionTypes.notification_error, payload: { errorMsg: `${err}` } })
    }
}


export const getNotificationListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.notificationActionTypes.notification_waiting,payload: {} })

}
