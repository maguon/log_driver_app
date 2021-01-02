import {handleActions} from 'redux-actions'
import * as actionTypes from '../../../actionTypes'
import localStorage from "../../../util/LocalStorage";
import localStorageKey from "../../../util/LocalStorageKey";

const initialState = {
    data: {
        sysNotificationList: [],
    },
    getSysNotificationList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
}

export default handleActions({
    [(actionTypes.sysNotificationActionTypes.sys_Notification_success)]: (state, action) => {
        const {payload: {sysNotificationList}} = action
        return {
            ...state,
            data: {
                sysNotificationList,
            },
            getSysNotificationList: {
                ...state.getSysNotificationList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.sysNotificationActionTypes.sys_readStatus_success]: (state, action) => {
        const {payload: {readId, sysNotList}} = action
        const saveList = sysNotList.map(item => {
            if (item.id == readId) {
                return {...item, readStatus: 0}
            } else {
                return item
            }
        })
        localStorage.save({ key: localStorageKey.SYSNOTIFICATIONLIST, data:saveList})
        return {
            ...state,
            data: {
                ...state.data,
                sysNotificationList: saveList,
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
    }
}, initialState)
