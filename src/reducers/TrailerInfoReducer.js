import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

const initialState = {
    data: {
        trailerInfo: {},
        trailerImageList: [],
        trailerRepairList:[],
        trailerInsuranceList: []
    },
    getTrailerInfo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    getTrailerRepairList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    getTrailerInsurance: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    getTrailerImage:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)] 
export default handleActions({
    [(actionTypes.trailerInfoTypes.GET_TrailerInfo_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                trailerInfo: data
            },
            getTrailerInfo: {
                ...state.getTrailerInfo,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.trailerInfoTypes.GET_TrailerInfo_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTrailerInfo: {
                ...state.getTrailerInfo,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.trailerInfoTypes.GET_TrailerInfo_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTrailerInfo: {
                ...state.getTrailerInfo,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.trailerInfoTypes.GET_TrailerInfo_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTrailerInfo: {
                ...state.getTrailerInfo,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.trailerInfoTypes.GET_TrailerInfo_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getTrailerInfo: {
                ...initialState.getTrailerInfo,
                isResultStatus: 1
            }
        }
    },
    [(actionTypes.trailerInfoTypes.GET_TrailerInfo_Unbind)]: (state, action) => {
        return {
            ...state,
            getTrailerInfo: {
                ...state.getTrailerInfo,
                isResultStatus: 6
            }
        }
    },

    [(actionTypes.trailerInfoTypes.GET_TrailerInsurance_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                trailerInsuranceList: data
            },
            getTrailerInsurance: {
                ...state.getTrailerInsurance,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.trailerInfoTypes.GET_TrailerInsurance_Unbind)]: (state, action) => {
        return {
            ...state,
            getTrailerInsurance: {
                ...state.getTrailerInsurance,
                isResultStatus: 6
            }
        }
    },
    [(actionTypes.trailerInfoTypes.GET_TrailerInsurance_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTrailerInsurance: {
                ...state.getTrailerInsurance,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.trailerInfoTypes.GET_TrailerInsurance_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTrailerInsurance: {
                ...state.getTrailerInsurance,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.trailerInfoTypes.GET_TrailerInsurance_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTrailerInsurance: {
                ...state.getTrailerInsurance,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.trailerInfoTypes.GET_TrailerInsurance_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getTrailerInsurance: {
                ...initialState.getTrailerInsurance,
                isResultStatus: 1
            }
        }
    },

    [(actionTypes.trailerInfoTypes.GET_TrailerRepairRelList_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                trailerRepairList: data
            },
            getTrailerRepairList: {
                ...state.getTrailerRepairList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.trailerInfoTypes.GET_TrailerRepairRelList_Unbind)]: (state, action) => {
        return {
            ...state,
            getTrailerRepairList: {
                ...state.getTrailerRepairList,
                isResultStatus: 6
            }
        }
    },
    [(actionTypes.trailerInfoTypes.GET_TrailerRepairRelList_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTrailerRepairList: {
                ...state.getTrailerRepairList,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.trailerInfoTypes.GET_TrailerRepairRelList_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTrailerRepairList: {
                ...state.getTrailerRepairList,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.trailerInfoTypes.GET_TrailerRepairRelList_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTrailerRepairList: {
                ...state.getTrailerRepairList,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.trailerInfoTypes.GET_TrailerRepairRelList_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getTrailerRepairList: {
                ...initialState.getTrailerRepairList,
                isResultStatus: 1
            }
        }
    },

    [(actionTypes.trailerInfoTypes.GET_TrailerImage_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                trailerInfo: data.truckInfo,
                trailerImageList: data.truckImageList
            },
            getTrailerImage: {
                ...state.getTrailerImage,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.trailerInfoTypes.GET_TrailerImage_Unbind)]: (state, action) => {
        return {
            ...state,
            getTrailerImage: {
                ...state.getTrailerImage,
                isResultStatus: 6
            }
        }
    },
    [(actionTypes.trailerInfoTypes.GET_TrailerImage_FAILED)]: (state, action) => {
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
    [(actionTypes.trailerInfoTypes.GET_TrailerImage_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTrailerImage: {
                ...state.getTrailerImage,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.trailerInfoTypes.GET_TrailerImage_ERROR)]: (state, action) => {
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
    [(actionTypes.trailerInfoTypes.GET_TrailerImage_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getTrailerImage: {
                ...initialState.getTrailerImage,
                isResultStatus: 1
            }
        }
    }

}, initialState)