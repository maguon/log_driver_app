import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actionTypes/index'

const initialState = {
    data: {
        cityRouteList: []
    },
    getCityRouteList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [(actionTypes.cityRouteListTypes.GET_CityRouteList_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                cityRouteList:data
            },
            getCityRouteList: {
                ...state.getCityRouteList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.cityRouteListTypes.GET_CityRouteList_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCityRouteList: {
                ...state.getCityRouteList,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.cityRouteListTypes.GET_CityRouteList_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCityRouteList: {
                ...state.getCityRouteList,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.cityRouteListTypes.GET_CityRouteList_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getCityRouteList: {
                ...initialState.getCityRouteList,
                isResultStatus: 1
            }
        }
    },

}, initialState)