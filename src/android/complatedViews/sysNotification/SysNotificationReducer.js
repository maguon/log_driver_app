import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        sysNotificationList: [],
        isComplete: false
    },
    getSysNotificationList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
    getSysNotificationListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.sysNotificationActionTypes.sys_Notification_success)]: (state, action) => {
        const {payload: {sysNotificationList, isComplete}} = action
        return {
            ...state,
            data: {
                sysNotificationList,
                isComplete,
            },
            getSysNotificationList: {
                ...state.getSysNotificationList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.sysNotificationActionTypes.sys_Notification_failed)]: (state, action) => {
        const {payload: {failedMsg}} = action
        return {
            ...state,
            getSysNotificationList: {
                ...state.getSysNotificationList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.sysNotificationActionTypes.sys_Notification_error)]: (state, action) => {
        const {payload: {errorMsg}} = action
        return {
            ...state,
            getSysNotificationList: {
                ...state.getSysNotificationList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.sysNotificationActionTypes.sys_Notification_waiting)]: (state, action) => {
        return {
            ...initialState,
            getSysNotificationList: {
                ...initialState.getSysNotificationList,
                isResultStatus: 1
            }
        }
    },



    [actionTypes.sysNotificationActionTypes.sys_NotificationMore_success]: (state, action) => {
        const { payload: { getSysNotificationList, isComplete } } = action
        return {
            ...state,
            data: {
                getSysNotificationList: [...state.data.getSysNotificationList, ...getSysNotificationList],
                isComplete
            },
            getSysNotificationListMore: {
                ...initialState.getSysNotificationListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.sysNotificationActionTypes.sys_NotificationMore_waiting]: (state, action) => {
        return {
            ...state,
            getSysNotificationListMore: {
                ...initialState.getSysNotificationListMore,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.sysNotificationActionTypes.sys_NotificationMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getSysNotificationListMore: {
                ...initialState.getSysNotificationListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.sysNotificationActionTypes.sys_NotificationMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getSysNotificationListMore: {
                ...initialState.getSysNotificationListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
},initialState)
