import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'


const initialState = {
    data: {
        routeTaskFeeList: [],
        isCompleted: false
    },
    getRouteTaskFeeList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getRouteTaskFeeListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
}

export default handleActions({
    [(actionTypes.routeTaskFeeActionType.get_routeTaskFeeList_success)]: (state, action) => {
        const { payload: { routeTaskFeeList, isCompleted } } = action
        return {
            ...state,
            data: {
                ...state.data,
                routeTaskFeeList,
                isCompleted
            },
            getRouteTaskFeeList: {
                ...state.getRouteTaskFeeList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.routeTaskFeeActionType.get_routeTaskFeeList_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getRouteTaskFeeList: {
                ...state.getRouteTaskFeeList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.routeTaskFeeActionType.get_routeTaskFeeList_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getRouteTaskFeeList: {
                ...state.getRouteTaskFeeList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.routeTaskFeeActionType.get_routeTaskFeeList_waiting)]: (state, action) => {
        return {
            ...state,
            getRouteTaskFeeList: {
                ...initialState.getRouteTaskFeeList,
                isResultStatus: 1
            }
        }
    },



    [(actionTypes.routeTaskFeeActionType.get_routeTaskFeeListMore_success)]: (state, action) => {
        const { payload: { routeTaskFeeList, isCompleted } } = action
        return {
            ...state,
            data: {
                ...state.data,
                routeTaskFeeList: [...state.data.routeTaskFeeList, ...routeTaskFeeList],
                isCompleted
            },
            getRouteTaskFeeListMore: {
                ...state.getRouteTaskFeeListMore,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.routeTaskFeeActionType.get_routeTaskFeeListMore_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getRouteTaskFeeListMore: {
                ...state.getRouteTaskFeeListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.routeTaskFeeActionType.get_routeTaskFeeListMore_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getRouteTaskFeeListMore: {
                ...state.getRouteTaskFeeListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.routeTaskFeeActionType.get_routeTaskFeeListMore_waiting)]: (state, action) => {
        return {
            ...state,
            getRouteTaskFeeListMore: {
                ...initialState.getRouteTaskFeeListMore,
                isResultStatus: 1
            }
        }
    }
}, initialState)
