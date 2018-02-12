import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

const initialState = {
    data: {
        accidentImageList: []
    },
    uploadAccidentImage: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [actionTypes.applyAccidentImageTypes.upload_ImageAtApplyAccident_success]: (state, action) => {
        const { payload: { accidentImageList } } = action
        return {
            ...state,
            data: {
                accidentImageList: [...state.data.accidentImageList, ...accidentImageList]
            },
            uploadAccidentImage: {
                ...initialState.uploadAccidentImage,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.applyAccidentImageTypes.upload_ImageAtApplyAccident_partSuccess]: (state, action) => {
        const { payload: { accidentImageList, failedMsg } } = action
        return {
            ...state,
            data: {
                accidentImageList: [...state.data.accidentImageList, ...accidentImageList]
            },
            uploadAccidentImage: {
                ...initialState.uploadAccidentImage,
                isResultStatus: 5,
                failedMsg
            }
        }
    },
    [actionTypes.applyAccidentImageTypes.upload_ImageAtApplyAccident_waiting]: (state, action) => {
        return {
            ...state,
            uploadAccidentImage: {
                ...initialState.uploadAccidentImage,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.applyAccidentImageTypes.upload_ImageAtApplyAccident_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            uploadAccidentImage: {
                ...initialState.uploadAccidentImage,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.applyAccidentImageTypes.upload_ImageAtApplyAccident_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            uploadAccidentImage: {
                ...initialState.uploadAccidentImage,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
}, initialState)