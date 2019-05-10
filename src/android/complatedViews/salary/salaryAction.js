import httpRequest from '../../../util/HttpRequest'
import * as reduxActionTypes from '../../../actionTypes/index'

export const getSalaryTaskList = req => async (dispatch, getState) => {
    try {
        // console.log('req', req)

        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/driveSalaryTaskRel?driveSalaryId=${req.salaryId}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.salary.get_salaryTaskList_success, payload: { salaryTaskList:res.result } })
        } else {
            dispatch({ type: reduxActionTypes.salary.get_salaryTaskList_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        // console.log('err',err)
        dispatch({ type: reduxActionTypes.salary.get_salaryTaskList_waiting, payload: { errorMsg: `${err}` } })
    }
}

export const getSalaryTaskListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.salary.get_salaryTaskList_waiting, payload: {} })
}