import httpRequest from '../../../../util/HttpRequest'
import * as reduxActionTypes from '../../../../actionTypes/index'
import * as reduxActions from '../../../../actions/index'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'

export const changeTaskStatus = reqParam => async (dispatch, getState) => {
    try {
        // console.log('reqParam', reqParam)
        dispatch({ type: reduxActionTypes.taskForInstructExecuting.change_taskStatusForInstructExecuting_waiting, payload: {} })
        const { loginReducer: { data: { user: { uid } } },
            communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/user/${uid}/dpRouteTask/${reqParam.taskId}/taskStatus/${reqParam.taskStatus}`
        // console.log('url', url)
        const res = await httpRequest.put(url, {})
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.taskForInstructExecuting.change_taskStatusForInstructExecuting_success, payload: { data: {} } })
            dispatch(reduxActions.mileageInfo.getMileageInfo())
            dispatch(reduxActions.taskListForHome.getTaskListForHome())
            dispatch(reduxActions.routeTaskListForHome.getRouteTaskListForHome())
            // dispatch(homeAction.getMileageInfo({
            //     mileageInfoParam: {
            //         OptionalParam: {
            //             taskStatus: 9,
            //             loadDistance: 5,
            //             noLoadDistance: 5,
            //             dateIdStart: moment().format('YYYY-MM-01'),
            //             dateIdEnd: moment().format('YYYY-MM-DD')
            //         }
            //     },
            //     truckDispatchParam: {
            //         OptionalParam: {
            //             dispatchFlag: 1
            //         }
            //     },
            //     taskListParam: {
            //         OptionalParam: {
            //             taskStatusArr: '1,2,3,4,9'
            //         }
            //     },
            //     getDriverId: {
            //         requiredParam: {
            //             userId: uid
            //         }
            //     }
            // }))

        } else {
            dispatch({ type: reduxActionTypes.taskForInstructExecuting.change_taskStatusForInstructExecuting_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: reduxActionTypes.taskForInstructExecuting.change_taskStatusForInstructExecuting_error, payload: { errorMsg: `${err}` } })
    }
}