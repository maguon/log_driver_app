import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

const initialState = {
    data: {
        imageList: []
    },
    uploadDamageImage: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(部分成功)]
export default handleActions({
    [actionTypes.applyDamageImageTypes.upload_DamageImage_success]: (state, action) => {
        const { payload: { imageList } } = action
        return {
            ...state,
            data: {
                imageList: [...state.data.imageList, ...imageList]
            },
            uploadDamageImage: {
                ...initialState.uploadDamageImage,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.applyDamageImageTypes.upload_DamageImage_partSuccess]: (state, action) => {
        const { payload: { imageList, failedMsg } } = action
        return {
            ...state,
            data: {
                imageList: [...state.data.imageList, ...imageList]
            },
            uploadDamageImage: {
                ...initialState.uploadDamageImage,
                isResultStatus: 5,
                failedMsg
            }
        }
    },
    [actionTypes.applyDamageImageTypes.upload_DamageImage_waiting]: (state, action) => {
        return {
            ...state,
            uploadDamageImage: {
                ...initialState.uploadDamageImage,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.applyDamageImageTypes.upload_DamageImage_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            uploadDamageImage: {
                ...initialState.uploadDamageImage,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.applyDamageImageTypes.upload_DamageImage_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            uploadDamageImage: {
                ...initialState.uploadDamageImage,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
}, initialState)