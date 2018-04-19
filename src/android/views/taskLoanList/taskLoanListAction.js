import httpRequest from '../../../util/HttpRequest'
import { base_host, record_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { sleep } from '../../../util/util'
import { ToastAndroid } from 'react-native'
import { getFormValues } from 'redux-form'

const pageSize = 50
export const getTaskLoanList = () => async (dispatch, getState) => {
    try {
        const state = getState()
        const searchTaskLoanFormValues = getFormValues('searchTaskLoanForm')(state)
        const { truckReducer: { data: { personalInfo } } } = state
        const url = `${base_host}/dpRouteTaskLoan?${ObjectToUrl({
            driveId: personalInfo.drive_id,
            taskLoanStatusArr: searchTaskLoanFormValues && searchTaskLoanFormValues.taskLoanStatusArr && searchTaskLoanFormValues.taskLoanStatusArr.id ? `${searchTaskLoanFormValues.taskLoanStatusArr.id}` : '2,3',
            applyDateStart: searchTaskLoanFormValues && searchTaskLoanFormValues.applyDateStart ? `${searchTaskLoanFormValues.applyDateStart}` : null,
            applyDateEnd: searchTaskLoanFormValues && searchTaskLoanFormValues.applyDateEnd ? `${searchTaskLoanFormValues.applyDateEnd}` : null,
            start: 0,
            size: pageSize
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                ToastAndroid.showWithGravity('数据已全部加载完毕！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: actionTypes.taskLoanListTypes.get_taskLoanList_success, payload: { taskLoanList: res.result, isComplete: true } })
            } else {
                dispatch({ type: actionTypes.taskLoanListTypes.get_taskLoanList_success, payload: { taskLoanList: res.result, isComplete: false } })
            }
        } else {
            dispatch({ type: actionTypes.taskLoanListTypes.get_taskLoanList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.taskLoanListTypes.get_taskLoanList_error, payload: { errorMsg: err } })
    }
}

export const getTaskLoanListMore = () => async (dispatch, getState) => {
    const state = getState()

    const { taskLoanListReducer: { data: { taskLoanList, isComplete } }, taskLoanListReducer,
        truckReducer: { data: { personalInfo } } } = state
    const searchTaskLoanFormValues = getFormValues('searchTaskLoanForm')(state)
    if (taskLoanListReducer.getTaskLoanListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getTaskLoanListMore())
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.taskLoanListTypes.get_taskLoanListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/dpRouteTaskLoan?${ObjectToUrl({
                    driveId: personalInfo.drive_id,
                    taskLoanStatusArr: searchTaskLoanFormValues && searchTaskLoanFormValues.taskLoanStatusArr && searchTaskLoanFormValues.taskLoanStatusArr.id ? `${searchTaskLoanFormValues.taskLoanStatusArr.id}` : '2,3',
                    applyDateStart: searchTaskLoanFormValues && searchTaskLoanFormValues.applyDateStart ? `${searchTaskLoanFormValues.applyDateStart}` : null,
                    applyDateEnd: searchTaskLoanFormValues && searchTaskLoanFormValues.applyDateEnd ? `${searchTaskLoanFormValues.applyDateEnd}` : null,
                    start: taskLoanList.length,
                    size: pageSize
                })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    dispatch({
                        type: actionTypes.taskLoanListTypes.get_taskLoanListMore_success,
                        payload: {
                            taskLoanList: res.result,
                            isComplete: (res.result.length % pageSize != 0 || res.result.length == 0)
                        }
                    })
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        ToastAndroid.showWithGravity('数据已全部加载完毕！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    }
                } else {
                    dispatch({ type: actionTypes.taskLoanListTypes.get_taskLoanListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                dispatch({ type: actionTypes.taskLoanListTypes.get_taskLoanListMore_error, payload: { errorMsg: err } })
            }
        }
    }
}

export const getTaskLoanListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.taskLoanListTypes.get_taskLoanList_waiting })
}