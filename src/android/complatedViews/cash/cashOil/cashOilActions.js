import * as reduxActionTypes from '../../../../actionTypes'
import * as reduxActions from '../../../../actions'
import httpRequest from '../../../../util/HttpRequest'
import { sleep } from '../../../../util/util'

const pageSize = 20

export const getCashOilList = () => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { drive_id } } } } = getState()
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/driveExceedOilRel?driveId=${drive_id}&start=0&size=${pageSize}&paymentType=2&paymentStatus=1`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: reduxActionTypes.cashOil.get_cashOilList_success,
                payload: {
                    cashOilList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({ type: reduxActionTypes.cashOil.get_cashOilList_failed, payload: { failedMsg: `${res.msg}` } })

        }

    } catch (err) {
        dispatch({ type: reduxActionTypes.cashOil.get_cashOilList_error, payload: { errorMsg: `${err}` } })
    }
}

export const getCashOilListWaiting = () => async (dispatch) => {
    dispatch({ type: reduxActionTypes.cashOil.get_cashOilList_waiting })
}


export const getCashOilListMore = () => async (dispatch, getState) => {
    const {
        loginReducer: { data: { user: { drive_id } } },
        cashOilReducer: { data: { cashOilList, isComplete } },
        cashOilReducer } = getState()
    const { communicationSettingReducer: { data: { base_host } } } = getState()


    if (cashOilReducer.getCashOilListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getCashOilListMore())
    } else {
        if (!isComplete) {
            dispatch({ type: reduxActionTypes.cashOil.get_cashOilListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/driveExceedOilRel?driveId=${drive_id}&start=${cashOilList.length}&size=${pageSize}&paymentType=2&paymentStatus=1`
                const res = await httpRequest.get(url)
                if (res.success) {
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({ type: reduxActionTypes.cashOil.get_cashOilListMore_success, payload: { cashOilList: res.result, isComplete: true } })
                    } else {
                        dispatch({ type: reduxActionTypes.cashOil.get_cashOilListMore_success, payload: { cashOilList: res.result, isComplete: false } })
                    }
                } else {
                    dispatch({ type: reduxActionTypes.cashOil.get_cashOilListMore_failed, payload: { failedMsg: `${res.msg}` } })
                }
            } catch (err) {
                dispatch({ type: reduxActionTypes.cashOil.get_cashOilListMore_error, payload: { errorMsg: `${err}` } })
            }
        } else {
            // ToastAndroid.showWithGravity('已全部加载完毕！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    }
}