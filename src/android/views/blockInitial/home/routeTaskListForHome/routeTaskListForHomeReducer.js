import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../../actionTypes/index'

const initialState = {
    data: {
        routeTaskList: [],
        isCompleted: false
    },
    //isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),] 
    getRouteTaskListForHome: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getRouteTaskListForHomeMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}


export default handleActions({
    [(actionTypes.routeTaskListForHome.get_routeTaskListForHome_success)]: (state, action) => {
        const { payload: { routeTaskList,isCompleted } } = action
        return {
            ...state,
            data: {
                ...state.data,
                routeTaskList,
                isCompleted
            },
            getRouteTaskListForHome: {
                ...state.getRouteTaskListForHome,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.routeTaskListForHome.get_routeTaskListForHome_waiting)]: (state, action) => {
        return {
            ...state,
            getRouteTaskListForHome: {
                ...state.getRouteTaskListForHome,
                isResultStatus: 1
            }
        }
    },
    [(actionTypes.routeTaskListForHome.get_routeTaskListForHome_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getRouteTaskListForHome: {
                ...state.getRouteTaskListForHome,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.routeTaskListForHome.get_routeTaskListForHome_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getRouteTaskListForHome: {
                ...state.getRouteTaskListForHome,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [(actionTypes.routeTaskListForHome.get_routeTaskListForHomeMore_success)]: (state, action) => {
        const { payload: { routeTaskList, isCompleted } } = action
        return {
            ...state,
            data: {
                ...state.data,
                routeTaskList: [...state.data.routeTaskList, ...routeTaskList],
                isCompleted
            },
            getRouteTaskListForHomeMore: {
                ...initialState.getRouteTaskListForHomeMore,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.routeTaskListForHome.get_routeTaskListForHomeMore_waiting)]: (state, action) => {
        return {
            ...state,
            getRouteTaskListForHomeMore: {
                ...initialState.getRouteTaskListForHomeMore,
                isResultStatus: 1,
            }
        }
    },
    [(actionTypes.routeTaskListForHome.get_routeTaskListForHomeMore_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getRouteTaskListForHomeMore: {
                ...initialState.getRouteTaskListForHomeMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.routeTaskListForHome.get_routeTaskListForHomeMore_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getRouteTaskListForHomeMore: {
                ...initialState.getRouteTaskListForHomeMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


}, initialState)