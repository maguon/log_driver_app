import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        taskList:[]
    },
    getRouteTaskList:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [(actionTypes.instructActionType.GET_RouteTaskList_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                taskList: data
            },
            getRouteTaskList: {
                ...state.getRouteTaskList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.instructActionType.GET_RouteTaskList_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRouteTaskList: {
                ...state.getRouteTaskList,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.instructActionType.GET_RouteTaskList_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRouteTaskList: {
                ...state.getRouteTaskList,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.instructActionType.GET_RouteTaskList_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRouteTaskList: {
                ...state.getRouteTaskList,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.instructActionType.GET_RouteTaskList_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getRouteTaskList: {
                ...initialState.getRouteTaskList,
                isResultStatus: 1
            }
        }
    },

}, initialState)
