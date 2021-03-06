import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        routeLoadTaskList: [],
        loadTaskInfo: {},
        cleanCar: {},
        contactList: []
    },
    getRouteLoadTaskList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [(actionTypes.branchInstructActionType.GET_RouteLoadTaskList_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                routeLoadTaskList: data.routeLoadTaskList,
                loadTaskInfo: data.loadTaskInfo,
                cleanCar: data.cleanCar,
                contactList: data.contactList
            },
            getRouteLoadTaskList: {
                ...state.getRouteLoadTaskList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.branchInstructActionType.GET_RouteLoadTaskList_FAILED)]: (state, action) => {
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
    [(actionTypes.branchInstructActionType.GET_RouteLoadTaskList_SERVICEERROR)]: (state, action) => {
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
    [(actionTypes.branchInstructActionType.GET_RouteLoadTaskList_ERROR)]: (state, action) => {
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
    [(actionTypes.branchInstructActionType.GET_RouteLoadTaskList_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getRouteLoadTaskList: {
                ...initialState.getRouteLoadTaskList,
                isResultStatus: 1
            }
        }
    },
}, initialState)
