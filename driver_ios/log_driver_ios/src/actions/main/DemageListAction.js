import * as httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'
import { Toast } from 'native-base'
import { sleep } from '../../util/util'
import { getFormValues } from 'redux-form'

const pageSize = 50

export const getDemageList = () => async (dispatch, getState) => {
    const state = getState()
    const { userReducer: { data: { user: { userId } } } } = state
    const { communicationSettingReducer: { data: { base_host} } } = getState()
    let search = getFormValues('demageSearchForm')(state)
    search = search ? search : { car: {} }
    try {
        const url = `${base_host}/damage?${ObjectToUrl({
            declareUserId: userId, start: 0, size: pageSize,
            damageId: search.damageId, vin: search.car.value, createdOnStart: search.createdOnStart, createdOnEnd: search.createdOnEnd
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({ type: actionTypes.demageListType.get_DemageList_success, payload: { demageList: res.result, isComplete: true } })
            } else {
                dispatch({ type: actionTypes.demageListType.get_DemageList_success, payload: { demageList: res.result, isComplete: false } })
            }
        } else {
            dispatch({ type: actionTypes.demageListType.get_DemageList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.demageListType.get_DemageList_error, payload: { errorMsg: err } })
    }
}

export const getDemageListWaiting = () => (dispatch, getState) => {
    dispatch({ type: actionTypes.demageListType.get_DemageList_waiting, payload: {} })
}

export const getDemageListMore = () => async (dispatch, getState) => {
    const state = getState()
    const { communicationSettingReducer: { data: { base_host} } } = getState()
    const {
        userReducer: { data: { user: { userId } } },
        demageListReducer: { data: { demageList, isComplete } },
        demageListReducer } = state
    let search = getFormValues('demageSearchForm')(state)
    search = search ? search : { car: {} }
    if (demageListReducer.getDemageListMore.isResultStatus == 1) {
        await sleep(1000)
        getDemageListMore()(dispatch, getState)
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.demageListType.get_DemageListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/damage?${ObjectToUrl({ declareUserId: userId, start: demageList.length, size: pageSize })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    dispatch({
                        type: actionTypes.demageListType.get_DemageListMore_success,
                        payload: {
                            demageList: res.result,
                            isComplete: (res.result.length % pageSize != 0 || res.result.length == 0)
                        }
                    })
                } else {
                    dispatch({ type: actionTypes.demageListType.get_DemageListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                dispatch({ type: actionTypes.demageListType.get_DemageListMore_error, payload: { errorMsg: err } })
            }
        } else {
            // Toast.show({text:'已全部加载完毕！'})
        }
    }

}
