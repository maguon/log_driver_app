import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        dpRouteTask: {}
    },
    getDpRouteTask: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.overuseDieselOilInfoActionType.get_dpRouteTaskForOveruseDieselOil_success)]: (state, action) => {
        const { payload: { dpRouteTask } } = action
        return {
            ...state,
            data: {
                dpRouteTask
            },
            getDpRouteTask: {
                ...state.getDpRouteTask,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.overuseDieselOilInfoActionType.get_dpRouteTaskForOveruseDieselOil_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getDpRouteTask: {
                ...state.getDpRouteTask,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.overuseDieselOilInfoActionType.get_dpRouteTaskForOveruseDieselOil_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getDpRouteTask: {
                ...state.getDpRouteTask,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.overuseDieselOilInfoActionType.get_dpRouteTaskForOveruseDieselOil_waiting)]: (state, action) => {
        return {
            ...initialState,
            getDpRouteTask: {
                ...initialState.getDpRouteTask,
                isResultStatus: 1
            }
        }
    }
},initialState)
