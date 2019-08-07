import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        trailerImageList: [],
    },
    getTrailerImage: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}


export default handleActions({
    [(actionTypes.trailerImageActionType.GET_TrailerImage_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                trailerImageList: data.trailerImageList
            },
            getTrailerImage: {
                ...state.getTrailerImage,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.trailerImageActionType.GET_TrailerImage_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTrailerImage: {
                ...state.getTrailerImage,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.trailerImageActionType.GET_TrailerImage_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTrailerImage: {
                ...state.getTrailerImage,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.trailerImageActionType.GET_TrailerImage_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getTrailerImage: {
                ...initialState.getTrailerImage,
                isResultStatus: 1
            }
        }
    }
}, initialState)
