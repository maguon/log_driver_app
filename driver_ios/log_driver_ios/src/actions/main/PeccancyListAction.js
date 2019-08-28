import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'
import { sleep } from '../../util/util'
import { Toast} from 'native-base'

const pageSize = 50

export const getPeccancyList = (param) => async (dispatch, getState) => {
    try {
        const { loginReducer: { url: { base_host } } } = getState()
        // console.log('getState()', getState())
         console.log('param', param)
        let searchParam = {}
        if (param) {
            searchParam = {
                startDateStart: param.dateIdStart ? param.dateIdStart : null,
                startDateEnd: param.dateIdEnd ? param.dateIdEnd : null,
            }
        }
        // console.log('searchParam', searchParam)

        const { loginReducer: { data: { user: { drive_id } } } } = getState()
        console.log('drive_id', drive_id)
        console.log('searchParam', searchParam)
        const url = `${base_host}/drivePeccancy?${ObjectToUrl({ driveId: drive_id, start: 0, size: pageSize, ...searchParam })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({
                type: actionTypes.peccancyListActionType.get_peccancyList_success, payload: {
                    peccancyList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0),
                    search: param ? param : null
                }
            })

        } else {
            dispatch({ type: actionTypes.peccancyListActionType.get_peccancyList_failed, payload: { failedMsg: err } })
        }
    }
    catch (err) {
        console.log('err', err)
        dispatch({ type: actionTypes.peccancyListActionType.get_peccancyList_error, payload: { errorMsg: err } })
    }
}

export const getPeccancyListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.peccancyListActionType.get_peccancyList_waiting, payload: {} })
}

export const cleanPeccancyList = () => (dispatch) => {
    dispatch({ type: actionTypes.peccancyListActionType.clean_peccancyList, payload: {} })
}

export const getPeccancyListMore = (param) => async (dispatch, getState) => {
    const state = getState()
    const {
        loginReducer: { data: { user: { drive_id } },url:{base_host} },
        peccancyListReducer: { data: { peccancyList, isComplete, search } },
        peccancyListReducer } = state

    let searchParam = {}
    if (search) {
        searchParam = {
            startDateStart: search.dateIdStart ? search.dateIdStart : null,
            startDateEnd: search.dateIdEnd ? search.dateIdEnd : null,
            statStatus: search.statStatus ? search.statStatus.id : null
        }
    }
    console.log('search'+search)
    if (peccancyListReducer.getPeccancyListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getPeccancyListMore)
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.peccancyListActionType.get_peccancyListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/drivePeccancy?${ObjectToUrl({
                    driveId: drive_id,
                    start: peccancyList.length,
                    size: pageSize,
                    ...searchParam
                })}`
                console.log('url', url)
                const res = await httpRequest.get(url)
                console.log('res', res)
                if (res.success) {
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({ type: actionTypes.peccancyListActionType.get_peccancyListMore_success, payload: { peccancyList: res.result, isComplete: true } })
                    } else {
                        dispatch({ type: actionTypes.peccancyListActionType.get_peccancyListMore_success, payload: { peccancyList: res.result, isComplete: false } })
                    }
                } else {
                    dispatch({ type: actionTypes.peccancyListActionType.get_peccancyListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                console.log('err', err)
                dispatch({ type: actionTypes.peccancyListActionType.get_peccancyListMore_error, payload: { errorMsg: err } })
            }
        } else {
            Toast.show({text:'已全部加载完毕！'})
        }
    }
}
