import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        imageList: [],
        recordId:0
    },
    uploadAccidentImage:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
    getAccidentImageList:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
    delImage:{
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

export default handleActions({
    [actionTypes.imageForAccidentType.get_AccidentImageList_success]: (state, action) => {
        const { payload: { imageList ,recordId} } = action
        return {
            ...state,
            data: {
                imageList,
                recordId
            },
            getAccidentImageList: {
                ...initialState.getAccidentImageList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.imageForAccidentType.get_AccidentImageList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getAccidentImageList: {
                ...initialState.getAccidentImageList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.imageForAccidentType.get_AccidentImageList_waiting]: (state, action) => {
        return {
            ...state,
            getAccidentImageList: {
                ...initialState.getAccidentImageList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.imageForAccidentType.get_AccidentImageList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getAccidentImageList: {
                ...initialState.getAccidentImageList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [actionTypes.imageForAccidentType.upload_ImageAtAccidentInfo_success]: (state, action) => {
        const { payload: { imageList } } = action
        return {
            ...state,
            data: {
                ...state.data,
                imageList: [...state.data.imageList, ...imageList.map(item => { return { url: item } })]
            },
            uploadAccidentImage: {
                ...initialState.uploadAccidentImage,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.imageForAccidentType.upload_ImageAtAccidentInfo_partSuccess]: (state, action) => {
        const { payload: { imageList, failedMsg } } = action
        return {
            ...state,
            data: {
                ...state.data,
                imageList: [...state.data.imageList, ...imageList]
            },
            uploadAccidentImage: {
                ...initialState.uploadAccidentImage,
                isResultStatus: 5,
                failedMsg
            }
        }
    },
    [actionTypes.imageForAccidentType.upload_ImageAtAccidentInfo_waiting]: (state, action) => {
        return {
            ...state,
            uploadAccidentImage: {
                ...initialState.uploadAccidentImage,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.imageForAccidentType.upload_ImageAtAccidentInfo_failed]: (state, action) => {
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
    [actionTypes.imageForAccidentType.upload_ImageAtAccidentInfo_error]: (state, action) => {
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





    [actionTypes.imageForAccidentType.del_ImageAtAccidentInfo_success]: (state, action) => {
        const { payload: { imageurl } } = action
        return {
            ...state,
            data: {
                ...state.data,
                imageList: state.data.imageList.filter(item => {
                    return item.url != imageurl
                })
            },
            delImage: {
                ...initialState.delImage,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.imageForAccidentType.del_ImageAtAccidentInfo_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            delImage: {
                ...initialState.delImage,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.imageForAccidentType.del_ImageAtAccidentInfo_waiting]: (state, action) => {
        return {
            ...state,
            delImage: {
                ...initialState.delImage,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.imageForAccidentType.del_ImageAtAccidentInfo_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            delImage: {
                ...initialState.delImage,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
},initialState)
