import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

const initialState = {
    data: {
        routeLoadTaskList: [],
        loadTaskInfo: {}
    },
    getRouteLoadTaskList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    changeLoadTaskStatus: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    changeCarLoadStatus: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    changeCarExceptionRel: {
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


    [(actionTypes.branchInstructExecutingTypes.Change_CarExceptionRel_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                routeLoadTaskList: [...state.data.routeLoadTaskList.filter((item) => item.id != data), {
                    ...state.data.routeLoadTaskList.find((item) => item.id == data),
                    exception_status: 2
                }]
            },
            changeCarExceptionRel: {
                ...state.changeCarExceptionRel,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.branchInstructExecutingTypes.Change_CarExceptionRel_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            changeCarExceptionRel: {
                ...state.changeCarExceptionRel,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.branchInstructExecutingTypes.Change_CarExceptionRel_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            changeCarExceptionRel: {
                ...state.changeCarExceptionRel,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.branchInstructExecutingTypes.Change_CarExceptionRel_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            changeCarExceptionRel: {
                ...state.changeCarExceptionRel,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.branchInstructExecutingTypes.Change_CarExceptionRel_WAITING)]: (state, action) => {
        return {
            ...state,
            changeCarExceptionRel: {
                ...initialState.changeCarExceptionRel,
                isResultStatus: 1
            }
        }
    },
    [(actionTypes.branchInstructExecutingTypes.RESET_Change_CarExceptionRel)]: (state, action) => {
        return {
            ...state,
            changeCarExceptionRel: {
                ...initialState.changeCarExceptionRel
            }
        }
    },



    [(actionTypes.branchInstructExecutingTypes.Change_CarLoadStatus_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                routeLoadTaskList: [...state.data.routeLoadTaskList.filter((item) => item.id != data), {
                    ...state.data.routeLoadTaskList.find((item) => item.id == data),
                    car_load_status: 1
                }]
            },
            changeCarLoadStatus: {
                ...state.changeCarLoadStatus,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.branchInstructExecutingTypes.Change_CarLoadStatus_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            changeCarLoadStatus: {
                ...state.changeCarLoadStatus,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.branchInstructExecutingTypes.Change_CarLoadStatus_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            changeCarLoadStatus: {
                ...state.changeCarLoadStatus,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.branchInstructExecutingTypes.Change_CarLoadStatus_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            changeCarLoadStatus: {
                ...state.changeCarLoadStatus,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.branchInstructExecutingTypes.Change_CarLoadStatus_WAITING)]: (state, action) => {
        return {
            ...state,
            changeCarLoadStatus: {
                ...initialState.changeCarLoadStatus,
                isResultStatus: 1
            }
        }
    },
    [(actionTypes.branchInstructExecutingTypes.RESET_Change_CarLoadStatus)]: (state, action) => {
        return {
            ...state,
            changeCarLoadStatus: {
                ...initialState.changeCarLoadStatus
            }
        }
    },




    [(actionTypes.branchInstructExecutingTypes.Change_ExecutingLoadTaskStatus_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                loadTaskInfo: {
                    ...state.data.loadTaskInfo,
                    load_task_status: 7
                }
            },
            changeLoadTaskStatus: {
                ...state.changeLoadTaskStatus,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.branchInstructExecutingTypes.Change_ExecutingLoadTaskStatus_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            changeLoadTaskStatus: {
                ...state.changeLoadTaskStatus,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.branchInstructExecutingTypes.Change_ExecutingLoadTaskStatus_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            changeLoadTaskStatus: {
                ...state.changeLoadTaskStatus,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.branchInstructExecutingTypes.Change_ExecutingLoadTaskStatus_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            changeLoadTaskStatus: {
                ...state.changeLoadTaskStatus,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.branchInstructExecutingTypes.Change_ExecutingLoadTaskStatus_WAITING)]: (state, action) => {
        return {
            ...state,
            changeLoadTaskStatus: {
                ...initialState.changeLoadTaskStatus,
                isResultStatus: 1
            }
        }
    },
    [(actionTypes.branchInstructExecutingTypes.RESET_Change_ExecutingLoadTaskStatus)]: (state, action) => {
        return {
            ...state,
            changeLoadTaskStatus: {
                ...initialState.changeLoadTaskStatus
            }
        }
    },

}, initialState)