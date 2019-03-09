import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../../actionTypes/index'

const initialState = {
    data: {
        routeTaskList: []
    },
    //isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),] 
    getRouteTaskListForHome: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}


export default handleActions({
    [(actionTypes.routeTaskListForHome.get_routeTaskListForHome_success)]: (state, action) => {
        const { payload: { routeTaskList } } = action
        return {
            ...state,
            data: {
                ...state.data,
                routeTaskList
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
    }
}, initialState)