import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'


const initialState = {
    data: {
        imageList: [],
        index: 0
    },
    uploadCarImage: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误),6(部分成功)]
export default handleActions({
    [actionTypes.addCarImageType.upload_CarImage_success]: (state, action) => {
        const { payload: { imageList } } = action
        return {
            ...state,
            data: {
                ...state.data,
                imageList: [...state.data.imageList, ...imageList]
            },
            uploadCarImage: {
                ...initialState.uploadCarImage,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.addCarImageType.upload_CarImage_partSuccess]: (state, action) => {
        const { payload: { imageList, failedMsg } } = action
        return {
            ...state,
            data: {
                ...state.data,
                imageList: [...state.data.imageList, ...imageList]
            },
            uploadCarImage: {
                ...initialState.uploadCarImage,
                isResultStatus: 5,
                failedMsg
            }
        }
    },
    [actionTypes.addCarImageType.upload_CarImage_waiting]: (state, action) => {
        return {
            ...state,
            uploadCarImage: {
                ...initialState.uploadCarImage,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.addCarImageType.upload_CarImage_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            uploadCarImage: {
                ...initialState.uploadCarImage,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.addCarImageType.upload_CarImage_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            uploadCarImage: {
                ...initialState.uploadCarImage,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.addCarImageType.set_indexForCreateCar]: (state, action) => {
        const { payload: { index } } = action
        return {
            ...state,
            data: {
                ...state.data,
                index
            }
        }
    },
    [actionTypes.addCarImageType.clean_upload_CarImage]: (state, action) => {
        return {
            ...initialState
        }
    }
}, initialState)
