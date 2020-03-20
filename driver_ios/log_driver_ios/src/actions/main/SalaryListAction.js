import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'
import { sleep } from '../../util/util'

const pageSize = 10

export const getSalaryList = () => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { drive_id } } },communicationSettingReducer:{data:{base_host}}} = getState()
        const url = `${base_host}/driveSalaryBase?${ObjectToUrl({
            driveId: drive_id,
            grantStatus:3,
            start: 0,
            size: pageSize
        })}`
        // console.log('url',url)
        const res = await httpRequest.get(url)
        // console.log('res',res)
        if (res.success) {
            dispatch({
                type: actionTypes.salaryListActionType.get_salaryLst_success, payload: {
                    isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0),
                    salaryList: res.result
                }
            })
        } else {
            dispatch({ type: actionTypes.salaryListActionType.get_salaryLst_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({ type: actionTypes.salaryListActionType.get_salaryLst_error, payload: { errorMsg: `${err}` } })
    }
}

export const getSalaryListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.salaryListActionType.get_salaryLst_waiting, payload: {} })
}

export const getSalaryListMore = () => async (dispatch, getState) => {
    const {loginReducer: { data: { user: { drive_id } }}, communicationSettingReducer:{data:{base_host} }, salaryListReducer,
        salaryListReducer: { data: { salaryList, isCompleted } } } = getState()
    if (salaryListReducer.getSalaryListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getSalaryListMore)
    } else {
        if (!isCompleted) {
            dispatch({ type: actionTypes.salaryListActionType.get_salaryLstMore_waiting, payload: {} })
            try {
                const url = `${base_host}/driveSalaryBase?${ObjectToUrl({
                    driveId: drive_id,
                    grantStatus:3,
                    start: salaryList.length,
                    size: pageSize
                })}`
                // console.log('url',url)
                const res = await httpRequest.get(url)
                // console.log('res',res)

                if (res.success) {
                    dispatch({
                        type: actionTypes.salaryListActionType.get_salaryLstMore_success, payload: {
                            salaryList: res.result,
                            isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0),
                        }
                    })
                } else {
                    dispatch({ type: actionTypes.salaryListActionType.get_salaryLstMore_failed, payload: { failedMsg: `${res.msg}` } })
                }
            } catch (err) {
                // console.log('err', err)
                dispatch({ type: actionTypes.salaryListActionType.get_salaryLstMore_error, payload: { errorMsg: `${err}` } })
            }
        }
    }
}
