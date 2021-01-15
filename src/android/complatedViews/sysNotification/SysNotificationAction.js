import * as actionTypes from '../../../actionTypes'
import httpRequest from '../../../util/HttpRequest'
import {ToastAndroid} from 'react-native'
import {ObjectToUrl} from "../../../util/ObjectToUrl";
import {sleep} from "../../../util/util";
import localStorageKey from '../../../util/LocalStorageKey'
import localStorage from '../../../util/LocalStorage'
import moment from "moment";

const pageSize = 20

const nowTime = moment(Date.now()).format('YYYY-MM-DD')
const preTime = moment(Date.now() - (60 * 10 * 1000) * 6 * 24 * 7).format('YYYY-MM-DD')
export const getSysNotification = () => async (dispatch, getState) => {
    try {
        const state = getState()
        const {loginReducer: {data: {user: {uid}}}} = state
        const {communicationSettingReducer: {data: {base_host}}} = getState()

        const url = `${base_host}/user/${uid}/sysNotification?${ObjectToUrl({
            status: 1,
            createdOnStart: preTime,
            createdOnEnd: nowTime,
        })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)

        if (res.success) {
            //读取数组 并加未读状态
             let resList = res.result.map(item => ({...item, readStatus: 1}))
           let sysNotList=[]
            try{
                sysNotList = await localStorage.load({key: localStorageKey.SYSNOTIFICATIONLIST})
            }catch (err){
                console.log("err",err)
            }
            const hidden=sysNotList?true:false
            //判断本地保存是否为null
            if (hidden) {
                //遍历新数组 把相同项合并
                for (let i = 0; i < resList.length; i++) {
                    for (let j = 0; j < sysNotList.length; j++) {
                        if (resList[i].id === sysNotList[j].id) {
                            resList[i].readStatus=sysNotList[j].readStatus
                        }
                    }
                }
                // console.log('sysNotList', sysNotList)
                // console.log("resList",resList)
            }

            localStorage.save({key: localStorageKey.SYSNOTIFICATIONLIST, data: resList})
            dispatch({
                type: actionTypes.sysNotificationActionTypes.sys_Notification_success,
                payload: {sysNotificationList: resList}
            })
        } else {
            dispatch({
                type: actionTypes.sysNotificationActionTypes.sys_Notification_failed,
                payload: {failedMsg: res.msg}
            })
        }
    } catch (err) {
        dispatch({type: actionTypes.sysNotificationActionTypes.sys_Notification_error, payload: {errorMsg: err}})
    }
}



export const getSysNotificationAll = () => async (dispatch, getState) => {
    try {
        const state = getState()
        const {loginReducer: { data: { user: { uid } } }} = state
        const { communicationSettingReducer: { data: { base_host } }} = getState()


        const url = `${base_host}/user/${uid}/sysNotification?${ObjectToUrl({start: 0, size: pageSize })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            let resList = res.result.map(item => ({...item, readStatus: 0}))
            let sysNotList=[]
            try{
                sysNotList = await localStorage.load({key: localStorageKey.SYSNOTIFICATIONLIST})
            }catch (err){
                console.log("err",err)
            }
            console.log('sysNotList', sysNotList)
            for (let i = 0; i < resList.length; i++) {
                for (let j = 0; j < sysNotList.length; j++) {
                    if (resList[i].id === sysNotList[j].id) {
                        resList[i].readStatus=sysNotList[j].readStatus
                    }
                }
            }

            dispatch({
                type: actionTypes.sysNotificationActionTypes.sys_NotificationAll_success,
                payload: {
                    sysNotificationList:sysNotList,
                    sysNotificationListAll:resList,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0)
                }

            })

        } else {
            dispatch({ type: actionTypes.sysNotificationActionTypes.sys_NotificationAll_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.sysNotificationActionTypes.sys_NotificationAll_error, payload: { errorMsg: err } })
    }
}

export const getSysNotificationListWaiting = () => (dispatch) => {
    dispatch({type: actionTypes.sysNotificationActionTypes.sys_Notification_waiting, payload: {}})
}

export const getSysNotificationListMore = () => async (dispatch, getState) => {
    const state = getState()
    const { communicationSettingReducer: { data: { base_host } } } = getState()

    const {
        loginReducer: { data: { user: { uid } } },
        sysNotificationReducer: { data: {sysNotificationListAll, isComplete } }, sysNotificationReducer } = state

    if (sysNotificationReducer.getSysNotificationListMore.isResultStatus == 1) {
        await sleep(1000)
        getSysNotificationListMore()(dispatch, getState)
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.sysNotificationActionTypes.sys_NotificationMore_waiting, payload: {} })
            try {
                const url = `${base_host}/user/${uid}/sysNotification?${ObjectToUrl({ start: sysNotificationListAll.length, size: pageSize })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    let resList = res.result.map(item => ({...item, readStatus: 0}))
                    let sysNotList=[]
                    try{
                        sysNotList = await localStorage.load({key: localStorageKey.SYSNOTIFICATIONLIST})
                    }catch (err){
                        console.log("err",err)
                    }
                    for (let i = 0; i < resList.length; i++) {
                        for (let j = 0; j < sysNotList.length; j++) {
                            if (resList[i].id === sysNotList[j].id) {
                                resList[i].readStatus=sysNotList[j].readStatus
                            }
                        }
                    }
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({ type: actionTypes.sysNotificationActionTypes.sys_NotificationMore_success,
                            payload: { sysNotificationListAll: resList, isComplete: true } })
                    } else {
                        dispatch({ type: actionTypes.sysNotificationActionTypes.sys_NotificationMore_success,
                            payload: { sysNotificationListAll: resList, isComplete: false } })
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



