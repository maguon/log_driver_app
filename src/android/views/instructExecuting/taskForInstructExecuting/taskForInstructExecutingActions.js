import httpRequest from '../../../../util/HttpRequest'
import * as reduxActionTypes from '../../../../actionTypes/index'
import * as reduxActions from '../../../../actions/index'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'
import {Actions} from 'react-native-router-flux'
import {InteractionManager} from 'react-native'

export const changeTaskStatus = reqParam => async (dispatch, getState) => {
    try {
        //  console.log('reqParam', reqParam)
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
            dispatch(reduxActions.routeTaskListForHome.getRouteTaskListForHome())
            if(reqParam.taskStatus==9){
                Actions.pop()
                InteractionManager.runAfterInteractions(()=>{
                    dispatch(reduxActions.taskListForHome.getTaskListForHome())
                })
            }else{
                dispatch(reduxActions.taskListForHome.getTaskListForHome())
            }

        } else {
            dispatch({ type: reduxActionTypes.taskForInstructExecuting.change_taskStatusForInstructExecuting_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({ type: reduxActionTypes.taskForInstructExecuting.change_taskStatusForInstructExecuting_error, payload: { errorMsg: `${err}` } })
    }
}