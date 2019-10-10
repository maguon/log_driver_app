import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'
import { getFormValues } from 'redux-form'


const pageSize = 10

export const getCarList = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host} } } = getState()
        const searchFormValues = getFormValues('searchCarForm')(getState())
        const url = `${base_host}/carList?${ObjectToUrl({
            vinCode: searchFormValues ? searchFormValues.vin : null,
            start: 0,
            carStatusArr: '1,2',
            size: pageSize,
            ...req
        })}`
         // console.log('url',url)
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.searchCarType.search_carListForSelect_success, payload: { carList: res.result } })
        } else {
            dispatch({ type: actionTypes.searchCarType.search_carListForSelect_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.searchCarType.search_carListForSelect_error, payload: { errorMsg: err } })
    }
}

export const getCarListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.searchCarType.search_carListForSelect_waiting, payload: {} })
}


export const cleanCarList = () => (dispatch) => {
    dispatch({ type: actionTypes.searchCarType.clean_search_carListForSelect, payload: {} })
}
