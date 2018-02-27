import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

const initialState = {
    data: {
        demageImageList: [],
        recordId:0
    },
    getDamageImageList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    uploadDamageImage: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    delImage:{
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.imageListForDemageTypes.get_DamageImageList_success]: (state, action) => {
        const { payload: { demageImageList,recordId } } = action
        return {
            ...state,
            data: {
                demageImageList,
                recordId
            },
            getDamageImageList: {
                ...initialState.getDamageImageList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.imageListForDemageTypes.get_DamageImageList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getDamageImageList: {
                ...initialState.getDamageImageList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.imageListForDemageTypes.get_DamageImageList_waiting]: (state, action) => {
        return {
            ...state,
            getDamageImageList: {
                ...initialState.getDamageImageList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.imageListForDemageTypes.get_DamageImageList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getDamageImageList: {
                ...initialState.getDamageImageList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [actionTypes.imageListForDemageTypes.upload_ImageAtDemage_success]: (state, action) => {
        const { payload: { demageImageList } } = action
        return {
            ...state,
            data: {
                ...state.data,
                demageImageList: [...state.data.demageImageList, ...demageImageList.map(item => { return { url: item } })]
            },
            uploadDamageImage: {
                ...initialState.uploadDamageImage,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.imageListForDemageTypes.upload_ImageAtDemage_partSuccess]: (state, action) => {
        const { payload: { demageImageList, failedMsg } } = action
        return {
            ...state,
            data: {
                ...state.data,
                demageImageList: [...state.data.demageImageList, ...demageImageList]
            },
            uploadDamageImage: {
                ...initialState.uploadDamageImage,
                isResultStatus: 5,
                failedMsg
            }
        }
    },
    [actionTypes.imageListForDemageTypes.upload_ImageAtDemage_waiting]: (state, action) => {
        return {
            ...state,
            uploadDamageImage: {
                ...initialState.uploadDamageImage,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.imageListForDemageTypes.upload_ImageAtDemage_failed]: (state, action) => {
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
    [actionTypes.imageListForDemageTypes.upload_ImageAtDemage_error]: (state, action) => {
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



    [actionTypes.imageListForDemageTypes.del_ImageAtDemage_success]: (state, action) => {
        const { payload: { imageurl } } = action
        return {
            ...state,
            data: {
                ...state.data,
                demageImageList: state.data.demageImageList.filter(item => {
                    return item.url != imageurl
                })
            },
            delImage: {
                ...initialState.delImage,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.imageListForDemageTypes.del_ImageAtDemage_failed]: (state, action) => {
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
    [actionTypes.imageListForDemageTypes.del_ImageAtDemage_waiting]: (state, action) => {
        return {
            ...state,
            delImage: {
                ...initialState.delImage,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.imageListForDemageTypes.del_ImageAtDemage_error]: (state, action) => {
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
}, initialState)