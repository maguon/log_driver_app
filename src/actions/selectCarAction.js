import httpRequest from '../util/HttpRequest'
import { base_host, record_host, file_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'
import { sleep } from '../util/util'
import { getFormValues } from 'redux-form'
import { ToastAndroid } from 'react-native'

const pageSize = 10

export const getCarList = () => async (dispatch, getState) => {
    try {
        const searchFormValues = getFormValues('searchCarForm')(getState())
        const url = `${base_host}/carList?${ObjectToUrl({
            vinCode: searchFormValues ? searchFormValues.vin : null,
            start: 0,
            active: 1,
            size: pageSize
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            if (res.result.length % pageSize != 0) {
                dispatch({ type: actionTypes.selectCarActionTypes.get_selectCarList_success, payload: { carList: res.result, isComplete: true } })
            } else {
                dispatch({ type: actionTypes.selectCarActionTypes.get_selectCarList_success, payload: { carList: res.result, isComplete: false } })
            }
        } else {
            dispatch({ type: actionTypes.selectCarActionTypes.get_selectCarList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.selectCarActionTypes.get_selectCarList_error, payload: { errorMsg: err } })
    }
}

export const getCarListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.selectCarActionTypes.get_selectCarList_waiting, payload: {} })
}


export const cleanCarList = () => (dispatch) => {
    dispatch({ type: actionTypes.selectCarActionTypes.clean_selectCarList, payload: {} })
}
