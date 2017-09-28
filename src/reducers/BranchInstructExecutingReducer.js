import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

const initialState = {
    data: {
        routeLoadTaskList: []
    },
    getRouteLoadTaskList:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [(actionTypes.branchInstructExecutingTypes.GET_RouteLoadTaskListExecuting_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                routeLoadTaskList: data
            },
            getRouteLoadTaskList: {
                ...state.getRouteLoadTaskList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.branchInstructExecutingTypes.GET_RouteLoadTaskListExecuting_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRouteLoadTaskList: {
                ...state.getRouteLoadTaskList,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.branchInstructExecutingTypes.GET_RouteLoadTaskListExecuting_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRouteLoadTaskList: {
                ...state.getRouteLoadTaskList,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.branchInstructExecutingTypes.GET_RouteLoadTaskListExecuting_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRouteLoadTaskList: {
                ...state.getRouteLoadTaskList,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.branchInstructExecutingTypes.GET_RouteLoadTaskListExecuting_WAITING)]: (state, action) => {
        return {
            ...state,
            getRouteLoadTaskList: {
                ...initialState.getRouteLoadTaskList,
                isResultStatus: 1
            }
        }
    },
}, initialState)