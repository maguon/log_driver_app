import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        routeLoadTaskList: [],
        loadTaskInfo: {},
        contactList: []
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
    [(actionTypes.branchInstructExecutingActionType.get_coordinate_success)]: (state, action) => {
        const { payload: { coordinate } } = action
        return {
            ...state,
            data: {
                ...state.data,
                loadTaskInfo: {
                    ...state.data.loadTaskInfo,
                    ...coordinate
                },
            },
            getRouteLoadTaskList: {
                ...state.getRouteLoadTaskList,
                isResultStatus: 2
            }
        }
    },

    [(actionTypes.branchInstructExecutingActionType.GET_RouteLoadTaskListExecuting_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                routeLoadTaskList: data.routeLoadTaskList,
                loadTaskInfo: {
                    ...state.data.loadTaskInfo,
                    ...data.coordinate
                },
                contactList: data.contactList
            },
            getRouteLoadTaskList: {
                ...state.getRouteLoadTaskList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.branchInstructExecutingActionType.GET_RouteLoadTaskListExecuting_FAILED)]: (state, action) => {
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
    [(actionTypes.branchInstructExecutingActionType.GET_RouteLoadTaskListExecuting_SERVICEERROR)]: (state, action) => {
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
    [(actionTypes.branchInstructExecutingActionType.GET_RouteLoadTaskListExecuting_ERROR)]: (state, action) => {
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
    [(actionTypes.branchInstructExecutingActionType.GET_RouteLoadTaskListExecuting_WAITING)]: (state, action) => {
        return {
            ...state,
            getRouteLoadTaskList: {
                ...initialState.getRouteLoadTaskList,
                isResultStatus: 1
            }
        }
    },


    [(actionTypes.branchInstructExecutingActionType.Change_CarExceptionRel_SUCCESS)]: (state, action) => {
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
    [(actionTypes.branchInstructExecutingActionType.Change_CarExceptionRel_FAILED)]: (state, action) => {
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
    [(actionTypes.branchInstructExecutingActionType.Change_CarExceptionRel_SERVICEERROR)]: (state, action) => {
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
    [(actionTypes.branchInstructExecutingActionType.Change_CarExceptionRel_ERROR)]: (state, action) => {
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
    [(actionTypes.branchInstructExecutingActionType.Change_CarExceptionRel_WAITING)]: (state, action) => {
        return {
            ...state,
            changeCarExceptionRel: {
                ...initialState.changeCarExceptionRel,
                isResultStatus: 1
            }
        }
    },
    [(actionTypes.branchInstructExecutingActionType.RESET_Change_CarExceptionRel)]: (state, action) => {
        return {
            ...state,
            changeCarExceptionRel: {
                ...initialState.changeCarExceptionRel
            }
        }
    },



    [(actionTypes.branchInstructExecutingActionType.Change_CarLoadStatus_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        let routeLoadTaskList = [...state.data.routeLoadTaskList]
        routeLoadTaskList = routeLoadTaskList.map((item) => {
            if (item.id == data) {
                item.car_load_status = 2
            }
            return item
        })
        return {
            ...state,
            data: {
                ...state.data,
                routeLoadTaskList: routeLoadTaskList
            },
            changeCarLoadStatus: {
                ...state.changeCarLoadStatus,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.branchInstructExecutingActionType.Change_CarLoadStatus_FAILED)]: (state, action) => {
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
    [(actionTypes.branchInstructExecutingActionType.Change_CarLoadStatus_SERVICEERROR)]: (state, action) => {
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
    [(actionTypes.branchInstructExecutingActionType.Change_CarLoadStatus_ERROR)]: (state, action) => {
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
    [(actionTypes.branchInstructExecutingActionType.Change_CarLoadStatus_WAITING)]: (state, action) => {
        return {
            ...state,
            changeCarLoadStatus: {
                ...initialState.changeCarLoadStatus,
                isResultStatus: 1
            }
        }
    },
    [(actionTypes.branchInstructExecutingActionType.RESET_Change_CarLoadStatus)]: (state, action) => {
        return {
            ...state,
            changeCarLoadStatus: {
                ...initialState.changeCarLoadStatus
            }
        }
    },


    [(actionTypes.branchInstructExecutingActionType.SET_LoadTaskInfo)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                loadTaskInfo: {
                    ...state.data.loadTaskInfo,
                    ...data
                }
            }
        }
    },


    [(actionTypes.branchInstructExecutingActionType.Change_ExecutingLoadTaskStatus_SUCCESS)]: (state, action) => {
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
    [(actionTypes.branchInstructExecutingActionType.Change_ExecutingLoadTaskStatus_FAILED)]: (state, action) => {
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
    [(actionTypes.branchInstructExecutingActionType.Change_ExecutingLoadTaskStatus_SERVICEERROR)]: (state, action) => {
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
    [(actionTypes.branchInstructExecutingActionType.Change_ExecutingLoadTaskStatus_ERROR)]: (state, action) => {
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
    [(actionTypes.branchInstructExecutingActionType.Change_ExecutingLoadTaskStatus_WAITING)]: (state, action) => {
        return {
            ...state,
            changeLoadTaskStatus: {
                ...initialState.changeLoadTaskStatus,
                isResultStatus: 1
            }
        }
    },
    [(actionTypes.branchInstructExecutingActionType.RESET_Change_ExecutingLoadTaskStatus)]: (state, action) => {
        return {
            ...state,
            changeLoadTaskStatus: {
                ...initialState.changeLoadTaskStatus
            }
        }
    },

}, initialState)
