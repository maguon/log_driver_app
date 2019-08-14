import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'
import { sleep } from '../../util/util'
import { ToastAndroid } from 'react-native'
import { getFormValues } from 'redux-form'

const pageSize = 50
export const getTaskLoanList = () => async (dispatch, getState) => {
    try {
        const state = getState()
        const searchTaskLoanFormValues = getFormValues('searchTaskLoanForm')(state)
        const { loginReducer: { data: { user: { drive_id } },url:{base_host} } } = state
        const url = `${base_host}/dpRouteTaskLoan?${ObjectToUrl({
            driveId: drive_id,
            taskLoanStatusArr: searchTaskLoanFormValues && searchTaskLoanFormValues.taskLoanStatusArr && searchTaskLoanFormValues.taskLoanStatusArr.id ? `${searchTaskLoanFormValues.taskLoanStatusArr.id}` : '2,3',
            applyDateStart: searchTaskLoanFormValues && searchTaskLoanFormValues.applyDateStart ? `${searchTaskLoanFormValues.applyDateStart}` : null,
            applyDateEnd: searchTaskLoanFormValues && searchTaskLoanFormValues.applyDateEnd ? `${searchTaskLoanFormValues.applyDateEnd}` : null,
            start: 0,
            size: pageSize
        })}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        if (res.success) {
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                ToastAndroid.show('数据已全部加载完毕！', 10)
                dispatch({ type: actionTypes.taskLoanListActionType.get_taskLoanList_success, payload: { taskLoanList: res.result, isComplete: true } })
            } else {
                dispatch({ type: actionTypes.taskLoanListActionType.get_taskLoanList_success, payload: { taskLoanList: res.result, isComplete: false } })
            }
        } else {
            dispatch({ type: actionTypes.taskLoanListActionType.get_taskLoanList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.taskLoanListActionType.get_taskLoanList_error, payload: { errorMsg: err } })
    }
}

export const getTaskLoanListMore = () => async (dispatch, getState) => {
    const state = getState()

    const { taskLoanListReducer: { data: { taskLoanList, isComplete } }, taskLoanListReducer,
        loginReducer: { data: { user: { drive_id } },url:{base_host} } } = state
    const searchTaskLoanFormValues = getFormValues('searchTaskLoanForm')(state)
    if (taskLoanListReducer.getTaskLoanListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getTaskLoanListMore())
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.taskLoanListActionType.get_taskLoanListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/dpRouteTaskLoan?${ObjectToUrl({
                    driveId: drive_id,
                    taskLoanStatusArr: searchTaskLoanFormValues && searchTaskLoanFormValues.taskLoanStatusArr && searchTaskLoanFormValues.taskLoanStatusArr.id ? `${searchTaskLoanFormValues.taskLoanStatusArr.id}` : '2,3',
                    applyDateStart: searchTaskLoanFormValues && searchTaskLoanFormValues.applyDateStart ? `${searchTaskLoanFormValues.applyDateStart}` : null,
                    applyDateEnd: searchTaskLoanFormValues && searchTaskLoanFormValues.applyDateEnd ? `${searchTaskLoanFormValues.applyDateEnd}` : null,
                    start: taskLoanList.length,
                    size: pageSize
                })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    dispatch({
                        type: actionTypes.taskLoanListActionType.get_taskLoanListMore_success,
                        payload: {
                            taskLoanList: res.result,
                            isComplete: (res.result.length % pageSize != 0 || res.result.length == 0)
                        }
                    })
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        ToastAndroid.show('数据已全部加载完毕！', 10)
                    }
                } else {
                    dispatch({ type: actionTypes.taskLoanListActionType.get_taskLoanListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                dispatch({ type: actionTypes.taskLoanListActionType.get_taskLoanListMore_error, payload: { errorMsg: err } })
            }
        }
    }
}

export const getTaskLoanListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.taskLoanListActionType.get_taskLoanList_waiting })
}
