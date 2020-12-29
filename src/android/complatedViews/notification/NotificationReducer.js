import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
       notification: [],
    },
    getNotification: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
}

export default handleActions({
    [(actionTypes.notificationActionTypes.notification_success)]: (state, action) => {
        const {payload: {notification}} = action
        return {
            ...state,
            data: {
                notification,
            },
            getNotification: {
                ...state.getNotification,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.notificationActionTypes.notification_failed)]: (state, action) => {
        const {payload: {failedMsg}} = action
        return {
            ...state,
            getNotification: {
                ...state.getNotification,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.notificationActionTypes.notification_error)]: (state, action) => {
        const {payload: {errorMsg}} = action
        return {
            ...state,
            getNotification: {
                ...state.getNotification,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.notificationActionTypes.notification_waiting)]: (state, action) => {
        return {
            ...initialState,
            getNotification: {
                ...initialState.getNotification,
                isResultStatus: 1
            }
        }
    },
},initialState)
