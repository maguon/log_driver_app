import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

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
    [(actionTypes.overuseDieselOilInfo.get_dpRouteTaskForOveruseDieselOil_success)]: (state, action) => {
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
    [(actionTypes.overuseDieselOilInfo.get_dpRouteTaskForOveruseDieselOil_failed)]: (state, action) => {
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
    [(actionTypes.overuseDieselOilInfo.get_dpRouteTaskForOveruseDieselOil_error)]: (state, action) => {
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
    [(actionTypes.overuseDieselOilInfo.get_dpRouteTaskForOveruseDieselOil_waiting)]: (state, action) => {
        return {
            ...initialState,
            getDpRouteTask: {
                ...initialState.getDpRouteTask,
                isResultStatus: 1
            }
        }
    }
},initialState)
