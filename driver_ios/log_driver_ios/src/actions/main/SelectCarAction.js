import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'
import { getFormValues } from 'redux-form'


const pageSize = 10

export const getCarList = () => async (dispatch, getState) => {
    try {
        const searchFormValues = getFormValues('searchCarForm')(getState())
        const { loginReducer: { url: { base_host } } } = getState()

        const url = `${base_host}/carList?${ObjectToUrl({
            vinCode: searchFormValues ? searchFormValues.vin : null,
            start: 0,
            active: 1,
            size: pageSize
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            if (res.result.length % pageSize != 0) {
                dispatch({ type: actionTypes.selectCarActionType.get_selectCarList_success, payload: { carList: res.result, isComplete: true } })
            } else {
                dispatch({ type: actionTypes.selectCarActionType.get_selectCarList_success, payload: { carList: res.result, isComplete: false } })
            }
        } else {
            dispatch({ type: actionTypes.selectCarActionType.get_selectCarList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.selectCarActionType.get_selectCarList_error, payload: { errorMsg: err } })
    }
}

export const getCarListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.selectCarActionType.get_selectCarList_waiting, payload: {} })
}


export const cleanCarList = () => (dispatch) => {
    dispatch({ type: actionTypes.selectCarActionType.clean_selectCarList, payload: {} })
}
