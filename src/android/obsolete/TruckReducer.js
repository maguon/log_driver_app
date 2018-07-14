import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes/index'

const initialState = {
    data: {
        truckInfo: {},
        truckImageList: [],
        //truckRecordList: [],
        truckRepairList: [],
        truckInsuranceList: []
    },
    getTruckInfo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    // getTruckRecord: {
    //     isResultStatus: 0,
    //     errorMsg: '',
    //     failedMsg: '',
    //     serviceFailedMsg: ''
    // },
    getTruckRepair: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    getTruckInsurance: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    getTruckImage:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误),6(未绑定)] 
export default handleActions({
    [(actionTypes.truckInfoTypes.GET_TruckInfo_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckInfo: data
            },
            getTruckInfo: {
                ...state.getTruckInfo,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInfo_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckInfo: {
                ...state.getTruckInfo,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInfo_Unbind)]: (state, action) => {
        return {
            ...state,
            getTruckInfo: {
                ...state.getTruckInfo,
                isResultStatus: 6
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInfo_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckInfo: {
                ...state.getTruckInfo,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInfo_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckInfo: {
                ...state.getTruckInfo,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInfo_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getTruckInfo: {
                ...initialState.getTruckInfo,
                isResultStatus: 1
            }
        }
    },

    [(actionTypes.truckInfoTypes.GET_TruckInsurance_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckInsuranceList: data
            },
            getTruckInsurance: {
                ...state.getTruckInsurance,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInsurance_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckInsurance: {
                ...state.getTruckInsurance,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInsurance_Unbind)]: (state, action) => {
        return {
            ...state,
            getTruckInsurance: {
                ...state.getTruckInsurance,
                isResultStatus: 6
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInsurance_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckInsurance: {
                ...state.getTruckInsurance,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInsurance_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckInsurance: {
                ...state.getTruckInsurance,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckInsurance_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getTruckInsurance: {
                ...initialState.getTruckInsurance,
                isResultStatus: 1
            }
        }
    },

    [(actionTypes.truckInfoTypes.GET_TruckRepairRelList_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckRepairList: data
            },
            getTruckRepair: {
                ...state.getTruckRepair,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckRepairRelList_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckRepair: {
                ...state.getTruckRepair,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckRepairRelList_Unbind)]: (state, action) => {
        return {
            ...state,
            getTruckRepair: {
                ...state.getTruckRepair,
                isResultStatus: 6
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckRepairRelList_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckRepair: {
                ...state.getTruckRepair,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckRepairRelList_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckRepair: {
                ...state.getTruckRepair,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckRepairRelList_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getTruckRepair: {
                ...initialState.getTruckRepair,
                isResultStatus: 1
            }
        }
    },

    [(actionTypes.truckInfoTypes.GET_TruckImage_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                truckInfo: data.truckInfo,
                truckImageList: data.truckImageList
            },
            getTruckImage: {
                ...state.getTruckImage,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckImage_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckImage: {
                ...state.getTruckImage,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckImage_Unbind)]: (state, action) => {
        return {
            ...state,
            getTruckImage: {
                ...state.getTruckImage,
                isResultStatus: 6
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckImage_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckImage: {
                ...state.getTruckImage,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckImage_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTruckImage: {
                ...state.getTruckImage,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.truckInfoTypes.GET_TruckImage_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getTruckImage: {
                ...initialState.getTruckImage,
                isResultStatus: 1
            }
        }
    }

}, initialState)