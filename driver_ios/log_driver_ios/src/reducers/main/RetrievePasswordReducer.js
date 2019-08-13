import {handleActions} from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState={
    //isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
    retrieve: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [actionTypes.retrievePasswordType.retrieve_success]:(state, action)=>{
        return {
            ...state,
            retrieve:{
                ...state.retrieve,
                isResultStatus: 2
            }
        }

    },
    [actionTypes.retrievePasswordType.retrieve_failed]:(state, action)=>{
        const {payload:{failedMsg}}=action
        return {
            ...state,
            retrieve: {
                ...state.retrieve,
                isResultStatus:1,
                failedMsg
            }
        }

    },
    [actionTypes.retrievePasswordType.retrieve_waiting]:(state, action)=>{
        return{
            ...state,
            retrieve:{
                ...state.retrieve,
                isExecStatus:1
            }
        }

    },
    [actionTypes.retrievePasswordType.retrieve_error]:(state, action)=>{
        const {payload:{errorMsg}}=action
        return{
            ...state,
            retrieve:{
                ...state.retrieve,
                isResultStatus:3,
                errorMsg
            }
        }

    },

},initialState)
