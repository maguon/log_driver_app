import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import * as actions from '../index'
import {Actions} from 'react-native-router-flux'
import {InteractionManager} from 'react-native'

export const changeTaskStatus = reqParam => async (dispatch, getState) => {
    try {
        //  console.log('reqParam', reqParam)
        dispatch({ type: actionTypes.taskForInstructExecutingActionType.change_taskStatusForInstructExecuting_waiting, payload: {} })
        const { loginReducer: { data: { user: { uid } }},communicationSettingReducer:{data:{base_host} } }= getState()
        const url = `${base_host}/user/${uid}/dpRouteTask/${reqParam.taskId}/taskStatus/${reqParam.taskStatus}`
        // console.log('url', url)
        const res = await httpRequest.put(url, {})
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.taskForInstructExecutingActionType.change_taskStatusForInstructExecuting_success, payload: { data: {} } })
            dispatch(actions.mileageInfoAction.getMileageInfo())
            dispatch(actions.routeTaskListForHomeAction.getRouteTaskListForHome())
            if(reqParam.taskStatus==9){
                Actions.pop()
                InteractionManager.runAfterInteractions(()=>{
                    dispatch(actions.taskListForHomeAction.getTaskListForHome())
                })
            }else{
                dispatch(actions.taskListForHomeAction.getTaskListForHome())
            }

        } else {
            dispatch({ type: actionTypes.taskForInstructExecutingActionType.change_taskStatusForInstructExecuting_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({ type: actionTypes.taskForInstructExecutingActionType.change_taskStatusForInstructExecuting_error, payload: { errorMsg: `${err}` } })
    }
}
