import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'


const initialState = {
    updateMyCamera: {
        id:'',
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.myCameraActionType.my_Camera_success]: (state, action) => {
        const { payload: { id } } = action
        console.log("id",id)
        return {
            ...state,
            updateMyCamera: {
                ...initialState.updateMyCamera,
                isResultStatus: 2,
                id
            }
        }
    },
    [actionTypes.myCameraActionType.my_Camera_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            updateMyCamera: {
                ...initialState.updateMyCamera,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.myCameraActionType.my_Camera_waiting]: (state, action) => {
        return {
            ...state,
            updateMyCamera: {
                ...initialState.updateMyCamera,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.myCameraActionType.my_Camera_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            updateMyCamera: {
                ...initialState.updateMyCamera,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)
