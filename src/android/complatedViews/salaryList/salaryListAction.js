import httpRequest from '../../../util/HttpRequest'
import * as reduxActionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { sleep } from '../../../util/util'

const pageSize = 10

export const getSalaryList = () => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { drive_id } } },
            communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/driveSalary?${ObjectToUrl({
            driveId: drive_id,
            start: 0,
            size: pageSize
        })}`
        const res = await httpRequest.get(url)
        console.log('res',res)
        if (res.success) {
            dispatch({
                type: reduxActionTypes.salaryList.get_salaryLst_success, payload: {
                    isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0),
                    salaryList: res.result
                }
            })
        } else {
            dispatch({ type: reduxActionTypes.salaryList.get_salaryLst_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: reduxActionTypes.salaryList.get_salaryLst_error, payload: { errorMsg: `${err}` } })
    }
}

export const getSalaryListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.salaryList.get_salaryLst_waiting, payload: {} })
}

export const getSalaryListMore = () => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } },
        loginReducer: { data: { user: { drive_id } } }, salaryListReducer,
        salaryListReducer: { data: { salaryList, isCompleted } } } = getState()
    if (salaryListReducer.getSalaryListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getSalaryListMore)
    } else {
        if (!isCompleted) {
            dispatch({ type: reduxActionTypes.salaryList.get_salaryLstMore_waiting, payload: {} })
            try {
                const url = `${base_host}/driveSalary?${ObjectToUrl({
                    driveId: drive_id,
                    start: salaryList.length,
                    size: pageSize
                })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    dispatch({
                        type: reduxActionTypes.salaryList.get_salaryLstMore_success, payload: {
                            salaryList: res.result,
                            isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0),
                        }
                    })
                } else {
                    dispatch({ type: reduxActionTypes.salaryList.get_salaryLstMore_failed, payload: { failedMsg: `${res.msg}` } })
                }
            } catch (err) {
                console.log('err', err)
                dispatch({ type: reduxActionTypes.salaryList.get_salaryLstMore_error, payload: { errorMsg: `${err}` } })
            }
        }
    }
}